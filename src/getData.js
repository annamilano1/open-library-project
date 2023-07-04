import axios from "axios";
import getBooks from "./getBooks";

let list = document.getElementById("results");

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
    getBooks(books, list);

    return;
  } catch (error) {
    alert("Oops! something went wrong");
    console.log(error);
  }
};

export default getData;
