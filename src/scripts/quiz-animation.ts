const TIME = 759;

export function ResetBtn() {
  const q = document.getElementById("q-head") as HTMLDivElement;
  const btn = document.getElementById("q-restart") as HTMLButtonElement;
  const cntr = document.getElementById("q-flag-container") as HTMLElement;
  const flags = document.querySelectorAll(".q-flag");

  // randomize flags
  setTimeout(() => {
    for (var i = cntr.children.length; i >= 0; i--) {
      cntr.appendChild(cntr.children[(Math.random() * i) | 0]);
    }
  }, TIME);

  //
  q?.classList.add("animate-pulse", "contrast-0", "brightness-50");
  setTimeout(() => {
    q?.classList.remove("animate-pulse", "contrast-0", "brightness-50");
  }, TIME);

  btn.disabled = true;
  btn.classList.add("q-reset");
  setTimeout(() => {
    btn?.classList.remove("q-reset");
    btn.disabled = false;
  }, TIME);

  flags.forEach((f) => {
    f?.classList.add("animate-pulse", "q-reset");

    setTimeout(() => {
      f?.classList.remove("animate-pulse", "q-reset");
    }, TIME);
  });
}

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
  //ufs.long

  //console.log(flag);
  if (!document.getElementById(`${flag.id}-tooltip`)) {
    const tooltip = document.createElement("span");
    tooltip.className = "bg-black absolute z-10 text-white";
    tooltip.textContent = `${flag.id}`;
    tooltip.id = `${flag.id}-tooltip`;
    //console.log(flag);
    //flag.appendChild(tooltip);
  }
}
export function animate() {
  return 0;
}

export function scoreAnimation(scoreText: any) {
  scoreText.classList.add("vibrate-1");
  setTimeout(() => {
    scoreText.classList.remove("vibrate-1");
  }, TIME);
}

export type SimE = "RIGHT" | "WRONG" | "PARTIAL" | "DEFAULT";

export function Label(label: HTMLElement, i: SimE) {
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
