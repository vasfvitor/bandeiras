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
  // , region, currentRegion;

  // Add event listeners to map element
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
    // Touch events
    map.addEventListener("touchstart", touchStart, false);
    map.addEventListener("touchmove", touchStart, false);
    //map.addEventListener("touchend", mobileGone, false);
  }
  let active = false;
  let id = 0;

  function touchStart(e: TouchEvent) {
    mouseEntered(e);
    id = window.setTimeout(() => {
      mouseGone(e);
    }, 200);
  }
  /*
  const pathElement = document.getElementById("path8");
  if (pathElement instanceof SVGElement) {
    const postalAttribute = pathElement.getAttribute("postal");
    if (postalAttribute !== null) {
      // The value of the postal attribute
      console.log(postalAttribute);
    } else {
      // The postal attribute is not present
      console.log("Postal attribute not found");
    }
  } else {
    // Element with id "path8" is not an SVG element
    console.log("Element with id 'path8' is not an SVG element");
  }
*/

  // Show tooltip on mousemove
  function mouseEntered(e: MouseEvent | TouchEvent) {
    //console.log("E   " + e);
    let target = e.target as SVGPathElement;
    if (target.nodeName === "path") {
      target.style.cursor = "pointer";
      const region = target.getAttribute("region");
      const postal = target.getAttribute("postal");
      const name = target.getAttribute("name");
      const event = e.constructor.name;
      event == "MouseEvent";
      // Paint according to each region
      paintRegion(region, target);
      if (e instanceof MouseEvent) {
        toolTipW = toolTip.offsetWidth;
        toolTipH = toolTip.offsetHeight;

        y_offset = e.offsetY - toolTipH - 20;
        x_offset = e.offsetX - toolTipW / 2;
        // CSS

        // Tooltip data
      } else {
        y_offset = 0;
        x_offset = 0;
      }
      toolTip.style.transform = `translate(${x_offset}px, ${y_offset}px)`;
      toolTip.classList.remove("toolTip-hidden");
      toolTip.innerHTML = `
          <p><strong>${name} - ${postal}</strong></p>
      `;
    }
  }
  // Remove tooltip on mouseout
  function mouseGone(e: MouseEvent | TouchEvent) {
    let target = e.target;
    if (target.nodeName === "path") {
      target.style.fill = "black";
      target.style.opacity = 1;
      toolTip.classList.add("toolTip-hidden");
      //toolTip.innerHTML = "";
    }
  }
  // Go to uf page onclick
  function handleClick(e: MouseEvent | TouchEvent) {
    if (e.target.nodeName === "path") {
      let details = e.target.attributes;
      window.location.href = `/uf/${details.postal.value}`;
    }
  }

  function paintRegion(region: string | null, t) {
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
        t.style.opacity = 0.6;
        break;
    }
  }
}

// Calls init function on window load
window.addEventListener("load", load_map);

//
function mobileGone(e: MouseEvent | TouchEvent) {
  active = true;
  id = window.setTimeout(() => {
    mouseGone(e);
  }, 1000);
  if (!active) {
    mouseGone(e);
  }
}
//
