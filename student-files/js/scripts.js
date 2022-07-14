const randomUsersURL = "https://randomuser.me/api/?results=12";
const galleryDiv = document.getElementById("gallery");
const cards = document.getElementsByClassName('card');
const body = document.querySelector('body');
let selectedContact;
let selectedContactIndex;

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
  contactInfo.map((contact, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.employeeIndex = `${index}`;
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
/*
Attach a click to the entire gallery
check if it is a card 
and if it is we can grab it's data attribute, the index
then use that to create and display the modal. This could be done by a function

This function will create the modal, append it to the html and set the listeners
for each of the buttons
*/
function createModal(contacts, employeeIndex) {
  const modal =
    `<div class="modal-container">
      <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
            <img class="modal-img" src="${contacts[employeeIndex].image}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${contacts[employeeIndex].name}</h3>
            <p class="modal-text">${contacts[employeeIndex].email}</p>
            <p class="modal-text cap">${contacts[employeeIndex].city}</p>
            <hr>
            <p class="modal-text">${contacts[employeeIndex].cell}</p>
            <p class="modal-text">${contacts[employeeIndex].street}, ${contacts[employeeIndex].city} ${contacts[employeeIndex].postCode}</p>
            <p class="modal-text">Birthday:${contacts[employeeIndex].dob}</p>
          </div>
      </div>
      <div class="modal-btn-container">
          <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
          <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
    </div>`;
  galleryDiv.insertAdjacentHTML("afterend", modal)
  const modalContainer = document.querySelector('.modal-container');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalPrevBtn = document.getElementById('modal-prev');
  const modalNextBtn = document.getElementById('modal-next');  
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', (e) => {
      if(modalCloseBtn.innerText === e.target.innerText) {
        modalContainer.remove();
      }
    });
  }  
  modalPrevBtn.addEventListener('click', () => {
    console.log('Previous contact');
    modalContainer.remove();    
  });
  modalNextBtn.addEventListener('click', () => {
    console.log('Next contact');
    modalContainer.remove();    
  });  
};

const loadPage = async () => {
  try {
    const contactsList = await randomUsers(randomUsersURL);
    const contactCards = await generateHTML(contactsList);
    galleryDiv.addEventListener("click", e => {
      for (let card of cards) {
        if (card.contains(e.target)) {
          createModal(contactsList, card.dataset.employeeIndex)
        }
      }      
    });
    return contactCards;
  } catch (err) {
    throw err;
    console.error(err);
  }
};

loadPage();