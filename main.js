// Hides form until button click
document.getElementById('showform').addEventListener('click', function() {
  var form = document.getElementById('form');
  // Toggle form visibility: if currently hidden or not set, show it; otherwise, hide it
  form.style.display = (form.style.display === 'none' || form.style.display === '') ? 'block' : 'none';
});

// Setup for houses and wizards
const houses = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"]; // Array of Hogwarts houses
const houseImages = { // Object mapping house names to image URLs
  Gryffindor: 'https://mrwallpaper.com/images/high/gryffindor-house-crest-artwork-h0g3h4hn7l34rz5q.jpg',
  Slytherin: 'https://www.factinate.com/wp-content/uploads/2018/01/21-30.jpg',
  Ravenclaw: 'https://th.bing.com/th/id/R.a93e6613852630506c924f0b0d4cf9a5?rik=6GP3xaiygkn7TA&pid=ImgRaw&r=0',
  Hufflepuff: 'https://mrwallpaper.com/images/high/grunge-hufflepuff-crest-fozpekmrnbm6he4w.webp'
};
const houseBlurbs = { // Object mapping house names to descriptive blurbs
  Gryffindor: "You might belong in Gryffindor, where dwell the brave at heart, their daring, nerve, and chivalry set Gryffindors apart.",
  Slytherin: "In Slytherin you'll make your real friends, those cunning folks use any means to achieve their ends.",
  Ravenclaw: "In wise old Ravenclaw, if you've a ready mind, where those of wit and learning will always find their kind.",
  Hufflepuff: "You might belong in Hufflepuff, where they are just and loyal, those patient Hufflepuffs are true and unafraid of toil."
};
const wizards = []; // Array to store wizards
const expelledWizards = []; // Array to store expelled wizards

// Utility function to render HTML to a specific div
const renderToDom = (divId, htmlToRender) => {
  const selectedDiv = document.querySelector(divId); // Select the div by ID
  selectedDiv.innerHTML = htmlToRender; // Set the inner HTML of the div
};

// Function to render wizard cards to the main div
const wizardsOnDom = (array) => {
  let domString = ""; // Initialize an empty string to build HTML
  array.forEach((wizard) => {
    // Determine the CSS class based on the wizard's house
    const titleClass = wizard.house === 'Gryffindor' ? 'title-gryffindor' :
      wizard.house === 'Slytherin' ? 'title-slytherin' :
        wizard.house === 'Ravenclaw' ? 'title-ravenclaw' :
          'title-hufflepuff';
    const houseImage = houseImages[wizard.house]; // Get the image URL for the wizard's house
    const houseBlurb = houseBlurbs[wizard.house]; // Get the blurb for the wizard's house

    // Append the wizard card HTML to the domString
    domString += `<div class="card mx-auto spacing ${titleClass}" style="width: 18rem;">
      <img class="card-img-top" src="${houseImage}" alt="Card image cap">
      <h3 class="card-title wizardname">${wizard.name}</h3>
      <div class="card-body">
        <h4 class="card-title wizardhouse">${wizard.house}</h4>
        <h5 class="card-text">${houseBlurb}</h5>
      </div>
      <button class="btn btn-danger expel-btn" id="delete--${wizard.id}">Ex-Spell</button>
    </div>`;
  });
  renderToDom('#app-content', domString); // Render the wizard cards to the #app-content div
};

// Function to render expelled wizard cards to the #ex-spelled div
const expelledWizardsOnDom = (array) => {
  let domString = ""; // Initialize an empty string to build HTML
  array.forEach((wizard) => {
    // Append the expelled wizard card HTML to the domString
    domString += `<div class="card mx-auto expelled" style="width: 18rem;">
      <img class="card-img-top" src="https://wallpapercave.com/wp/wp5313132.jpg" alt="Card image cap">
      <h3 class="card-title wizardname">${wizard.name}</h3>
      <div class="card-body">
        <h4 class="card-title wizardhouse">Death Eater</h4>
        <h5 class="card-text">“There is no good and evil. There is only power – and those too weak to seek it.”</h5>
      </div>
    </div>`;
  });
  renderToDom('#ex-spelled-content', domString); // Render the expelled wizard cards to the #ex-spelled-content div
};

// Function to handle the expel button click event
const handleExpel = (id) => {
  const index = wizards.findIndex(e => e.id === Number(id)); // Find the index of the wizard to expel
  if (index > -1) {
    // Move the wizard to the expelledWizards array
    expelledWizards.push(wizards[index]);
    wizards.splice(index, 1); // Remove the wizard from the wizards array
    // Update the DOM
    wizardsOnDom(wizards); // Render remaining wizards
    expelledWizardsOnDom(expelledWizards); // Render expelled wizards
  }
};

// Event listener for expel button
document.getElementById('app').addEventListener('click', (e) => {
  if (e.target.id.includes("delete")) { // Check if the clicked element is an expel button
    const [, id] = e.target.id.split("--"); // Extract the wizard ID from the button ID
    handleExpel(id); // Handle the expulsion
  }
});

// Create form 
const form = document.querySelector('form'); // Select the form element
const createWizard = (e) => {
  e.preventDefault(); // Prevent the default form submission
  const newWizard = {
    id: wizards.length + 1, // Set a new ID for the wizard
    name: document.querySelector("#name").value, // Get the name from the form input
    house: houses[Math.floor(Math.random() * houses.length)], // Randomly assign a house
  };
  wizards.push(newWizard); // Add the new wizard to the wizards array
  wizardsOnDom(wizards); // Render the updated list of wizards
  form.reset(); // Reset the form fields

  form.style.display = 'none'; // Hide the form

  // Show the clear button
  document.getElementById('clear-cards-btn').classList.remove('hidden'); // Remove 'hidden' class from the clear button
};

// Submit form event listener
form.addEventListener('submit', createWizard); // Attach the createWizard function to form submit

// Clear all cards function
const clearAllCards = () => {
  // Clear the content of the app-content and ex-spelled-content divs
  renderToDom('#app-content', ''); // Clear wizard cards
  renderToDom('#ex-spelled-content', ''); // Clear expelled wizard cards

  // Clear the wizards and expelledWizards arrays
  wizards.length = 0; // Empty the wizards array
  expelledWizards.length = 0; // Empty the expelledWizards array

  // Hide the clear button
  document.getElementById('clear-cards-btn').classList.add('hidden'); // Add 'hidden' class to the clear button
};

// Event listener for clear button
document.getElementById('clear-cards-btn').addEventListener('click', clearAllCards); // Attach the clearAllCards function to button click

// Filter wizards by house 
const filter = (array, houseString) => {
  return array.filter(wizard => wizard.house === houseString); // Return only wizards that belong to the specified house
};

// Filter house buttons
const showAllBtn = document.querySelector("#show-all-btn"); // Select the "Show All" button
const showGryffindorBtn = document.querySelector("#gryffindor-btn"); // Select the "Show Gryffindor" button
const showSlytherinBtn = document.querySelector("#slytherin-btn"); // Select the "Show Slytherin" button
const showRavenclawBtn = document.querySelector("#ravenclaw-btn"); // Select the "Show Ravenclaw" button
const showHufflepuffBtn = document.querySelector("#hufflepuff-btn"); // Select the "Show Hufflepuff" button

showAllBtn.addEventListener("click", () => {
  wizardsOnDom(wizards); // Show all wizards
});

showGryffindorBtn.addEventListener("click", () => {
  const gryffindor = filter(wizards, "Gryffindor"); // Filter wizards to show only Gryffindors
  wizardsOnDom(gryffindor); // Render filtered Gryffindors
});

showSlytherinBtn.addEventListener("click", () => {
  const slytherin = filter(wizards, "Slytherin"); // Filter wizards to show only Slytherins
  wizardsOnDom(slytherin); // Render filtered Slytherins
});

showRavenclawBtn.addEventListener("click", () => {
  const ravenclaw = filter(wizards, "Ravenclaw"); // Filter wizards to show only Ravenclaws
  wizardsOnDom(ravenclaw); // Render filtered Ravenclaws
});

showHufflepuffBtn.addEventListener("click", () => {
  const hufflepuff = filter(wizards, "Hufflepuff"); // Filter wizards to show only Hufflepuffs
  wizardsOnDom(hufflepuff); // Render filtered Hufflepuffs
});

// Call events last 
wizardsOnDom(wizards); // Initial render of all wizards
expelledWizardsOnDom(expelledWizards); // Initial render of expelled wizards
