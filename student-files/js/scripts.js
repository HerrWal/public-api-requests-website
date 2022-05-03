/** 
 * Search markup:  
 **/ 

// You can use the commented out markup below as a template
// for your search feature and append it to this `search-container` div.

// IMPORTANT: Altering the arrangement of the markup and the 
// attributes used may break the styles or functionality.

// <form action="#" method="get">
//     <input type="search" id="search-input" class="search-input" placeholder="Search...">
//     <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
// </form>

const randomUserURL = "https://randomuser.me/api/?results=12";
const searchContainer = document.getElementsByClassName('search-container');
const galleryDiv = document.getElementById('gallery');

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

console.log(getJSON(randomUserURL));