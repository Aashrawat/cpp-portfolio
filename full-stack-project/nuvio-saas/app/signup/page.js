import { Suspense } from "react";
import SignupForm from "@/components/SignupForm";

export default function SignupPage() {
  return (
    <Suspense fallback={<section className="max-w-md mx-auto p-8 mt-10" />}>
      <SignupForm />
    </Suspense>
  );
}
