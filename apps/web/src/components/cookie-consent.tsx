"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const COOKIE_CONSENT_KEY = "cookie-consent";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setShowBanner(false);
  }

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background p-4 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">
            This website uses cookies to ensure you get the best experience.{" "}
            <a
              href="/privacy"
              className="underline hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </a>
          </p>
        </div>
        <div className="flex items-center gap-2 self-end sm:ml-auto">
          <Button size="sm" onClick={handleAccept}>
            Got it
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={handleAccept}
            aria-label="Close"
          >
            <X className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
