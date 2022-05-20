const search = document.querySelector("#search");
const matchList = document.querySelector("#match-list");

const searchStates = async (searchText) => {
  const res = await fetch("state.json");
  const states = await res.json();

  let matches = states.filter((state) => {
    const regex = new RegExp(searchText, "gi");
    return state.name.match(regex);
  });
  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }
  outputHtml(matches);
};
const highlightMatch = (text, searchText) => {
  const regex = new RegExp(searchText, "gi");
  return text.replace(
    regex,
    (match) => `<span class="highlight">${match}</span>`
  );
};

const noResult = () => {
  const html = `
    <li>
      <span class="name">No result found</span>
      \n
    </li>
  `;
  matchList.innerHTML = html;
};

const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = highlightMatch(matches[0].name, search.value);
    matchList.innerHTML = `
    <div class="card card-body mb-1">
    <h4>${html}</h4>
    <small>Capital: ${matches[0].capital}</small>
    </div>
    `;
    if (matches.length > 1) {
      matchList.innerHTML += `
        <div class="card card-body mb-1">
        <h4>${html}</h4>
        <small>Capital: ${matches[1].capital}</small>
        </div>
        `;
    }
  } else {
    noResult();
  }
};
search.addEventListener("keyup", () => searchStates(search.value));
