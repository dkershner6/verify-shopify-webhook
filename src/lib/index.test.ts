import verifyWebhook from '.';
import WebhookHeader from './WebhookHeader';
import { IncomingMessage } from 'http';
import { Socket } from 'net';
import { mocked } from 'ts-jest/utils';
import getRawBody from 'raw-body';
jest.mock('raw-body');
describe('verifyWebhook', () => {
    const testSecret = 'sphss_sjdnbsfsdjbgksbgksgb';
    const testBodyString = '{"test":{"test2": "testing"}}';

    mocked(getRawBody).mockResolvedValue(Buffer.from(testBodyString));

    it('Should verify a valid webhook req', async () => {
        const req = new IncomingMessage(new Socket());
        req.headers = {
            [WebhookHeader.Hmac]: 'RJCzgKmUoGP/Ylod4MhDP+BXTVOaV4NVbdqa3xn9vw4='
        };

        const result = await verifyWebhook(req, testSecret);

        expect(result.verified).toBeTruthy();
        expect(result.body).toEqual(JSON.parse(testBodyString));
    });
});
