import axios from "axios";
async function getInfo() {
    try {
      const response = await axios.get(
        `https://openlibrary.org${book.key}.json`
      );

      let description = response.data.description;

      let infoDiv = createElementHtml(
        "div",
        "infoDiv",
        description === undefined
          ? "description not found"
          : description.value || description
      );
      card.appendChild(infoDiv);

      //function click for infobutton
      infoButton.addEventListener("click", function () {
        infoDiv.style.display =
          window.getComputedStyle(infoDiv).display == "none"
            ? "block"
            : "none";
      });
    } catch (error) {
      console.log(error);
    }
  }
  export default getInfo;