import crypto from 'crypto';
import { IncomingMessage } from 'http';
import getRawBody from 'raw-body';

import WebhookHeader from './WebhookHeader';

export interface VerifiedWebhook {
    verified: boolean;
    topic: string | string[];
    domain: string | string[];
    body: Record<string, unknown>;
}

const verifyWebhook = async (
    req: IncomingMessage,
    shopifySecret: string
): Promise<VerifiedWebhook> => {
    const hmac =
        req.headers[WebhookHeader.Hmac] ??
        req.headers[WebhookHeader.Hmac.toLowerCase()];
    const topic =
        req.headers[WebhookHeader.Topic] ??
        req.headers[WebhookHeader.Topic.toLowerCase()];
    const domain =
        req.headers[WebhookHeader.Domain] ??
        req.headers[WebhookHeader.Domain.toLowerCase()];

    const rawBody = await getRawBody(req);

    const hash = crypto
        .createHmac('sha256', shopifySecret)
        .update(rawBody)
        .digest('base64');
    console.log(hash);
    return {
        verified: hash === hmac,
        topic,
        domain,
        body: JSON.parse(rawBody.toString('utf8'))
    };
};

export default verifyWebhook;
