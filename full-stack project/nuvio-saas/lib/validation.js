import { z } from "zod";

const requiredString = (message) =>
  z.preprocess(
    (value) => (value == null ? "" : value),
    z.string().trim().min(1, message)
  );

const optionalName = z.preprocess(
  (value) => (value == null ? "" : value),
  z.string().trim().max(50, "Name is too long")
);

export const signupSchema = z
  .object({
    firstName: z.preprocess(
      (value) => (value == null ? "" : value),
      z
        .string()
        .trim()
        .min(1, "First name is required")
        .max(50, "First name is too long")
    ),
    lastName: optionalName,
    email: z.preprocess(
      (value) => (value == null ? "" : value),
      z
        .string()
        .trim()
        .toLowerCase()
        .email("Enter a valid email address")
    ),
    password: z.preprocess(
      (value) => (value == null ? "" : value),
      z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(128, "Password is too long")
    ),
    confirmPassword: requiredString("Confirm password is required"),
    street: z.preprocess(
      (value) => (value == null ? "" : value),
      z
        .string()
        .trim()
        .min(3, "Street address is required")
        .max(120, "Street address is too long")
    ),
    city: z.preprocess(
      (value) => (value == null ? "" : value),
      z
        .string()
        .trim()
        .min(2, "City is required")
        .max(80, "City name is too long")
    ),
    postalCode: z.preprocess(
      (value) => (value == null ? "" : value),
      z
        .string()
        .trim()
        .min(3, "Postal code is required")
        .max(20, "Postal code is too long")
    ),
    country: z.preprocess(
      (value) => (value == null ? "" : value),
      z
        .string()
        .trim()
        .min(2, "Country is required")
        .max(60, "Country name is too long")
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.preprocess(
    (value) => (value == null ? "" : value),
    z.string().trim().toLowerCase().email("Enter a valid email address")
  ),
  password: requiredString("Password is required"),
});

export const profileSchema = z.object({
  firstName: z.preprocess(
    (value) => (value == null ? "" : value),
    z
      .string()
      .trim()
      .min(1, "First name is required")
      .max(50, "First name is too long")
  ),
  lastName: optionalName,
  street: z.preprocess(
    (value) => (value == null ? "" : value),
    z
      .string()
      .trim()
      .min(3, "Street address is required")
      .max(120, "Street address is too long")
  ),
  city: z.preprocess(
    (value) => (value == null ? "" : value),
    z
      .string()
      .trim()
      .min(2, "City is required")
      .max(80, "City name is too long")
  ),
  postalCode: z.preprocess(
    (value) => (value == null ? "" : value),
    z
      .string()
      .trim()
      .min(3, "Postal code is required")
      .max(20, "Postal code is too long")
  ),
  country: z.preprocess(
    (value) => (value == null ? "" : value),
    z
      .string()
      .trim()
      .min(2, "Country is required")
      .max(60, "Country name is too long")
  ),
  marketingEmails: z.boolean().optional(),
});

export const emailUpdateSchema = z.object({
  email: z.preprocess(
    (value) => (value == null ? "" : value),
    z.string().trim().toLowerCase().email("Enter a valid email address")
  ),
  password: requiredString("Current password is required"),
});

export const passwordUpdateSchema = z
  .object({
    currentPassword: requiredString("Current password is required"),
    newPassword: z.preprocess(
      (value) => (value == null ? "" : value),
      z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(128, "Password is too long")
    ),
    confirmPassword: requiredString("Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match",
    path: ["confirmPassword"],
  });

export const deleteAccountSchema = z.object({
  password: requiredString("Password is required to delete your account"),
});

export const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        id: z.preprocess(
          (value) => (value == null ? "" : value),
          z.string().trim().min(1, "Product id is required")
        ),
        quantity: z.coerce.number().int().min(1).max(99).default(1),
      })
    )
    .min(1, "Your cart is empty"),
});

export const refundSchema = z.object({
  reason: z.preprocess(
    (value) => (value == null ? "" : value),
    z
      .string()
      .trim()
      .min(
        5,
        "Please share a short reason for the refund (at least 5 characters)."
      )
      .max(500, "Refund reason is too long")
  ),
});

export const reviewSchema = z.object({
  productId: z.string().trim().min(1, "Product is required").max(120),
  rating: z.coerce
    .number()
    .int("Rating must be a whole number")
    .min(1, "Please choose a rating from 1 to 5")
    .max(5, "Please choose a rating from 1 to 5"),
  text: z
    .string()
    .trim()
    .min(10, "Please write at least 10 characters for your review")
    .max(500, "Review is too long (max 500 characters)"),
});

export const reviewDeleteSchema = z.object({
  productId: z.string().trim().min(1, "Product is required").max(120),
});

export const productIdSchema = z.object({
  productId: z.string().trim().min(1, "Product is required").max(120),
});

export function parseWithZod(schema, data) {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const message =
    result.error.issues[0]?.message || "Invalid input. Please check your form.";

  return { success: false, message };
}
