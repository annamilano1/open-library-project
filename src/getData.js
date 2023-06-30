import axios from "axios";

let list = document.getElementById("results");
//function create element
const createElementHtml = (tag, id, content) => {
  const elem = document.createElement(tag);
  elem.id = id;
  elem.innerHTML = content;
  return elem;
};
//get API
const getData = async () => {
  try {
    list.innerHTML = "";

    let search = document.getElementById("input").value;
    if (!search) {
      alert("insert text");
      return false;
    }
    let searchLower = search.toLowerCase();

    let url = `https://openlibrary.org/subjects/${searchLower}.json`;
    //get axios and web responses
    let res = await axios.get(url);
    if (res.status != 200) {
      if (res.status == 404) {
        alert("book not found");
        return;
      } else if (res.status == 500) {
        alert("error from server");
        return;
      } else if (res.status == 401) {
        alert("access denied");
        return;
      } else if (res.status == 202) {
        alert(
          "the request has been accepted for processing, but the processing has not been completed"
        );
        return;
      } else {
        alert("Ops! something went wrong");
        return;
      }
    }
    var books = res.data.works;
    //get res.data
    //if 200!!!....
    if (res.status == 200) {
      res.data.work_count === 0 ? alert("Subject not found") : books;
    } else {
      alert("Ops! something went wrong");
      return;
    }

    

    for (let book of books) {
      //div and card
      const littleDiv = createElementHtml("div", "divPiccolo", "");
      list.appendChild(littleDiv);
      littleDiv.className = "col-sm";

      const card = createElementHtml("div", "card", "");
      littleDiv.appendChild(card);
      card.className = "card";

      //img cover
      const cover = createElementHtml("img", "img-cover");
      let coverImg = book.cover_id
        ? "https://covers.openlibrary.org/b/id/" + book.cover_id + "-M.jpg"
        : "./cover.webp";

      cover.setAttribute("src", coverImg);
      card.appendChild(cover);
      cover.className = "card-img-top";

      //title

      let title = createElementHtml("h3", "titolo", book.title);

      card.appendChild(title);
      title.className = "card-title";
      //author
      const author = createElementHtml("p", "author", book.authors[0].name);
      card.appendChild(author);
      author.className = "card-subtitle";
      // info button
      const infoButton = createElementHtml("button", "infoButton", "about");
      card.appendChild(infoButton);
      //fetch info
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
      getInfo();
    }

    return;
  } catch (error) {
    alert("Ops! something went wrong");
    console.log(error);
  }
};
export default getData;
