const createElementHtml = (tag, id, content) => {
  const elem = document.createElement(tag);
  elem.id = id;
  elem.innerHTML = content;
  return elem;
};
export default createElementHtml;
