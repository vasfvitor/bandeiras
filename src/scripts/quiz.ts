import db from "~/pages/uf/estados.json";

interface TheQuiz {
  score: number;
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
window.addEventListener("load", function () {
  //window.onload = function () {
  document.getElementById("q-restart")?.addEventListener("click", reset);
  //
  let score = document.getElementById("q-score");

  let theGame: TheQuiz = {
    score: 14,
    guesses: 0,
    sequence: randomNums(27),
    currentAns: 0,
  };

  function start(): void {
    let shuffledFlags = shuffle([...ufs.short]);
    placeFlags(shuffledFlags);
    initGame();
  }

  function reset(): void {
    let restarting = document.getElementById("q-restarting");
    restarting.classList.remove("hidden");
    restarting.classList.add("q-restart", "scale-out-center");
    restarting.addEventListener("animationend", () => {
      restarting.classList.remove("q-restart", "scale-out-center");
      restarting.classList.add("hidden");
    });
    initGame();
    restartFlags();
  }

  function initGame(): void {
    theGame.guesses = 0;
    theGame.score = 14;
    score.innerHTML = ` ${theGame.score}`;
    theGame.sequence = randomNums(27);
    theGame.currentAns = generateQuestion(theGame.sequence.shift());
  }

  function placeFlags(shuffledFlags: string[]) {
    if (!document.getElementById(shuffledFlags[0])) {
      const div = document.getElementById("q-bandeiras");
      for (const UF of shuffledFlags) {
        const flag = document.createElement("img");
        flag.className =
          "w-20 md:w-32 m-2 md:m-3 inline relative transition-all shadow hover:cursor-pointer q-flag hover:scale-105 active:scale-110";
        flag.src = `/states/${UF}-bandeira.svg`;
        flag.alt = `Bandeira ${UF}`;
        flag.id = UF;
        flag.addEventListener("click", guess);
        flag.addEventListener("click", animate);
        div?.appendChild(flag);
      }
    }
    let flags = Array.from(document.getElementsByClassName("q-flag"));
    flags.forEach((flag) => {
      createAnimation(flag);
    });
  }

  function restartFlags(): void {
    let flags = Array.from(document.getElementsByClassName("q-flag"));
    flags.forEach((flag) => {
      flag.removeEventListener("click", guess);
      flag.classList.remove("q-tip", "q-disabled", "q-tip-animation");
      flag.addEventListener("click", guess);
    });
  }

  function generateQuestion(idx: number | undefined): number {
    if (idx === undefined) {
      document.getElementById("q-chal").innerHTML = `Fim de jogo`;
      document.getElementById("q-question").innerHTML = ``;
      endGame();
      return 0;
    }
    const p = document.getElementById("q-question");
    p.innerHTML = `${ufs.long[idx]}`;
    return idx;
  }
  //
  //
  const ufs = getUfs();
  start();
  //
  //
  function guess(this: any): void {
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
      theGame.score += Math.floor(12 / (theGame.guesses || 1));
      theGame.guesses = 0;
      theGame.currentAns = generateQuestion(theGame.sequence.shift());
      console.log("curr = " + theGame.currentAns);
      ansFlag.classList.remove("q-tip", "q-tip-animation");
      ansFlag.classList.add("q-disabled");
    } else if (theGame.guesses === 4) {
      theGame.guesses = 0;
      theGame.score -= 9;
      ansFlag.classList.add("q-tip", "q-tip-animation");
    } else {
      theGame.score -= 1;
    }
    theGame.guesses++;
    if (theGame.score < 0) {
      reset();
    }
    score.innerHTML = ` ${theGame.score}`;
  }

  function endGame(): void {
    document.getElementById("q-question").textContent = `Fim de jogo`;
  }

  function createAnimation(flag: any) {
    const options = document.querySelectorAll(".q-flag");

    options.forEach((option) => {
      option.addEventListener("click", () => {
        option.classList.add("pulse");
        setTimeout(() => {
          option.classList.remove("pulse");
        }, 1000); // Tempo de duração da animação em milissegundos
      });
    });
    //ufs.long

    console.log(flag);
    if (!document.getElementById(`${flag.id}-tooltip`)) {
      const tooltip = document.createElement("span");
      tooltip.className = "bg-black absolute z-10 text-white";
      tooltip.textContent = `${flag.id}`;
      tooltip.id = `${flag.id}-tooltip`;
      console.log(flag);
      flag.appendChild(tooltip);
    }
  }
  function animate() {
    return 0;
  }
});
