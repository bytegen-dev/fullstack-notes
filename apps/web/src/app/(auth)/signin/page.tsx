import { SignInForm } from "@/components/signin-form";

export default function SignInPage() {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold">Sign In</h2>
        <p className="text-muted-foreground">
          Enter your credentials to access your notes
        </p>
      </div>
      <SignInForm />
    </div>
  );
}

