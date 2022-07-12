Graduation Project! 마지막 졸업작품

1주일동안 아래 졸업작품을 마무리하고 제출합니다.
이때까지 배운 것을 토대로, 미니 트위터 클론을 완성합니다.
NextJS, Prisma, Tailwind, API Routes 그리고 SWR 를 활용하여 아래 페이지를 완성합니다.
/: Logged In ? Home Page otherwise redirect to Create Account / Log in
/create-account: Create Account
/log-in: Log In
/tweet/[id]: See one Tweet
/:

After logging in, in the Home Page, the user should see all the Tweets on the database, the user should also be able to POST a Tweet.

/tweet/[id]:

The user should be able to see the tweet + a Like button.

When the Like button is pressed, save the like on the database and reflect the update using mutate from useSWR.

참고사항

Prisma is configured in the blueprint with SQLite.
When you modify your prisma.schema run npm run db-sync.
SWR and Tailwind are also configured in the blueprint.
환경설정

블루프린트를 다운로드 받아. 로컬 컴퓨터에서 작업하세요.
Blueprint > File > Export to Zip
완료 후 컴퓨터에서 열고. npm i 을 실행하세요.
코딩 챌린지를 완료한 후. https://codesandbox.io/dashboard 으로 이동하여.
'Create Sandbox' > Import Project 한 후에 프로젝트의 깃헙 URL 을 복사. 붙여넣기 하면 됩니다.
