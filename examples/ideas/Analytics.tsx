import { useEffect } from "react";
import posthog from "posthog-js";

export default function Analytics() {
  useEffect(() => {
    // Check if we are on the client-side (window is defined)
    if (typeof window !== "undefined") {
      const IS_PROD = process.env.NODE_ENV === "production";
      const IS_LOCAL = window.location.href.includes("localhost:");

      if (IS_PROD && !IS_LOCAL) {
        posthog.init("PCoHEHV8I8etm7-gSY6RT8tcev9M3VWoejzJKjv2Ifw", {
          api_host: "https://app.posthog.com",
        });
      }
    }
  }, []); // This empty array ensures the effect runs only once, after the component is mounted

  return null;
}
