import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from 'libs/server/withHandler';
import client from '../../libs/server/client';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { name, email } = req.body;

  const user = await client.user.upsert({
    where: {
      email,
    },
    create: {
      email,
      name,
    },
    update: {},
  });

  console.log(user);

  res.json({
    ok: true,
    user,
  });
}

export default withHandler({
  methods: ['POST'],
  isPrivate: false,
  handler,
});
