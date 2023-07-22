import * as helper from "~/scripts/quiz-helper";
import * as anim from "~/scripts/quiz-animation";
import { TIME } from "~/scripts/quiz-animation";
//
window.addEventListener("load", function () {
  document.getElementById("q-restart")?.addEventListener("click", reset);

  const d_score = document.getElementById("q-score") as HTMLSpanElement;

  const INITIAL_SCORE = "0.0";
  const FLAG_COUNT = 27;
  const MAX_TRIES = 4;

  // the container wraps flags and labels
  const container_classes = `inline-flex flex-col place-items-center text-center`;
  const flag_classes =
    "w-1/2 md:w-24 m-4 md:m-5 inline border-4 relative transition-all shadow hover:cursor-pointer q-flag hover:scale-105 active:scale-110";
  const label_classes =
    "invisible pulse -mt-6 z-10 bg-gray-100 relative w-fit font-sm px-4 font-bold rounded uf_label";

  const quizz = {
    loaded: false,
    answer: 0,
    tries: 0,
    total_tries: 0,
    current_q: 0,
    score: INITIAL_SCORE,
    questions: helper.randomNums(FLAG_COUNT),
  };

  function load(): void {
    const ssFlags = helper.shuffle([...ufs.short]);
    placeFlags(ssFlags);
    init();
  }

  function reset(): void {
    const score = document.getElementById("q-chal") as HTMLSpanElement;
    const end = document.getElementById("q-end") as HTMLSpanElement;
    setTimeout(() => {
      end.classList.add("hidden");
      score.classList.remove("hidden");
    }, TIME);

    anim.ResetBtn();
    init();
    restartFlags();
  }

  function init(): void {
    quizz.tries = 0;
    quizz.current_q = 0;
    quizz.total_tries = 0;
    quizz.score = INITIAL_SCORE;
    quizz.questions = helper.randomNums(FLAG_COUNT);
    d_score.innerHTML = `${quizz.score}%`;
    getNewQuestion(quizz.questions.shift());
  }

  function placeFlags(shuffledFlags: string[]) {
    if (!quizz.loaded) {
      const d_flag = document.getElementById(
        "q-flag-container"
      ) as HTMLDivElement;
      shuffledFlags.map((UF) => {
        const div = createContainer(UF);
        const flag = createFlag(UF);
        anim.Flags(flag);
        div.appendChild(flag);
        div.appendChild(createLabels(UF));
        d_flag.appendChild(div);
      });
      quizz.loaded = true;
    }
  }

  // Remove and add event listeners and classes for all flags
  function restartFlags(): void {
    const flags = document.querySelectorAll(".q-flag");
    flags.forEach((f) => {
      f.removeEventListener("click", q_loop);
      f.classList.remove("q-tip", "q-disabled", "q-tip-animation");

      setTimeout(() => {
        f.addEventListener("click", q_loop);
      }, TIME);
    });
    const labels = document.querySelectorAll(".uf_label");
    labels.forEach((l) => {
      l.classList.add("invisible");
    });
  }

  // This function is always called with quizz.questions.shift().
  // TODO make quizz.questions.shift() inside the function and call it
  // without any argument
  function getNewQuestion(i: number | undefined) {
    // i is the current quizz.questions.shift()
    if (i === undefined) {
      end();
      return;
    }
    const p = document.getElementById("q-question") as HTMLSpanElement;
    p.innerHTML = `${ufs.long[i]}`;
    quizz.answer = i;
  }
  //
  // initialize quiz
  const ufs = helper.getUfs();
  load();
  //
  //

  // main loop
  // check if the answer is right
  // check number of tries
  // update score
  // check if mobile to scroll asnwer into view
  function q_loop(this: HTMLElement): void {
    const tryFlagId = this.id;
    const ansFlagId = ufs.short[quizz.answer];
    const d_ansFlag = document.getElementById(ansFlagId) as HTMLImageElement;
    const d_label = document.getElementById(
      `${tryFlagId}_label`
    ) as HTMLImageElement;
    if (tryFlagId === ansFlagId) {
      quizz.current_q++;
      handleLabel(d_label);
      this.removeEventListener("click", q_loop);
      d_ansFlag.classList.remove("q-tip", "q-tip-animation");
      d_ansFlag.classList.add("q-disabled");
      //
      getNewQuestion(quizz.questions.shift());
      //
      quizz.tries = 0;
    } else if (quizz.tries >= MAX_TRIES) {
      d_ansFlag.classList.add("q-tip", "q-tip-animation");
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        d_ansFlag.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    anim.Label(d_label, "DEFAULT");
    quizz.total_tries++;
    quizz.tries++;
    //
    updateScore();
  }

  function updateScore(): void {
    let score = (quizz.current_q / quizz.total_tries) * 100;

    if (score >= parseFloat(quizz.score)) {
      anim.scoreAnimation(d_score, 1);
    } else {
      anim.scoreAnimation(d_score);
    }
    quizz.score = score.toFixed(1);
    d_score.innerHTML = `${quizz.score}%`;
  }

  function createFlag(UF: string): HTMLImageElement {
    const f = document.createElement("img");
    f.className = flag_classes;
    f.src = `/states/${UF}-bandeira.svg`;
    f.alt = `Bandeira ${UF}`;
    f.id = UF;
    f.addEventListener("click", q_loop);
    return f;
  }

  function createLabels(UF: string): HTMLElement {
    const UF_long = helper.getUFname(UF);
    const l = document.createElement("small");
    l.textContent = UF_long;
    l.className = label_classes;
    l.id = `${UF}_label`;
    return l;
  }

  function createContainer(UF: string): HTMLDivElement {
    const d = document.createElement("div");
    d.className = container_classes;
    d.id = `${UF}_container`;
    return d;
  }

  function handleLabel(label: HTMLImageElement) {
    if (quizz.tries <= 1) {
      anim.Label(label, "RIGHT");
    } else if (quizz.tries < MAX_TRIES) {
      anim.Label(label, "PARTIAL");
    } else {
      anim.Label(label, "WRONG");
    }
  }

  function end(): void {
    const score = document.getElementById("q-chal") as HTMLSpanElement;
    const end = document.getElementById("q-end") as HTMLSpanElement;
    score.classList.add("hidden");
    end.classList.remove("hidden");
  }
});
