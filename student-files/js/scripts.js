const randomUserURL = "https://randomuser.me/api/?results=12";
const searchContainer = document.getElementsByClassName('search-container');
const galleryDiv = document.getElementById('gallery');
const body = document.querySelector('body');
const modalContainer = document.querySelector('.modal-container');
let employees = {};

/** 
 * Search markup:  
 */ 

// You can use the commented out markup below as a template
// for your search feature and append it to this `search-container` div.

// IMPORTANT: Altering the arrangement of the markup and the 
// attributes used may break the styles or functionality.

// <form action="#" method="get">
//     <input type="search" id="search-input" class="search-input" placeholder="Search...">
//     <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
// </form>

/**
 * Get and display 12 random users
 */

async function getJSON(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch(error){
        throw error;
        console.error('Uh oh, something has gone wrong!')
    }
}

async function getRandomUsers(url) {
    const userJSON = await getJSON(url);
    const contactInfo = userJSON.results.map((contact) => {
        const image = contact.picture.large.toString();
        const name = `${contact.name.first} ${contact.name.last}`;
        const email = contact.email;
        const city = `${contact.location.city}, ${contact.location.country}`;
        const cell = contact.cell;
        const address = contact.location.street;
        const street = `${address.number} ${address.name}`;        
        const postCode = contact.location.postcode;
        const dob = contact.dob.date.slice(0,9);         
        return {image, name, email, city, cell, address, street, postCode, dob};
    });
    employees = contactInfo;
    console.log(contactInfo);
    return Promise.all(contactInfo);
}


/**
 * Gallery markup
 */

function generateHTML(data) {    
    data.map((contact) => {
        const card = document.createElement('div');
        card.classList.add('card');
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
        galleryDiv.insertAdjacentElement('beforeend', card);
    });
}

/**
 * Modal markup
 */

function createModal(contact) {
    function createDiv(className) {
        const div = document.createElement('div');
        div.className = className;
        return div
    }
    function createBtn(id, className, text) {
        const btn = document.createElement('button');
        btn.type = "button";
        btn.id = id;
        btn.className = className;
        btn.innerHTML = `${text}`;
        return btn
    }
    const modalContainer = createDiv("modal-container");
    const modalDiv = createDiv("modal");
    const infoContainer = createDiv("modal-info-container");
    const btnContainer = createDiv("modal-btn-container");
    const closeBtn = createBtn("modal-close-btn", "modal-close-btn", '<strong>X</strong>');
    
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
    modalContainer.style.visibility = '';
    galleryDiv.insertAdjacentElement('afterend', modalContainer);

    console.log(modalContainer);
}

/**
 * modal interactivity
 */



getRandomUsers(randomUserURL)
    .then(generateHTML)
    .then(
        body.addEventListener('click', event => {
            const cards = galleryDiv.children;              
            for (let i = 0; i<cards.length; i++) {       
                if (cards[i].contains(event.target)) {
                    console.log(employees[i]);
                    createModal(employees[i]);
                } 
            }                  
        })        
    )
    .finally(
        document.querySelector('#modal-close-btn').addEventListener('click', () =>  {
            const modalContainer = document.querySelector('.modal-container');
            if (modalContainer.style.visibility === '') {
                modalContainer.style.visibility = 'hidden';
            } else if (modalContainer.style.visibility = 'hidden') {
                modalContainer.style.visibility = '';
            }
        })
    )