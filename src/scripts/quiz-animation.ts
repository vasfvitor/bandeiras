export function ResetBtn() {
  let q = document.getElementById("q-question");
  q?.classList.add("animate-pulse", "contrast-0", "brightness-50");
  setTimeout(() => {
    q?.classList.remove("animate-pulse", "contrast-0", "brightness-50");
  }, 1000);

  let btn = document.getElementById("q-restart");
  btn?.classList.add("disabled");
  btn?.setAttribute("disabled", "");
  setTimeout(() => {
    btn?.classList.remove("disabled");
    btn?.removeAttribute("disabled");
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

// Exemplo de uso:
