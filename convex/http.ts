import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";

const http = httpRouter();

http.route({
    path: "/clerk-webhook",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        console.log("========== CLERK WEBHOOK RECEIVED ==========");
        console.log("Request URL:", request.url);
        console.log("Request method:", request.method);
        console.log("Has Svix ID:", !!request.headers.get("svix-id"));
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

        if (!webhookSecret) {
            console.error("Missing CLERK_WEBHOOK_SECRET");
            return new Response("Missing webhook secret", {
                status: 500,
            });
        }

        const svixId = request.headers.get("svix-id");
        const svixSignature = request.headers.get("svix-signature");
        const svixTimestamp = request.headers.get("svix-timestamp");

        if (!svixId || !svixSignature || !svixTimestamp) {
            return new Response("Missing Svix headers", {
                status: 400,
            });
        }

        const body = await request.text();

        const wh = new Webhook(webhookSecret);

        let evt: WebhookEvent;

        try {
            // Step 1: Verify the webhook signature
            wh.verify(body, {
                "svix-id": svixId,
                "svix-timestamp": svixTimestamp,
                "svix-signature": svixSignature,
            });

            // Step 2: Parse the verified payload
            evt = JSON.parse(body) as WebhookEvent;
        } catch (error) {
            console.error("Webhook verification/parsing failed:", error);

            return new Response("Webhook verification failed", {
                status: 400,
            });
        }

        console.log("Received Clerk webhook:", evt.type);

        if (!evt || !evt.type) {
            console.error("Invalid webhook event:", evt);

            return new Response("Invalid webhook event", {
                status: 400,
            });
        }

        console.log("Received Clerk webhook:", evt.type);

        if (evt.type === "user.created") {
            const { id, email_addresses, first_name, last_name, image_url } =
                evt.data;

            const email = email_addresses?.[0]?.email_address;

            if (!email) {
                return new Response("User email not found", {
                    status: 400,
                });
            }

            const name = `${first_name || ""} ${last_name || ""}`.trim();

            try {
                await ctx.runMutation(api.users.syncUser, {
                    clerkId: id,
                    email,
                    name,
                    image: image_url,
                });

                console.log("User successfully synchronized:", id);
            } catch (error) {
                console.error("Error creating user:", error);

                return new Response("Error creating user", {
                    status: 500,
                });
            }
        }

        return new Response("Webhook processed successfully", {
            status: 200,
        });
    }),
});

export default http;
