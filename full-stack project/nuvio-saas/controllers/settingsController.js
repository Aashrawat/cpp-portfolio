import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { createToken, verifyToken } from "@/lib/auth";
import { toPublicUser } from "@/lib/userUtils";
import {
  deleteAccountSchema,
  emailUpdateSchema,
  parseWithZod,
  passwordUpdateSchema,
  profileSchema,
} from "@/lib/validation";

function publicUser(user) {
  return toPublicUser(user);
}

async function issueToken(user) {
  const data = publicUser(user);
  return createToken({
    userId: user._id.toString(),
    firstName: data.firstName,
    lastName: data.lastName,
    name: data.name,
    email: data.email,
    street: data.street,
    city: data.city,
    postalCode: data.postalCode,
    country: data.country,
    deliveryCountry: data.country,
    marketingEmails: data.marketingEmails,
  });
}

export async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload?.userId) return null;

  await connectDB();
  const user = await User.findById(payload.userId);
  return user || null;
}

export async function updateProfile(input) {
  const user = await getAuthenticatedUser();
  if (!user) return { status: 401, message: "Please sign in" };

  const parsed = parseWithZod(profileSchema, input);
  if (!parsed.success) {
    return { status: 400, message: parsed.message };
  }

  const {
    firstName,
    lastName,
    street,
    city,
    postalCode,
    country,
    marketingEmails,
  } = parsed.data;

  user.firstName = firstName;
  user.lastName = lastName || "";
  user.street = street;
  user.city = city;
  user.postalCode = postalCode;
  user.country = country;
  user.deliveryCountry = country;
  if (typeof marketingEmails === "boolean") {
    user.marketingEmails = marketingEmails;
  }

  await user.save();
  const token = await issueToken(user);

  return {
    status: 200,
    message: "Profile and delivery address updated",
    token,
    user: publicUser(user),
  };
}

export async function updateEmail(input) {
  const user = await getAuthenticatedUser();
  if (!user) return { status: 401, message: "Please sign in" };

  const parsed = parseWithZod(emailUpdateSchema, input);
  if (!parsed.success) {
    return { status: 400, message: parsed.message };
  }

  const { email, password } = parsed.data;

  if (email === user.email) {
    return { status: 400, message: "That is already your email" };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { status: 401, message: "Current password is incorrect" };
  }

  const taken = await User.findOne({ email });
  if (taken) {
    return { status: 409, message: "Email already registered" };
  }

  user.email = email;
  await user.save();
  const token = await issueToken(user);

  return {
    status: 200,
    message: "Email updated",
    token,
    user: publicUser(user),
  };
}

export async function updatePassword(input) {
  const user = await getAuthenticatedUser();
  if (!user) return { status: 401, message: "Please sign in" };

  const parsed = parseWithZod(passwordUpdateSchema, input);
  if (!parsed.success) {
    return { status: 400, message: parsed.message };
  }

  const { currentPassword, newPassword } = parsed.data;

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return { status: 401, message: "Current password is incorrect" };
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return {
    status: 200,
    message: "Password updated",
    user: publicUser(user),
  };
}

export async function deleteAccount(input) {
  const user = await getAuthenticatedUser();
  if (!user) return { status: 401, message: "Please sign in" };

  const parsed = parseWithZod(deleteAccountSchema, input);
  if (!parsed.success) {
    return { status: 400, message: parsed.message };
  }

  const isMatch = await bcrypt.compare(parsed.data.password, user.password);
  if (!isMatch) {
    return { status: 401, message: "Password is incorrect" };
  }

  await User.findByIdAndDelete(user._id);

  return {
    status: 200,
    message: "Account deleted",
    clearCookie: true,
  };
}
