import Stripe from 'stripe';
import express from 'express';
import bodyParser from 'body-parser';

const stripe = new Stripe(process.env.STRIPE_API_KEY!);

/**
 * You'll need to make sure this is externally accessible.  ngrok (https://ngrok.com/)
 * makes this really easy.s
 *
 * To run this file, just provide your Secret API Key and Webhook Secret, like so:
 * STRIPE_API_KEY=sk_test_XXX WEBHOOK_SECRET=whsec_XXX node express.js
 */

const webhookSecret: string = process.env.WEBHOOK_SECRET!;
const app: express.Application = express();

// Stripe requires the raw body to construct the event
app.post(
  '/webhooks',
  bodyParser.raw({type: 'application/json'}),
  (req: express.Request, res: express.Response) => {
    const sig: string = req.headers['stripe-signature'] as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      // On error, return the error message
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Do something with event
    console.log('Success:', event.id);

    // Return a response to acknowledge receipt of the event
    res.json({received: true});
  }
);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
