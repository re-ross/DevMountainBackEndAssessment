const fortuneBtn = document.getElementById("fortuneBtn");
const quotesBtn = document.getElementById("quotes");
const divEl = document.querySelector("div");
const clearBtn = document.getElementById("clearQuote");
//
const getAllBtn = document.querySelector("#all");
const memberContainer = document.getElementById("views");
const memberBtns = document.querySelectorAll(".member-btns");
const createMemberForm = document.querySelector("#create-form");
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
    divEl.appendChild(h2);
  });
});
function clearQuotes() {
  divEl.innerHTML = "";
}
removeBtn.addEventListener("click", clearQuotes);

//createMemberCard doesn't update our view anymore.
function createMemberCard(member = {}) {
  let memberCard = document.createElement("article");

  function clearMembers() {
    memberContainer.innerHTML = ``;
  }

  let getMember = async (event) => {
    console.log("LOL");
    event.preventDefault();
    console.log(JSON.stringify(event, null, 2));
    const returnedMember = await getOneMem(member.id);
    console.log("returnedMember");
    const tempElement = document.createElement("div");
    tempElement.appendChild(createMemberCard(returnedMember));
    updateView(tempElement);
    let deleteButton = document
      .createElement("button")
      .addEventListener("click", dele);
  };

  memberCard.innerHTML = `
  <div>
    <button id="${member.id}-button" value="${member.id}">
    <h3>${member.firstName} ${member.lastName}</h3>
    <p>gender: ${member.gender} | age: ${member.age}</p>
    <h4>Likes</h4>
    <ul>
      <li>${member.likes[0]}</li>
      <li>${member.likes[1]}</li>
      <li>${member.likes[2]}</li>
    </ul>
    </button>
    <br/>
    <button id="${member.id}-delete-button" value="${
    member.id
  }" onclick="${async () => await deleteMember(member.id)}">"byee"</button>
  </div>
  `;
  memberCard.addEventListener("click", async (e) => {
    e.preventDefault();
    await getMember(e);
  });
  return memberCard;
}

// makes HTTP request - returns us an array of members
async function getAllMembers() {
  const response = await axios
    .get("http://localhost:4000/api/members")
    .then((res) => {
      console.log("res.data :::::", JSON.stringify(res.data, null, 2));
      return res.data;
    })
    .catch((err) => console.log(err));
  console.log("response", JSON.stringify(response, null, 2));
  return response;
}

function updateView(somethingToRender) {
  memberContainer.innerHTML = "";
  memberContainer.appendChild(somethingToRender);
}

getAllBtn.addEventListener("click", async () => {
  const returnedMembers = await getAllMembers();
  const tempElement = document.createElement("div");
  returnedMembers.forEach((mem) =>
    tempElement.appendChild(createMemberCard(mem))
  );
  updateView(tempElement);
});

const getOneMem = async (idToFetch) => {
  const response = await axios
    .get(`http:localhost:4000/member/${idToFetch}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
  return response;
};

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

const deleteMember = (idToDelete) => {
  console.log(JSON.stringify(idToDelete));
  axios
    .delete(`http://localhost:4000/members/${idToDelete}`)
    .then((res) => {
      alert(`Succesfully removed ${idToDelete}`);
      console.log(JSON.stringify(res));

      clearMembers(newMembers);
    })
    .catch((err) => console.log(err));
};
