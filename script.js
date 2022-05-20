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
//highlight the searchText in the matchList
const highlightMatch = (text, searchText) => {
  const regex = new RegExp(searchText, "gi");
  return text.replace(regex, `<span class="highlight">${searchText}</span>`);
};
//how to use the highlightMatch function
// const html = highlightMatch(
//   "This is a sentence about a dog",
//   "dog"
// );
// console.log(html);


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
        <small>Capital: ${matches[0].capital}</small>
        </div>
        `;
    }
    }
};

    //   .map(
    //     (match) => `
    //         <div class="card card-body mb-1">
    //             <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
    //             <small>Lat: ${match.lat} / Long: ${match.long}</small>
    //         </div>
    //     `
    //   )
    //   .join("");
    // matchList.innerHTML = html;
//   }
// };
search.addEventListener("keyup", () => searchStates(search.value));
