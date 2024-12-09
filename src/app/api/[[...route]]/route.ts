import { Hono } from "hono";
import { handle } from "hono/vercel";

import auth from "@/features/auth/server/route";
import members from "@/features/members/server/route";
import projects from "@/features/projects/server/route";
import workspaces from "@/features/workspaces/server/route";
import tasks from "@/features/tasks/server/route";
import Stripe from "stripe";
import { BlankEnv, BlankSchema } from "./env";

//const app = new Hono().basePath("/api");
const app = new Hono<BlankSchema>().basePath("/api");

app.post("/webhook", async (context) => {
  const STRIPE_API_KEY = process.env.STRIPE_API_KEY as string;
  const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

  const stripe = new Stripe(STRIPE_API_KEY);
  const signature = context.req.header("stripe-signature");
  try {
    if (!signature) {
      return context.text("", 400);
    }
    const body = await context.req.text();
    const event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET
    );
    switch (event.type) {
      case "payment_intent.created": {
        console.log(event.data.object);
        break;
      }
      default:
        break;
    }
    return context.text("", 200);
  } catch (err) {
    const errorMessage = `⚠️  Webhook signature verification failed. ${
      err instanceof Error ? err.message : "Internal server error"
    }`;
    console.log(errorMessage);
    return context.text(errorMessage, 400);
  }
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/auth", auth)
  .route("/workspaces", workspaces)
  .route("/members", members)
  .route("/projects", projects)
  .route("/tasks", tasks)
  .route("/home", tasks);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
