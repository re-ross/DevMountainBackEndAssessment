const fortuneBtn = document.getElementById("fortuneBtn");
const quotesBtn = document.getElementById("quotes");
const divEl = document.querySelector("div");
const removeBtn = document.getElementById("removeQuote");

const baseURL = "http://localhost:4000/api";

fortuneBtn.addEventListener("click", () => {
  axios.get("http://localhost:4000/api/fortune").then(function (response) {
    const data = response.data;
    alert(data);
  });
});

quotesBtn.addEventListener("click", () => {
  axios.get("http://localhost:4000/api/quotes").then(function (response) {
    const h2 = document.createElement("h2");
    const text = document.createTextNode(`${response.data}`);
    h2.appendChild(text);
    divEl.appendChild(h2);
  });
});
function clearQuotes() {
  divEl.innerHTML = "";
}
removeBtn.addEventListener("click", clearQuotes);

// submit buttons
const getSubmit = document.getElementById("getSubmit");
const getParamsSubmit = document.getElementById("getParamsSubmit");
const getQuerySubmit = document.getElementById("getQuerySubmit");

// inputs
const paramsInput = document.getElementById("params-input");
const queryInput = document.getElementById("query-input");

// response section
const responseSection = document.getElementsByClassName("response-area")[0];

// handle submits
getSubmit.addEventListener("click", () => {
  axios
    .get("http://localhost:4000/api/inventory")
    .then((res) => addToView(res.data));
});

getParamsSubmit.addEventListener("click", () => {
  axios
    .get(`http://localhost:4000/api/inventory/${paramsInput.value}`)
    .then((res) => addToView([res.data]));
});

getQuerySubmit.addEventListener("click", () => {
  axios
    .get(`http://localhost:4000/api/inventory?item=${queryInput.value}`)
    .then((res) => addToView(res.data));
});

// handle response
function addToView(dataArr) {
  responseSection.innerHTML = null;

  if (dataArr.length === 0) {
    const p = document.createElement("p");
    const t = document.createTextNode("Response came back with no results!");
    p.appendChild(t);

    responseSection.appendChild(p);
  } else {
    dataArr.forEach((item) => {
      const p = document.createElement("p");
      const t = document.createTextNode(item);
      p.appendChild(t);

      responseSection.appendChild(p);
    });
  }
}
