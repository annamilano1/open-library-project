import createElementHtml from "./createElementHtml";
import getInfo from "./getInfo";

function getBooks(books, list) {
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
    getInfo(book, card, infoButton);
  }
}
export default getBooks;
