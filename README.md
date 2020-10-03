# verify-shopify-webhook

Verify shopify webhook using any API solution, make your own middleware easily.
Requires a raw body (shopify requirement), but parses to JSON for you.
Only dependency is on `raw-body`, this is a very tiny library.

## Installation

`npm i verify-shopify-webhook`

## Usage

```typescript
import verifyWebhook from 'verify-shopify-webhook';

const middleware = async (req, res, next) => {
    const shopifySecret = process.env.SHOPIFY_SECRET;

    const { verified, topic, domain, body } = await verifyWebhook(
        req,
        shopifySecret
    );

    if (!verified) {
        return res.status(403).send();
    }

    req.body = body;

    return next();
};
```
