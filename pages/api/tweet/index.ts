import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '../../../libs/server/withHandler';
import client from '../../../libs/server/client';
import { withApiSession } from '../../../libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const tweets = await client.tweet.findMany({
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  });
  res.json({
    ok: true,
    tweets,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    isPrivate: true,
    handler,
  })
);
