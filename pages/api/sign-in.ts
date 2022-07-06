import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '../../libs/server/withHandler';
import client from '../../libs/server/client';
import { withApiSession } from '../../libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email } = req.body;
  const matchedUser = await client.user.findUnique({
    where: {
      email,
    },
  });
  if (!matchedUser) return res.status(404).end();

  req.session.user = {
    id: matchedUser.id,
  };
  await req.session.save();

  res.json({
    ok: true,
  });
}

export default withApiSession(
  withHandler({
    methods: ['POST'],
    isPrivate: false,
    handler,
  })
);
