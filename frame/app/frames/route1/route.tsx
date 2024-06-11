import { frames } from "../frames";
import { Button } from "frames.js/next";
import { fetchRounds, fetchRound } from "../../modules/graphql";

const getProjs = async () => {
  let projectNames : any[] = []
  const rounds = await fetchRounds();
  // console.log(rounds);
  // console.log("ROUNDS DATA", rounds[0]);
  // console.log("length of data", rounds.length)
  
  // console.log("Project name", rounds[0]['project']['name']);
  // setProjName(rounds[0]['project']);
  let arr : any[] = []
  rounds.forEach(round => {
    let projectName = round['project']['name'];
    projectNames.push(projectName);
  });
  // setProjName(arr);
  // console.log(projectNames);
  return projectNames;
}
const getRoundDetails = async (roundID: string) => {
  let projectNames : any[] = []
  const round = await fetchRound(roundID);
  console.log("round details", round);
  // console.log("ROUNDS DATA", rounds[0]);
  // console.log("length of data", rounds.length)
  
  // console.log("Project name", rounds[0]['project']['name']);
  // setProjName(rounds[0]['project']);
  // let arr : any[] = []
  // rounds.forEach((round: { [x: string]: { [x: string]: any; }; }) => {
  //   let projectName = round['project']['name'];
  //   projectNames.push(projectName);
  // });
  // setProjName(arr);
  // console.log(projectNames);
  // return projectNames;
}

// let i = 0

export const POST = frames(async (ctx) => {
  let i = parseInt(ctx.searchParams.i);
  let roundID = ctx.searchParams.roundId;
  getRoundDetails(roundID);
  if(i < 0) i = 0; 
  //condition for upper check
  let projNames = await getProjs();
  // console.log("HEHE", projNames);
  console.log("variable i ", i);
  return {
    // image: <div tw="flex">GM {projNames[i]}</div>, // foo: bar
    image: 
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        GM {projNames[parseInt(i)]}

       <input>Enter </input>
      </div>
    ,
    buttons: [
      <Button action="post" target={{pathname: "../frames/route1", query: { i : parseInt(i) - 1 }}}>
        Prev Project
      </Button>,

      <Button action="link" target="https://www.gitcoin.co">
        View Project
      </Button>,

      <Button action="post" target={{pathname: "../frames/route1", query: { i : parseInt(i) + 1 }}}>
        Next Project
      </Button>,
    ],
  };
});