const randomUsersURL = "https://randomuser.me/api/?results=12";

const usersJSON = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (err) {
    throw err;
    console.error("Uh oh, something has gone wrong!");
  }
};

const randomUsers = async (url) => {
  const userJSON = await usersJSON(url);
  const contactsInfo = userJSON.results.map((contact) => {
    const image = contact.picture.large.toString();
    const name = `${contact.name.first} ${contact.name.last}`;
    const email = contact.email;
    const city = `${contact.location.city}, ${contact.location.country}`;
    const cell = contact.cell;
    const address = contact.location.street;
    const street = `${address.number} ${address.name}`;
    const postCode = contact.location.postcode;
    const dob = contact.dob.date.slice(0, 9);
    return { image, name, email, city, cell, address, street, postCode, dob };
  });
  console.log(contactsInfo);
  return contactsInfo;
};

function generateHTML(contactInfo) {
  contactInfo.map((contact) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
                <div class="card-img-container">
                    <img class="card-img" src="${contact.image}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${contact.name}</h3>
                    <p class="card-text">${contact.email}</p>
                    <p class="card-text cap">${contact.city}</p>
                </div>
            `;
    const galleryDiv = document.getElementById("gallery");        
    galleryDiv.insertAdjacentElement("beforeend", card);
  });
}

const contactModal = async contact => {
  function createDiv(className) {
    const div = document.createElement("div");
    div.className = className;
    return div;
  }
  function createBtn(id, className, text) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = id;
    btn.className = className;
    btn.innerHTML = `${text}`;
    return btn;
  }
  const modalContainer = await createDiv("modal-container");
  const modalDiv = await createDiv("modal");
  const infoContainer = await createDiv("modal-info-container");
  const btnContainer = await createDiv("modal-btn-container");
  const closeBtn = await createBtn(
    "modal-close-btn",
    "modal-close-btn",
    "<strong>X</strong>"
  );
  infoContainer.innerHTML = `
          <img class="modal-img" src="${contact.image}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${contact.name}</h3>
          <p class="modal-text">${contact.email}</p>
          <p class="modal-text cap">${contact.city}</p>
          <hr>
          <p class="modal-text">${contact.cell}</p>
          <p class="modal-text">${contact.street}, ${contact.city} ${contact.postCode}</p>
          <p class="modal-text">Birthday:${contact.dob}</p>
      `;    
};


function createModal(contact) {
    function createDiv(className) {
      const div = document.createElement("div");
      div.className = className;
      return div;
    }
    function createBtn(id, className, text) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.id = id;
      btn.className = className;
      btn.innerHTML = `${text}`;
      return btn;
    }
    const modalContainer = createDiv("modal-container");
    const modalDiv = createDiv("modal");
    const infoContainer = createDiv("modal-info-container");
    const btnContainer = createDiv("modal-btn-container");
    const closeBtn = createBtn(
      "modal-close-btn",
      "modal-close-btn",
      "<strong>X</strong>"
    );
  
    /* Exceeds */
    btnContainer.innerHTML = `
          <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
          <button type="button" id="modal-next" class="modal-next btn">Next</button>
      `;
  
    infoContainer.innerHTML = `
          <img class="modal-img" src="${contact.image}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${contact.name}</h3>
          <p class="modal-text">${contact.email}</p>
          <p class="modal-text cap">${contact.city}</p>
          <hr>
          <p class="modal-text">${contact.cell}</p>
          <p class="modal-text">${contact.street}, ${contact.city} ${contact.postCode}</p>
          <p class="modal-text">Birthday:${contact.dob}</p>
      `;
    modalDiv.appendChild(closeBtn);
    modalDiv.appendChild(infoContainer);
    modalContainer.appendChild(modalDiv);
    modalContainer.appendChild(btnContainer);
    modalContainer.classList.toggle('show-modal');
    galleryDiv.insertAdjacentElement("afterend", modalContainer);
    modal = modalContainer;
    closeModal = closeBtn;
    console.log(modalContainer);
  }

const loadPage = async () => {
  try {
    const contactsList = await randomUsers(randomUsersURL);
    const contactCards = await generateHTML(contactsList);
    contactModal();
    return contactCards;
  } catch (err) {
    throw err;
    console.error(err);
  }
};

loadPage();
contactModal()

