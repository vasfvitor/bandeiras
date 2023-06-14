function loadMap() {
  var map = document.getElementById("map").contentDocument.querySelector("svg");
  var toolTip = document.getElementById("toolTip");

  // Add event listeners to map element
  if (
    !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    // If user agent is not mobile add click listener (for wikidata links)
    map.addEventListener("click", handleClick, false);
  }
  map.addEventListener("mousemove", mouseEntered, false);
  map.addEventListener("mouseout", mouseGone, false);
  // Show tooltip on mousemove
  function mouseEntered(e) {
    var target = e.target;
    if (target.nodeName == "path") {
      //console.log(target);
      target.style.fill = "green";
      //target.style.opacity = 0.6;
      target.style.cursor = "pointer";
      var details = e.target.attributes;

      // Follow cursor
      toolTip.style.transform = `translate(${e.offsetX}px, ${e.offsetY}px)`;

      // Tooltip data
      toolTip.innerHTML = `
            <p><strong>${details.name.value} - ${details.postal.value}</strong></p>
        `;
    }
  }
  //  <li>Full name: ${details.gn_name.value}</li>

  // Clear tooltip on mouseout
  function mouseGone(e) {
    var target = e.target;
    if (target.nodeName == "path") {
      target.style.fill = "black";
      target.style.opacity = 1;
      toolTip.innerHTML = "";
    }
  }

  // Go to uf page onclick
  function handleClick(e) {
    if (e.target.nodeName == "path") {
      var details = e.target.attributes;
      window.location.href = `/uf/${details.postal.value}`;
    }
  }
}

// Calls init function on window load
window.onload = function () {
  // Init map
  loadMap();
};
