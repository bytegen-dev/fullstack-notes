import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Link href="/">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="mr-2 size-4" />
          Back to Notes
        </Button>
      </Link>

      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
          <p className="text-muted-foreground">
            Welcome to Fullstack Notes. We respect your privacy and are
            committed to protecting your personal data. This privacy policy
            explains how we collect, use, and safeguard your information when
            you use our application.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>We collect the following types of information:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Account Information:</strong> When you sign up, we
                collect your name, email address, and password (stored securely
                using industry-standard hashing).
              </li>
              <li>
                <strong>Notes Data:</strong> The notes you create, edit, and
                store in the application.
              </li>
              <li>
                <strong>Authentication Data:</strong> Session tokens and
                authentication cookies to keep you logged in.
              </li>
              <li>
                <strong>Preferences:</strong> Your theme preference (dark/light
                mode) stored locally in your browser.
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>We use your information to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide and maintain our service</li>
              <li>Authenticate and manage your account</li>
              <li>Store and retrieve your notes</li>
              <li>Remember your preferences (theme, etc.)</li>
              <li>Ensure the security of your account</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Cookies</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>We use the following types of cookies:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Essential Cookies:</strong> Required for authentication
                and session management. These cookies are necessary for the app
                to function and cannot be disabled.
              </li>
              <li>
                <strong>Preference Cookies:</strong> Store your theme
                preference (dark/light mode) to provide a consistent experience
                across sessions.
              </li>
            </ul>
            <p>
              You can control non-essential cookies through the cookie consent
              banner. However, disabling essential cookies may prevent you from
              using certain features of the application.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Data Security</h2>
          <p className="text-muted-foreground">
            We implement appropriate technical and organizational measures to
            protect your personal data. Your passwords are hashed using
            industry-standard algorithms, and we use secure authentication
            protocols. However, no method of transmission over the internet is
            100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Data Storage</h2>
          <p className="text-muted-foreground">
            Your data is stored in a PostgreSQL database. We retain your
            account information and notes for as long as your account is active.
            If you delete your account, we will delete your personal data in
            accordance with our data retention policies.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Third-Party Services</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>We use the following third-party services:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>GitHub OAuth:</strong> If you choose to sign in with
                GitHub, your authentication is handled by GitHub according to
                their privacy policy.
              </li>
              <li>
                <strong>Google OAuth:</strong> If you choose to sign in with
                Google, your authentication is handled by Google according to
                their privacy policy.
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">8. Your Rights</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your account and associated data</li>
              <li>Export your notes data</li>
              <li>Withdraw consent for non-essential cookies</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">9. Children&apos;s Privacy</h2>
          <p className="text-muted-foreground">
            Our service is not intended for children under the age of 13. We do
            not knowingly collect personal information from children under 13.
            If you are a parent or guardian and believe your child has provided
            us with personal information, please contact us.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">10. Changes to This Policy</h2>
          <p className="text-muted-foreground">
            We may update this privacy policy from time to time. We will notify
            you of any changes by posting the new policy on this page and
            updating the &quot;Last updated&quot; date. You are advised to review
            this policy periodically.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">11. Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about this privacy policy or our data
            practices, please contact us through the application or via the
            repository issues page.
          </p>
        </section>
      </div>
    </div>
  );
}

