import { SignUpForm } from "@/components/signup-form";

export default function SignUpPage() {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">Sign Up</h2>
        <p className="text-muted-foreground">
          Create an account to start taking notes
        </p>
      </div>
      <SignUpForm />
    </div>
  );
}

