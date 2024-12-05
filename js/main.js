(() => {
  //variables
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
  const loader = document.querySelector("#loader");
  const errorCon = document.querySelector("#error-con");

  //This information needs to be removed then pulled with an AJAX Call using the Fetch API
  //this is the api url https://swiftpixel.com/earbud/api/infoboxes"

  //functions
  function loadInfoBoxes() {
    // Loading indiactor

    fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then((response) => response.json())
      .then((infoBoxes) => {
        infoBoxes.forEach((infoBox, index) => {
          let selected = document.querySelector(`#hotspot-${index + 1}`);

          const titleElement = document.createElement("h2");
          titleElement.textContent = infoBox.heading;

          const textElement = document.createElement("p");
          textElement.textContent = infoBox.description;

          const imageElement = document.createElement("img");
          imageElement.src = infoBox.thumbnaill;

          selected.appendChild(titleElement);
          selected.appendChild(textElement);
          selected.appendChild(imageElement);
        });
        loader.classList.toggle("hidden");
        // Clear the content
        errorCon.innerHTML = "";
        errorCon.appendChild(ul);
      })

      .catch((error) => {
        console.log(error);
        const errorMessage = document.createElement("p");
        errorMessage.textContent = `Oops something went wrong. Try again later. Error Message: ${errorMessage}`;
        errorCon.appendChild(errorMessage);
      });

    // error message goes in catch

    //make AJAX call here
  }
  loadInfoBoxes();

  function loadMaterialInfo() {
    // Loading indicator

    fetch("https://swiftpixel.com/earbud/api/materials")
      .then((response) => response.json())
      .then((materialListData) => {
        materialListData.forEach((material) => {
          // clone the template
          const clone = materialTemplate.content.cloneNode(true);
          //populate with data
          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;

          const materialDescription = clone.querySelector(
            ".material-description"
          );
          materialDescription.textContent = material.description;

          materialList.appendChild(clone);
        });
      })
      .catch();
    // Proper error handling goes here
  }
  loadMaterialInfo();

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });
})();
