import db from "~/pages/uf/estados.json";

function ufList() {
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
  document.getElementById("q-restart")?.addEventListener("click", start);
  //
  function start() {
    let ufsArray = [...ufs.short];
    let rndInt: number[] = randomNums(27);
    let shuffledFlags = shuffle(ufsArray);
    placeFlags(shuffledFlags);
    let game = { q: 0, guesses: 0, right: 0, questionSeq: rndInt };
    console.log(game);
    generateQuestion(game.questionSeq[game.q]);
    return game;
  }

  //console.log(`${ufs.short[4]} + ${ufs.long[4]}`);

  function placeFlags(shuffledFlags: string[]) {
    if (!document.getElementById(shuffledFlags[0])) {
      for (const UF of shuffledFlags) {
        const flag = document.createElement("img");
        flag.className =
          "w-32 m-3 inline transition-all shadow hover:cursor-pointer q-flag hover:scale-105 active:scale-110";
        flag.src = `/states/${UF}-bandeira.svg`;
        flag.alt = `Bandeira ${UF}`;
        flag.id = UF;
        flag.addEventListener("click", guess);
        document.getElementById("q-bandeiras")?.appendChild(flag);
      }
    } else {
      let flags = Array.from(document.getElementsByClassName("q-flag"));
      flags.forEach((flag) => {
        flag.classList.remove("q-tip", "q-disabled", "q-tip-animation");
        flag.addEventListener("click", guess);
      });
      /* for (let i = 0; i < flags.length; i++) {
        let flag = flags[i];
        flag.classList.remove("q-tip");
        flag.classList.remove("q-disabled");
        flag.classList.remove("q-tip-animation");
        flag.addEventListener("click", guess);
      } */
    }
  }

  function generateQuestion(idx: number | undefined): number {
    if (idx === undefined) {
      document.getElementById("question").textContent = `Fim de jogo`;
      endGame();
      return 0;
    }
    const p = document.getElementById("q-question");
    p.textContent = `Clique na bandeira: ${ufs.long[idx]}`;
    //console.log(`${ufs.short[idx]} - ${ufs.long[idx]} - ${idx}`);
    return idx;
  }

  //
  //
  //
  const ufs = ufList();
  let game = start();
  //
  //
  //
  //
  function guess(this: any) {
    //console.log("current:" + questionFlag);
    //console.log(rndInt.length);
    //console.log(this.id + ufs.long[currentQuestion]);
    const tryFlagId = this.id;
    const ansFlagId = ufs.short[game.q];
    const ansFlag = document.getElementById(ansFlagId);
    if (!ansFlag) {
      return;
    } else if (tryFlagId === ansFlagId) {
      document.getElementById(tryFlagId)?.removeEventListener("click", guess);
      game.guesses = 0;
      game.q = generateQuestion(game.questionSeq.shift());
      //console.log(game.questionSeq.length);
      ansFlag.classList.remove("q-tip", "q-tip-animation");
      ansFlag.classList.add("q-disabled");
    } else if (game.guesses === 4) {
      game.guesses = 0;
      ansFlag.classList.add("q-tip", "q-tip-animation");
    }
    game.guesses++;
    return game.guesses;
  }

  function endGame() {
    document.getElementById("question").textContent = `Fim de jogo`;
  }
};
