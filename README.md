Challenge goals:

React Hook Form, Prisma, SWR, API Routes 그리고 iron-session 를 사용하여. 아래 3개의 페이지를 빌드하세요.
Sign Up: 유저는 계정을 생성할 수 있습니다.
Sign In: 유저는 로그인 할 수 있습니다.
Home: 유저는 프로필을 볼 수 있습니다.

요구사항:

유저가 로그인 되어있지 않으면 / 페이지는 /create-account 페이지로 리다이렉트 되어야 한다.
유저가 계정을 생성한 후에는. /log-in 페이지로 리다이렉트 되어야 한다.
유저가 로그인 할 때에는 / 으로 리다이렉트 하여 그들의 프로필을 볼 수 있어야 한다.
Notes:

[blueprint](https://codesandbox.io/s/nextjs-prisma-sqlite-2n35ov?file=/prisma/schema.prisma)
Prisma is configured in the blueprint with SQLite.
When you modify your prisma.schema run npm run db-sync.
Here is how you can run commands in Codesandbox:
