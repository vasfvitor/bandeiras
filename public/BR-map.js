function loadMap() {
  let map = document.getElementById("map").contentDocument.querySelector("svg");
  let toolTip = document.getElementById("toolTip");
  let mapWidth = document.getElementById("map").offsetWidth;
  let toolTipW, toolTipH, x_offset, y_offset, region, currentRegion;

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
  function mobileGone(e) {
    active = true;
    id = setTimeout(() => {
      mouseGone(e);
    }, 1000);
    if (!active) {
      mouseGone(e);
    }
  }
  function touchStart(e) {

    mouseEntered(e);
    id = setTimeout(() => {
      mouseGone(e);
    }, 1000);
  }


  // Show tooltip on mousemove
  function mouseEntered(e) {
    let target = e.target;
    let details = target.attributes;
    // Paint according to each region
    if (target.nodeName === "path") {
      target.style.cursor = "pointer";
      paintRegion(details.region.value, target);
      toolTipW = toolTip.offsetWidth;
      toolTipH = toolTip.offsetHeight;
      y_offset = e.offsetY - toolTipH - 20;
      x_offset = e.offsetX - (toolTipW / 2);
      // CSS
      toolTip.style.transform = `translate(${x_offset}px, ${y_offset}px)`;
      toolTip.classList.remove("toolTip-hidden");
      // Tooltip data
      toolTip.innerHTML = `
            <p><strong>${details.name.value} - ${details.postal.value}</strong></p>
        `;
    }
  }
  function paintRegion(region, t) {
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

  // Remove tooltip on mouseout
  function mouseGone(e) {
    let target = e.target;
    if (target.nodeName === "path") {
      target.style.fill = "black";
      target.style.opacity = 1;
      toolTip.classList.add("toolTip-hidden");
      //toolTip.innerHTML = "";
    }
  }
  // Go to uf page onclick
  function handleClick(e) {
    if (e.target.nodeName === "path") {
      let details = e.target.attributes;
      window.location.href = `/uf/${details.postal.value}`;
    }
  }
}

// Calls init function on window load
window.onload = function () {
  // Init map
  loadMap();
};
