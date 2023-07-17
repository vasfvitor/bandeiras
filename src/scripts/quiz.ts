import db from "~/pages/uf/estados.json";
import * as helper from "~/scripts/quiz-helper";
import * as anim from "~/scripts/quiz-animation";

function getUfs(): States {
  const uf = db?.map((db) => db.UF);
  const uf_name = db?.map((db) => db.Name);
  const ufs = { short: uf, long: uf_name };
  return ufs;
}

interface States {
  short: string[];
  long: string[];
}

//
window.addEventListener("load", function () {
  //window.onload = function () {
  document.getElementById("q-restart")?.addEventListener("click", reset);

  const d_score = document.getElementById("q-score");
  const FLAG_COUNT = 27;
  const MAX_TRIES = 5;
  const INITIAL_SCORE = 14;

  let quizz = {
    Score: INITIAL_SCORE,
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
    quizz.Score = INITIAL_SCORE;
    d_score.innerHTML = ` ${quizz.Score}`;
    quizz.Sequence = helper.randomNums(27);
    getNewQuestion(quizz.Sequence.shift());
  }

  function placeFlags(shuffledFlags: string[]) {
    if (!quizz.Started) {
      const d_flag = document.getElementById("q-flag-container") as HTMLElement;
      shuffledFlags.map((UF) => {
        const div = CreateContainer(UF);
        const flag = CreateFlag(UF);
        anim.Flags(flag);
        div.appendChild(flag);
        div.appendChild(CreateLabels(UF));
        d_flag.appendChild(div);
      });
      quizz.Started = true;
    }
  }

  function restartFlags(): void {
    //let flags = Array.from(document.getElementsByClassName("q-flag"));
    const flags = document.querySelectorAll(".q-flag");
    flags.forEach((f) => {
      f.removeEventListener("click", guess);
      f.classList.remove("q-tip", "q-disabled", "q-tip-animation");
      f.addEventListener("click", guess);
    });

    const labels = document.querySelectorAll(".uf_label");
    labels.forEach((l) => {
      l.classList.add("invisible");
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
    const d_label = document.getElementById(
      `${tryFlagId}_label`
    ) as HTMLImageElement;
    if (tryFlagId === ansFlagId) {
      handleLabel(d_label);
      this.removeEventListener("click", guess);
      this.removeEventListener("click", anim.animate);
      d_ansFlag.classList.remove("q-tip", "q-tip-animation");
      d_ansFlag.classList.add("q-disabled");
      //
      getNewQuestion(quizz.Sequence.shift());
      //
      quizz.Score += Math.floor(12 / (quizz.Guess || 1));
      quizz.Guess = 0;
    } else if (quizz.Guess === MAX_TRIES) {
      quizz.Score -= 9;
      d_ansFlag.classList.add("q-tip", "q-tip-animation");
    } else {
      quizz.Score -= 1;
    }
    if (quizz.Score < 0) {
      reset();
    }
    anim.Label(d_label, "DEFAULT");
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

  function getUFname(uf: string): string | null {
    const i = ufs.short.indexOf(uf);
    if (i !== -1) {
      return ufs.long[i];
    }
    return null;
  }

  function CreateFlag(UF: string): HTMLImageElement {
    const f = document.createElement("img");
    f.className =
      "w-1/2 md:w-24 m-4 md:m-5 inline border-4 relative transition-all shadow hover:cursor-pointer q-flag hover:scale-105 active:scale-110";
    f.src = `/states/${UF}-bandeira.svg`;
    f.alt = `Bandeira ${UF}`;
    f.id = UF;
    f.addEventListener("click", guess);
    f.addEventListener("click", anim.animate);
    return f;
  }

  function CreateLabels(UF: string): HTMLElement {
    const UF_long = getUFname(UF);
    const l = document.createElement("small");
    l.textContent = UF_long;
    l.className =
      "invisible -mt-6 z-10 bg-gray-100 relative w-fit font-sm px-4 font-bold rounded uf_label";
    l.id = `${UF}_label`;
    return l;
  }

  function CreateContainer(UF: string): HTMLDivElement {
    const d = document.createElement("div");
    d.className = `inline-flex flex-col place-items-center text-center`;
    d.id = `${UF}_container`;
    return d;
  }

  function handleLabel(label: HTMLImageElement) {
    if (quizz.Guess == 0) {
      anim.Label(label, "RIGHT");
    } else if (quizz.Guess < MAX_TRIES) {
      anim.Label(label, "PARTIAL");
    } else {
      anim.Label(label, "WRONG");
    }
  }
});
