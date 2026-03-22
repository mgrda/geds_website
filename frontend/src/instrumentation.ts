import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    Sentry.init({
      dsn: "https://ca404a6f968eb5e8efeaba1ffe481cdc@o4510932146847744.ingest.us.sentry.io/4510932231454720",
      tracesSampleRate: 1,
      enableLogs: true,
      sendDefaultPii: true,
    });
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    Sentry.init({
      dsn: "https://ca404a6f968eb5e8efeaba1ffe481cdc@o4510932146847744.ingest.us.sentry.io/4510932231454720",
      tracesSampleRate: 1,
      enableLogs: true,
      sendDefaultPii: true,
    });
  }
}

export const onRequestError = Sentry.captureRequestError;
