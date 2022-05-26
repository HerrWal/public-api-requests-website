const randomUsersURL = "https://randomuser.me/api/?results=12";
const galleryDiv = document.getElementById("gallery");
const cards = galleryDiv.children;
const modalContainer = document.querySelector('.modal-container');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalPrevBtn = document.getElementById('modal-prev');
const modalNextBtn = document.getElementById('modal-next');

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

    galleryDiv.insertAdjacentElement("beforeend", card);
  });
}

const createModal = (contact) => {
  return `<div class="modal-container">
  <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
        <img class="modal-img" src="${contact.image}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${contact.name}</h3>
        <p class="modal-text">${contact.email}</p>
        <p class="modal-text cap">${contact.city}</p>
        <hr>
        <p class="modal-text">${contact.cell}</p>
        <p class="modal-text">${contact.street}, ${contact.city} ${contact.postCode}</p>
        <p class="modal-text">Birthday:${contact.dob}</p>
      </div>
  </div>
  <div class="modal-btn-container">
      <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
      <button type="button" id="modal-next" class="modal-next btn">Next</button>
  </div>
</div>`;
};

function modalTogle() {    
  if(modalCloseBtn === e.target) {
    console.log('me cierro');
    modalContainer.remove()
  }
}

const loadPage = async () => {
  try {
    const contactsList = await randomUsers(randomUsersURL);
    const contactCards = await generateHTML(contactsList);
    galleryDiv.addEventListener("click", async (e) => {
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].contains(e.target)) {
          const selectedContact = contactsList[i];
          const contactModal = await createModal(selectedContact);
          function insertModal() {
            galleryDiv.insertAdjacentHTML("afterend", contactModal);
          }
          insertModal();
        }
      }    
    });
    modalContainer.addEventListener('click', () => {
      
    });
    return contactCards;
  } catch (err) {
    throw err;
    console.error(err);
  }
};

loadPage();
