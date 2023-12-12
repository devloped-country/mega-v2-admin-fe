import { SubscribeCommand, SNSClient } from '@aws-sdk/client-sns';

const client = new SNSClient({
  region: 'ap-northeast-3',
  credentials: {
    accessKeyId: import.meta.env.VITE_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_SECRET_KEY,
  },
});

export const subscribeQueue = async () => {
  const command = new SubscribeCommand({
    TopicArn: 'arn:aws:sns:ap-northeast-3:503237308475:bsdev07-dashboard',
    Protocol: 'sqs',
    Endpoint: 'arn:aws:sqs:ap-northeast-3:503237308475:bsdev07-queue',
  });

  const response = await client.send(command);

  return response;
};

export function useSNS() {
  return { subscribeQueue };
}
