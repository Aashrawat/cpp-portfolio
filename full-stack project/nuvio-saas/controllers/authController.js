import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { createToken } from "@/lib/auth";
import { toPublicUser } from "@/lib/userUtils";
import { loginSchema, parseWithZod, signupSchema } from "@/lib/validation";
import { sendWelcomeEmail } from "@/lib/emails/welcomeEmail";

function tokenFromUser(user) {
  const data = toPublicUser(user);
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

export async function signupUser(input) {
  const parsed = parseWithZod(signupSchema, input);
  if (!parsed.success) {
    return { status: 400, message: parsed.message };
  }

  const {
    firstName,
    lastName,
    email,
    password,
    street,
    city,
    postalCode,
    country,
  } = parsed.data;

  await connectDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { status: 409, message: "Email already registered" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName: lastName || "",
    email,
    password: hashedPassword,
    street,
    city,
    postalCode,
    country,
    deliveryCountry: country,
  });

  const publicUser = toPublicUser(user);
  const token = await tokenFromUser(user);

  void sendWelcomeEmail(publicUser);

  return {
    status: 201,
    message: "Account created successfully",
    token,
    user: publicUser,
  };
}

export async function loginUser(input) {
  const parsed = parseWithZod(loginSchema, input);
  if (!parsed.success) {
    return { status: 400, message: parsed.message };
  }

  const { email, password } = parsed.data;

  await connectDB();

  const user = await User.findOne({ email });
  if (!user) {
    return { status: 401, message: "Invalid email or password" };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { status: 401, message: "Invalid email or password" };
  }

  const publicUser = toPublicUser(user);
  const token = await tokenFromUser(user);

  return {
    status: 200,
    message: "Login successful",
    token,
    user: publicUser,
  };
}
