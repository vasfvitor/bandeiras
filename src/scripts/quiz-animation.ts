export function ResetBtn() {
  const q = document.getElementById("q-head");
  q?.classList.add("animate-pulse", "contrast-0", "brightness-50");
  setTimeout(() => {
    q?.classList.remove("animate-pulse", "contrast-0", "brightness-50");
  }, 1000);

  const btn = document.getElementById("q-restart");
  btn?.classList.add("disabled");
  btn?.setAttribute("disabled", "");
  setTimeout(() => {
    btn?.classList.remove("disabled");
    btn?.removeAttribute("disabled");
  }, 1000);

  const flags = document.querySelectorAll(".q-flag");
  flags.forEach((f) => {
    f?.classList.add(
      "animate-pulse",
      "contrast-0",
      "brightness-50",
      "disabled",
      "q-disabled"
    );

    setTimeout(() => {
      f?.classList.remove(
        "animate-pulse",
        "contrast-0",
        "brightness-50",
        "disabled",
        "q-disabled"
      );
    }, 1000);
  });

  const d_flag = document.getElementById("q-flag-container") as HTMLElement;
  d_flag?.classList.add("animate-pulse", "contrast-0", "brightness-50");

  setTimeout(() => {
    d_flag?.classList.remove("disabled");
    d_flag?.removeAttribute("disabled");
    d_flag?.classList.remove("animate-pulse", "contrast-0", "brightness-50");
  }, 1000);
}

export function Flags(flag: any) {
  const options = document.querySelectorAll(".q-flag");

  options.forEach((option) => {
    option.addEventListener("click", () => {
      option.classList.add("pulse");
      setTimeout(() => {
        option.classList.remove("pulse");
      }, 300);
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

export function showScoreAnimation(scoreText: any) {
  scoreText.classList.add("q-minus-anim");
  setTimeout(() => {
    scoreText.classList.remove("q-minus-anim");
  }, 600);
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
        }, 1000);
      }
      break;
  }
}
