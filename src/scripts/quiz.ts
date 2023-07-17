import db from "~/pages/uf/estados.json";
import * as helper from "~/scripts/quiz-helper";
import * as anim from "~/scripts/quiz-animation";

function getUfs() {
  const uf = db?.map((db) => db.UF);
  const uf_name = db?.map((db) => db.Name);
  const ufs = { short: uf, long: uf_name };
  return ufs;
}
//
window.addEventListener("load", function () {
  //window.onload = function () {
  document.getElementById("q-restart")?.addEventListener("click", reset);

  const d_score = document.getElementById("q-score");
  const FLAG_COUNT = 27;

  let quizz = {
    Score: 14,
    Guess: 0,
    Sequence: helper.randomNums(FLAG_COUNT),
    Ans: 0,
    Started: false,
  };

  function start(): void {
    let ssFlags = helper.shuffle([...ufs.short]);
    placeFlags(ssFlags);
    initGame();
  }

  function reset(): void {
    anim.ResetBtn();
    initGame();
    restartFlags();
  }

  function initGame(): void {
    quizz.Guess = 0;
    quizz.Score = 14;
    d_score.innerHTML = ` ${quizz.Score}`;
    quizz.Sequence = helper.randomNums(27);
    getNewQuestion(quizz.Sequence.shift());
  }

  function placeFlags(shuffledFlags: string[]) {
    if (!quizz.Started) {
      const d_flag = document.getElementById("q-flags") as HTMLElement;
      shuffledFlags.map((UF) => {
        const f = document.createElement("img");
        const div = document.createElement("div");
        div.className = `inline-flex flex-col after:content-['${UF}'] `
        f.className =
          "w-20 md:w-32 m-2 md:m-3 inline relative transition-all shadow hover:cursor-pointer q-flag hover:scale-105 active:scale-110";
        f.src = `/states/${UF}-bandeira.svg`;
        f.alt = `Bandeira ${UF}`;
        f.id = UF;
        f.addEventListener("click", guess);
        f.addEventListener("click", anim.animate);
        div.appendChild(f);
        d_flag.appendChild(div);
      });
      quizz.Started = true;
    }

    const flags = document.querySelectorAll(".q-flag");
    flags.forEach((f) => {
      anim.Flags(f as HTMLElement);
    });
  }

  function restartFlags(): void {
    let flags = Array.from(document.getElementsByClassName("q-flag"));
    flags.forEach((f) => {
      f.removeEventListener("click", guess);
      f.classList.remove("q-tip", "q-disabled", "q-tip-animation");
      f.addEventListener("click", guess);
    });
  }

  function getNewQuestion(idx: number | undefined) {
    if (idx === undefined) {
      document.getElementById("q-chal").innerHTML = `Fim de jogo`;
      document.getElementById("q-question").innerHTML = ``;
      endGame();
      return 0;
    }
    const p = document.getElementById("q-question");
    p.innerHTML = `${ufs.long[idx]}`;
    quizz.Ans = idx;
  }
  //
  //
  const ufs = getUfs();
  start();
  //
  //
  function guess(this: HTMLElement): void {
    const tryFlagId = this.id;
    const ansFlagId = ufs.short[quizz.Ans];
    const d_ansFlag = document.getElementById(ansFlagId) as HTMLImageElement;

    if (tryFlagId === ansFlagId) {
      this.removeEventListener("click", guess);
      quizz.Score += Math.floor(12 / (quizz.Guess || 1));
      quizz.Guess = 0;
      getNewQuestion(quizz.Sequence.shift());
      d_ansFlag.classList.remove("q-tip", "q-tip-animation");
      d_ansFlag.classList.add("q-disabled");
    } else if (quizz.Guess === 4) {
      quizz.Score -= 9;
      quizz.Guess = 0;
      d_ansFlag.classList.add("q-tip", "q-tip-animation");
    } else {
      quizz.Score -= 1;
    }

    if (quizz.Score < 0) {
      reset();
    }
    quizz.Guess++;
    updateScore();
  }

  function updateScore(): void {
    d_score.innerHTML = ` ${quizz.Score}`;
    anim.showScoreAnimation(d_score);
  }

  function endGame(): void {
    document.getElementById("q-question").textContent = `Fim de jogo`;
  }
});
