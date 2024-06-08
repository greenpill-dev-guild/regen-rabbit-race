import { farcasterHubContext } from "frames.js/middleware";
import { createFrames, Button } from "frames.js/next";
import { fetchRounds } from "../modules/graphql";
import { useState } from "react";

let projectNames: any[] = [];
let i = 0
// const hel = "hello"
// const [projNames, setProjName] = useState([]);
let allRoundIDs: any[] = []
const getRounds = async () => {
  const rounds = await fetchRounds();
  // console.log(rounds);
  console.log("ROUNDS DATA", rounds[0].id);
  // console.log("length of data", rounds.length)
  
  // console.log("Project name", rounds[0]['project']['name']);
  // // setProjName(rounds[0]['project']);
  // let arr : any[] = []
  rounds.forEach(round => {
    let roundID = round.id;
    allRoundIDs.push(roundID);
  });
  // // setProjName(arr);
  console.log(allRoundIDs);
}
const frames = createFrames({
  basePath: '/frames',
  middleware: [
    farcasterHubContext({
      // remove if you aren't using @frames.js/debugger or you just don't want to use the debugger hub
      ...(process.env.NODE_ENV === "production"
        ? {}
        : {
            hubHttpUrl: "http://localhost:3010/hub",
          }),
    }),
  ],
});

const handleRequest = frames(async (ctx) => {
  console.log("CTX data", ctx);
  console.log("HELLO")
  getRounds();
  return {
    image: ctx.message ? (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        GM, {ctx.message.requesterUserData?.displayName}! Your FID is{" "}
        {ctx.message.requesterFid}
        {", "}
        {ctx.message.requesterFid < 20_000
          ? "you're OG!"
          : "welcome to the Farcaster!"}
      </div>
    ) : (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        GM {projectNames[i]}

      </div>
    ),
    buttons: !ctx.url.searchParams.has("saidGm")
      ? [
          // <Button action="post" target={{ query: { saidGm: true } }}>
          <Button action="link" target={"https://www.gitcoin.co"}>
            View Round
          </Button>,
          <Button action="post" target={{ pathname: "/route1", query: { roundId: "0x00d5e0d31d37cc13c645d86410ab4cb7cb428cca", i : 0 } }}>
            View Projects
          </Button>,
        ]
      : [],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;


// import { farcasterHubContext } from "frames.js/middleware";
// import { createFrames, Button } from "frames.js/next";
// import { fetchRounds } from "../modules/graphql";
// import { useState } from "react";

// let projectNames = [];

// const getProjs = async () => {
//   const rounds = await fetchRounds();
//   rounds['rounds'].forEach(round => {
//     let projectName = round['project']['name'];
//     projectNames.push(projectName);
//   });
// }

// const frames = createFrames({
//   basePath: '/frames',
//   middleware: [
//     farcasterHubContext({
//       // remove if you aren't using @frames.js/debugger or you just don't want to use the debugger hub
//       ...(process.env.NODE_ENV === "production"
//         ? {}
//         : {
//             hubHttpUrl: "http://localhost:3010/hub",
//           }),
//     }),
//   ],
// });

// const handleRequest = frames(async (ctx) => {
//   if (!ctx.session.i) {
//     ctx.session.i = 0;
//     await getProjs();
//   }

//   if (ctx.url.pathname === "/route1" && ctx.message?.query?.next) {
//     ctx.session.i = (ctx.session.i + 1) % projectNames.length;
//   }

//   return {
//     image: (
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         GM {projectNames[ctx.session.i]}
//       </div>
//     ),
//     buttons: [
//       <Button action="post" target={{ pathname: "/route1", query: { next: true } }}>
//         Next
//       </Button>,
//     ],
//   };
// });

// export const GET = handleRequest;
// export const POST = handleRequest;
