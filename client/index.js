const fortuneBtn = document.getElementById("fortuneBtn");
const quotesBtn = document.getElementById("quotes");
const articleEl = document.querySelector("article");
const removeBtn = document.getElementById("removeQuote");
//
const getAllBtn = document.querySelector("#all");
const memberContainer = document.querySelector("section");
const memberBtns = document.querySelectorAll(".member-btns");
const createMemberForm = document.querySelector("#create-form");
const memberCard = document.createElement("div");
const ageForm = document.querySelector("#age");
const firstInput = document.querySelector("#first");
const lastInput = document.querySelector("#last");
const genderDropdown = document.querySelector("select");
const likesText = document.querySelector("textarea");

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
    articleEl.appendChild(h2);
  });
});
function clearQuotes() {
  articleEl.innerHTML = "";
}
removeBtn.addEventListener("click", clearQuotes);

function createMemberCard(char) {
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

const submitMember = (evt) => {
  evt.preventDefault();

  const body = {
    firstName: firstInput.value,
    lastName: lastInput.value,
    gender: genderDropdown.value,
    age: ageForm.value,
    likes: likesText.value.split(","),
  };

  axios
    .post("http:localhost:4000/member/", body)
    .then((res) => {
      clearMembers();
      res.data.forEach((memberObj) => createMemberCard(memberObj));
    })
    .catch((err) => console.log(err));
};

createMemberForm.addEventListener("submit", submitMember);

const deleteMember = (evt) => {
  axios
    .delete(`http://localhost:4000/members/${evt.target.getAttribute("id")}`)
    .then((res) => {
      // const [removedEl, newMembers] = res.data;
      // alert(
      //   `Successfully removed ${removedEl.member} with id of ${removedEl.id}`
      // );
      // clearMembers(newMembers);
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};

memberCard.addEventListener("click", deleteMember);
