const randomUsersURL = "https://randomuser.me/api/?results=12&nat=us";
const galleryDiv = document.getElementById("gallery");
const cards = document.getElementsByClassName('card');
const body = document.querySelector('body');
let contactsList;
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
    const dob = ` ${contact.dob.date.slice(5,10)}/${contact.dob.date.slice(0, 4)}`.replace('-', '/');
    return { image, name, email, city, cell, address, street, postCode, dob };
  });
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

function createSearchBar() {
  const searchContainer = document.querySelector('.search-container');
  searchContainer.innerHTML = `                        
    <form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;
}

function createModal(index) {
  const modal =
    `<div class="modal-container">
      <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
            <img class="modal-img" src="${contactsList[index].image}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${contactsList[index].name}</h3>
            <p class="modal-text">${contactsList[index].email}</p>
            <p class="modal-text cap">${contactsList[index].city}</p>
            <hr>
            <p class="modal-text">${contactsList[index].cell}</p>
            <p class="modal-text">${contactsList[index].street}, ${contactsList[index].city} ${contactsList[index].postCode}</p>
            <p class="modal-text">Birthday:${contactsList[index].dob}</p>
          </div>
      </div>
      <div class="modal-btn-container">
          <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
          <button type="button" id="modal-next" class="modal-next btn">Next</button>
      </div>
    </div>`;
  galleryDiv.insertAdjacentHTML("afterend",modal);
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
    createModal(--index);
  });
  modalNextBtn.addEventListener('click', () => {
    console.log('Next contact');    
    modalContainer.remove();
    if (index) {
      
    }
    createModal(++index);
  }); 
}

const loadPage = async () => {
  try {
    contactsList = await randomUsers(randomUsersURL);
    const contactCards = await generateHTML(contactsList);
    galleryDiv.addEventListener("click", e => {
      for (let card of cards) {
        if (card.contains(e.target)) {
          selectedContactIndex = card.dataset.employeeIndex;
          createModal(selectedContactIndex);
        }
      }      
    });
    createSearchBar();
    return contactCards;
  } catch (err) {
    throw err;
    console.error(err);
  }
};

loadPage();