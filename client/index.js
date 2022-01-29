const fortuneBtn = document.getElementById("fortuneBtn");
const quotesBtn = document.getElementById("quotes");
const divEl = document.querySelector("div");
const removeBtn = document.getElementById("removeQuote");
//
const getAllBtn = document.querySelector("#all");
const memberContainer = document.querySelector("section");
const memberBtns = document.querySelectorAll(".member-btns");

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

function createMemberCard(char) {
  let memberCard = document.createElement("div");
  memberCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`;

  memberContainer.appendChild(memberCard);
}

function clearMembers() {
  memberContainer.innerHTML = ``;
}

function getAllMembers() {
  axios
    .get("http://localhost:4000/api/members")
    .then((res) => {
      res.data.forEach((memberObj) => createMemberCard(memberObj));
    })
    .catch((err) => console.log(err));
}

getAllBtn.addEventListener("click", getAllMembers);

const getOneMem = (evt) => {
  axios
    .get("http:localhost:4000/member/" + evt.target.getAttribute("id"))
    .then((res) => {
      clearMembers();
      createMemberCard(res.data);
    })
    .catch((err) => console.log(err));
};

memberBtns.forEach((btn) => {
  btn.addEventListener("click", getOneMem);
});
