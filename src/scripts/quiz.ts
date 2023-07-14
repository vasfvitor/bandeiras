import db from "~/pages/uf/estados.json";

interface TheQuiz {
  q: number;
  guesses: number;
  sequence: number[];
  currentAns: number;
}

function getUfs() {
  const uf = db?.map((db) => db.UF);
  const uf_name = db?.map((db) => db.Name);
  const ufs = { short: uf, long: uf_name };
  return ufs;
}

function shuffle(arr: any[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function randomNums(n: number): number[] {
  let nums = Array(n)
    .fill(0)
    .map((_: any, i: number) => i);
  return shuffle(nums);
}
//
//
window.onload = function () {
  document.getElementById("q-restart")?.addEventListener("click", reset);
  //
  let theGame: TheQuiz = {
    q: 0,
    guesses: 0,
    sequence: randomNums(27),
    currentAns: 0,
  };

  function start(): TheQuiz {
    let shuffledFlags = shuffle([...ufs.short]);
    placeFlags(shuffledFlags);
    randomizeQuestion();
    return theGame;
  }

  function reset() {
    theGame.guesses = 0;
    console.log("before = " + theGame.currentAns);
    randomizeQuestion();
    console.log("after  = " + theGame.currentAns);
    restartFlags();
    return theGame;
  }

  function randomizeQuestion() {
    theGame.sequence = randomNums(27);
    theGame.currentAns = generateQuestion(theGame.sequence.shift());
  }

  function placeFlags(shuffledFlags: string[]) {
    if (!document.getElementById(shuffledFlags[0])) {
      const div = document.getElementById("q-bandeiras");
      for (const UF of shuffledFlags) {
        const flag = document.createElement("img");
        flag.className =
          "w-32 m-3 inline transition-all shadow hover:cursor-pointer q-flag hover:scale-105 active:scale-110";
        flag.src = `/states/${UF}-bandeira.svg`;
        flag.alt = `Bandeira ${UF}`;
        flag.id = UF;
        flag.addEventListener("click", guess);
        div?.appendChild(flag);
      }
    }
  }

  function restartFlags() {
    let flags = Array.from(document.getElementsByClassName("q-flag"));
    flags.forEach((flag) => {
      flag.removeEventListener("click", guess);
      flag.classList.remove("q-tip", "q-disabled", "q-tip-animation");
      flag.addEventListener("click", guess);
    });
  }

  function generateQuestion(idx: number | undefined): number {
    if (idx === undefined) {
      document.getElementById("q-question").textContent = `Fim de jogo`;
      endGame();
      return 0;
    }
    const p = document.getElementById("q-question");
    p.textContent = `Clique na bandeira: ${ufs.long[idx]}`;
    return idx;
  }
  //
  //
  const ufs = getUfs();
  start();
  //
  //
  function guess(this: any) {
    console.log(theGame.currentAns);
    const tryFlagId = this.id;
    const ansFlagId = ufs.short[theGame.currentAns];
    const ansFlag = document.getElementById(ansFlagId) as HTMLImageElement;
    /*if (!ansFlag) {
      return;
    } else
    */

    if (tryFlagId === ansFlagId) {
      this.removeEventListener("click", guess);
      theGame.guesses = 0;
      theGame.currentAns = generateQuestion(theGame.sequence.shift());
      console.log("curr = " + theGame.currentAns);
      ansFlag.classList.remove("q-tip", "q-tip-animation");
      ansFlag.classList.add("q-disabled");
    } else if (theGame.guesses === 4) {
      theGame.guesses = 0;
      ansFlag.classList.add("q-tip", "q-tip-animation");
    }
    theGame.guesses++;
  }

  function endGame() {
    document.getElementById("question").textContent = `Fim de jogo`;
  }
};
