import { withIronSessionApiRoute } from 'iron-session/next';

// iron session에 sesstion type 정의
declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: 'carrot_challenge',
  password: 'H3YpHFocJg7QretLhDqcsW1oiefWQvh3aeANB6xgc7yw5o1aasdfjZ',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
