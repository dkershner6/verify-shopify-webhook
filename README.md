# shopify-verify-webhook

Verify shopify webhook using any API solution, make your own middleware easily.
Only dependency is on `raw-body`, this is a very tiny library.

## Installation

`npm i shopify-verify-webhook`

## Usage

```typescript
import verifyWebhook from 'shopify-verify-webhook';

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
