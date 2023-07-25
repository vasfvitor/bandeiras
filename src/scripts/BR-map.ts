function load_map() {
  const mapObject = document.getElementById("map") as HTMLObjectElement;
  const map = mapObject.contentDocument?.querySelector("svg");
  if (!map) {
    console.log("Error loading interactive map");
    return;
  }
  const toolTip = document.getElementById("toolTip") as HTMLDivElement;
  const mapWidth = document.getElementById("map")?.offsetWidth;
  let toolTipW, toolTipH, x_offset, y_offset;

  if (
    !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    // Mouse events
    // map.addEventListener("click", handleClick, false);
    map.addEventListener("mousemove", mouseEntered, false);
    map.addEventListener("mouseout", mouseGone, false);
  } else {
    // Touch events
    map.addEventListener("touchstart", touchStart, false);
    map.addEventListener("touchmove", touchMove, false);
    map.addEventListener("touchend", mobileGone, false);
  }
  let active = false;
  const cardTimeouts: { [key: string]: number } = {};

  function touchStart(e: TouchEvent) {
    mouseEntered(e);
  }
  function touchMove(e: TouchEvent) {
    mouseEntered(e);
  }
  //
  function mobileGone(e: TouchEvent) {
    const target = e.target as SVGPathElement;
    const cardId: string = target.getAttribute("postal") || "error";
    if (cardId == "error") {
      console.log(cardId);
    }
    active = true;
    const timeoutId = window.setTimeout(() => {
      mouseGone(e);
    }, 1000);
    //
    if (!active) {
      //mouseGone(e);
    }
    cardTimeouts[cardId] = timeoutId;
  }
  // Remove tooltip on mouseout
  function mouseGone(e: MouseEvent | TouchEvent) {
    let target = e.target as SVGPathElement;
    if (target.nodeName === "path") {
      target.style.fill = "black";
      target.style.opacity = "1";
      toolTip.classList.add("toolTip-hidden");
      //toolTip.innerHTML = "";
    }
  }
  // Go to uf page onclick
  function handleClick(e: MouseEvent | TouchEvent) {
    const target = e.target as SVGPathElement;
    if (target.nodeName === "path") {
      const postal = target.getAttribute("postal");
      window.location.href = `/uf/${postal}`;
    }
  }

  function cancelTimeout(cardId: string) {
    // Verifique se o card tem um timeout ativo e cancele-o
    const timeoutId = cardTimeouts[cardId];
    if (timeoutId) {
      clearTimeout(timeoutId);
      // Remova o timeout do objeto após cancelá-lo para liberar recursos
      delete cardTimeouts[cardId];
    }
  }
  // Show tooltip on mousemove
  function mouseEntered(e: MouseEvent | TouchEvent) {
    //console.log("E   " + e);
    const target = e.target as SVGPathElement;
    if (target.nodeName === "path") {
      target.style.cursor = "pointer";
      const region = target.getAttribute("region");
      const postal = target.getAttribute("postal");
      const name = target.getAttribute("name");

      // Paint according to each region
      paintRegion(region, target);

      // for some reason this does not work:
      // if (e instanceof MouseEvent)
      // even tho e.constructor.name === "MouseEvent"
      const event = e.constructor.name;
      if (event === "MouseEvent") {
        toolTipW = toolTip.offsetWidth;
        toolTipH = toolTip.offsetHeight;
        y_offset = e.offsetY - toolTipH - 20;
        x_offset = e.offsetX - toolTipW / 2;
      } else {
        y_offset = 0;
        x_offset = 0;
      }
      // CSS
      toolTip.style.transform = `translate(${x_offset}px, ${y_offset}px)`;
      toolTip.classList.remove("toolTip-hidden");
      // Tooltip data
      toolTip.innerHTML = `
          <p><strong>${name} - ${postal}</strong></p>
      `;
    }
  }

  function paintRegion(region: string | null, t: SVGPathElement) {
    switch (region) {
      case "North":
        t.style.fill = "#a99ada";
        break;
      case "South":
        t.style.fill = "#c8dc9a";
        break;
      case "Northeast":
        t.style.fill = "#eaba66";
        break;
      case "Southeast":
        t.style.fill = "#77b8cb";
        break;
      case "Central-West":
        t.style.fill = "#fb9a99";
        break;
      default:
        t.style.opacity = "0.6";
        break;
    }
  }
}

// Calls init function on window load
window.addEventListener("load", load_map);
