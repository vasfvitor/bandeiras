// sync timeouts
const TIME = 759;
export { TIME };

export function ResetBtn() {
  const q = document.getElementById("q-head") as HTMLDivElement;
  const btn = document.getElementById("q-restart") as HTMLButtonElement;
  const cntr = document.getElementById("q-flag-container") as HTMLElement;
  const flags = document.querySelectorAll(".q-flag");

  // Randomize flags
  setTimeout(() => {
    for (var i = cntr.children.length; i >= 0; i--) {
      cntr.appendChild(cntr.children[(Math.random() * i) | 0]);
    }
  }, TIME);

  // Hide quiz head
  q?.classList.add("animate-pulse", "contrast-0", "brightness-50");
  setTimeout(() => {
    q?.classList.remove("animate-pulse", "contrast-0", "brightness-50");
  }, TIME);

  // Temp disable reset button
  btn.disabled = true;
  btn.classList.add("q-reset");
  setTimeout(() => {
    btn?.classList.remove("q-reset");
    btn.disabled = false;
  }, TIME);

  // Animate all flags on reset
  flags.forEach((f) => {
    f?.classList.add("animate-pulse", "q-reset");

    setTimeout(() => {
      f?.classList.remove("animate-pulse", "q-reset");
    }, TIME);
  });
}

// Animate flag on click
export function Flags(flag: any) {
  const options = document.querySelectorAll(".q-flag");

  options.forEach((option) => {
    option.addEventListener("click", () => {
      option.classList.add("pulse");
      setTimeout(() => {
        option.classList.remove("pulse");
      }, TIME / 3);
    });
  });

  if (!document.getElementById(`${flag.id}-tooltip`)) {
    const tooltip = document.createElement("span");
    tooltip.className = "bg-black absolute z-10 text-white";
    tooltip.textContent = `${flag.id}`;
    tooltip.id = `${flag.id}-tooltip`;
  }
}

// Animate score on change
export function scoreAnimation(scoreText: any, i = 0) {
  if (i == 1) {
    scoreText.classList.add("score-plus");
    setTimeout(() => {
      scoreText.classList.remove("score-plus");
    }, TIME);
  } else {
    scoreText.classList.add("score-minus");
    setTimeout(() => {
      scoreText.classList.remove("score-minus");
    }, TIME);
  }
}

export type CURR_GUESS = "RIGHT" | "WRONG" | "PARTIAL" | "DEFAULT";

// Show labels on each guess according to CURR_GUESS
export function Label(label: HTMLElement, i: CURR_GUESS) {
  switch (i) {
    case "RIGHT":
      label.classList.remove("invisible");
      label.classList.add("text-green-500");
      break;
    case "PARTIAL":
      label.classList.remove("invisible");
      label.classList.add("text-yellow-500");
      break;
    case "WRONG":
      label.classList.remove("invisible");
      label.classList.add("text-red-500");
      break;
    default:
      if (label.classList.contains("invisible")) {
        label.classList.remove("invisible");
        setTimeout(() => {
          label.classList.add("invisible");
        }, TIME);
      }
      break;
  }
}
