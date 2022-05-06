const randomUserURL = "https://randomuser.me/api/?results=12";
const searchContainer = document.getElementsByClassName('search-container');
const galleryDiv = document.getElementById('gallery');
const body = document.querySelector('body');

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
    const contactInfo = userJSON.results.map(async (contact) => {
        const image = contact.picture.large.toString();
        const name = `${contact.name.first} ${contact.name.last}`;
        const email = contact.email;
        const city = `${contact.location.city}, ${contact.location.country}`;
        const cell = contact.cell;
        const address = contact.location.street;
        const street = `${address.number} ${address.name}`;        
        const postCode = contact.location.postCode;            
        return {image, name, email, city, cell, address, street, postCode};
    });
    return Promise.all(contactInfo);
}


/**
 * Gallery markup
 */

function generateHTML(data) {
    console.log(data);
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

function createModal(data) {
    const modalContainer = () => {
        const div = document.createElement('div');
        div.className = 'modal-container';
        return div;
    }
    data.map((contact) => {
              
    });
    modalContainer.innerHTML = `
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
            <h3 id="name" class="modal-name cap">name</h3>
            <p class="modal-text">email</p>
            <p class="modal-text cap">city</p>
            <hr>
            <p class="modal-text">(555) 555-5555</p>
            <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
            <p class="modal-text">Birthday: 10/21/2015</p>
        </div>
    </div>
    `
    /* <div class="modal-container">       

        // IMPORTANT: Below is only for exceeds tasks 
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div> */
}

/**
 * Card handler
 */

galleryDiv.addEventListener('click', event => {
    const cards = galleryDiv.children;
    console.log(event.target.parentElement)    
    for (let i = 0; i<cards.length; i++ ) {
        
        
        if (event.target.parentElement === cards[i]) {
            console.log(cards[i]);
        } 
    }
});



getRandomUsers(randomUserURL)
    .then(generateHTML)

