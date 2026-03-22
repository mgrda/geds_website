// This file is used by Next.js as a client-side entry point for instrumentation.
import * as Sentry from "@sentry/nextjs";

if (!Sentry.getClient()) {
  Sentry.init({
    dsn: "https://ca404a6f968eb5e8efeaba1ffe481cdc@o4510932146847744.ingest.us.sentry.io/4510932231454720",
    integrations: [Sentry.replayIntegration()],
    tracesSampleRate: 1,
    enableLogs: true,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    sendDefaultPii: true,
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
