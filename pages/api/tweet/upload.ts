import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '../../../libs/server/withHandler';
import client from '../../../libs/server/client';
import { withApiSession } from '../../../libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { tweet },
    session: { user },
  } = req;
  const newTweet = await client.tweet.create({
    data: {
      tweet,
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  res.json({
    ok: true,
    newTweet,
  });
}

export default withApiSession(
  withHandler({
    methods: ['POST'],
    isPrivate: true,
    handler,
  })
);
