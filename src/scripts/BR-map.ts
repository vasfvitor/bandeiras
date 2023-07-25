function load_map() {
  const mapObject = document.getElementById("map") as HTMLObjectElement;
  const map = mapObject.contentDocument?.querySelector("svg") as SVGElement;

  let tooltipW, tooltipH, x_offset, y_offset;

  if (
    !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    // Mouse events
    map.addEventListener("click", handleClick, false);
    map.addEventListener("mousemove", mouseEntered, false);
    map.addEventListener("mouseout", mouseGone, false);
  } else {
    document.getElementById("mobile-tip")?.classList.remove("hidden");
    // Touch events
    map.addEventListener("touchstart", touchEnter, false);
    //map.addEventListener("touchmove", touchEnter, false);
    map.addEventListener("touchend", touchEnd, false);
  }

  function touchEnter(e: TouchEvent) {
    const target = e.target as SVGPathElement;
    if (target.nodeName === "path") {
      const region = target.getAttribute("region");
      const postal = target.getAttribute("postal");
      const name = target.getAttribute("name");
      createTooltip(name, postal);
      paintRegion(region, target);
    }
  }
  let i = 5;
  function createTooltip(name: string | null, postal: string | null) {
    if (i > 999) {
      i = 5;
    }
    i++;
    const t = document.getElementById(`${postal}-tooltip`) as HTMLDivElement;
    if (t) {
      t.classList.remove("tooltip-hidden");
      t.style.zIndex = `${i}`;
    } else {
      const f = document.createElement("div");
      f.classList.add("tooltip-mob");
      f.innerHTML = `
      <p><strong>${name} - ${postal}</strong></p>
      `;
      f.id = `${postal}-tooltip`;
      f.style.zIndex = `${i}`;
      document.getElementById("map-wrapper")?.appendChild(f);
    }
  }

  function hideTooltip(t: HTMLDivElement) {
    t.classList.add("tooltip-hidden");
    t.style.zIndex = "10";
  }

  function touchEnd(e: TouchEvent) {
    window.setTimeout(() => {
      const target = e.target as SVGPathElement;
      const postal = target.getAttribute("postal");
      const t = document.getElementById(`${postal}-tooltip`) as HTMLDivElement;
      if (target.nodeName === "path") {
        hideTooltip(t);
        target.style.fill = "black";
        target.style.opacity = "1";
      }
    }, 250);
  }

  // MOUSE EVENTS
  // Remove tooltip on mouseout
  function mouseGone(e: MouseEvent | TouchEvent) {
    let target = e.target as SVGPathElement;
    //const event = e.constructor.name;
    if (target.nodeName === "path") {
      target.style.fill = "black";
      target.style.opacity = "1";
      tooltip.classList.add("tooltip-hidden");
    }
  }

  const tooltip = document.getElementById("tooltip") as HTMLDivElement;
  // Show tooltip on mousemove
  function mouseEntered(e: MouseEvent) {
    //console.log("E   " + e);
    const target = e.target as SVGPathElement;
    if (target.nodeName === "path") {
      target.style.cursor = "pointer";
      const region = target.getAttribute("region");
      const postal = target.getAttribute("postal");
      const name = target.getAttribute("name");
      paintRegion(region, target);
      tooltipW = tooltip.offsetWidth;
      tooltipH = tooltip.offsetHeight;
      y_offset = e.offsetY - tooltipH - 20;
      x_offset = e.offsetX - tooltipW / 2;
      tooltip.style.transform = `translate(${x_offset}px, ${y_offset}px)`;
      tooltip.classList.remove("tooltip-hidden");
      tooltip.innerHTML = `
          <p><strong>${name} - ${postal}</strong></p>
      `;
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

  function paintRegion(region: string | null, t: SVGPathElement) {
    const regionColors: { [key: string]: string } = {
      North: "#a99ada",
      South: "#c8dc9a",
      Northeast: "#eaba66",
      Southeast: "#77b8cb",
      "Central-West": "#fb9a99",
    };

    if (region && regionColors[region]) {
      t.style.fill = regionColors[region];
    } else {
      t.style.opacity = "0.6";
    }
  }
}

// Calls init function on window load
window.addEventListener("load", load_map);
