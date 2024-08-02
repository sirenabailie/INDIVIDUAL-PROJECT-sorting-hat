// Hides form until button click
document.getElementById('showform').addEventListener('click', function() {
  var form = document.getElementById('form');
  form.style.display = (form.style.display === 'none' || form.style.display === '') ? 'block' : 'none';
});

// Setup for houses and wizards
const houses = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];
const houseImages = {
  Gryffindor: 'https://mrwallpaper.com/images/high/gryffindor-house-crest-artwork-h0g3h4hn7l34rz5q.jpg',
  Slytherin:  'https://www.factinate.com/wp-content/uploads/2018/01/21-30.jpg',
  Ravenclaw:  'https://th.bing.com/th/id/R.a93e6613852630506c924f0b0d4cf9a5?rik=6GP3xaiygkn7TA&pid=ImgRaw&r=0',
  Hufflepuff: 'https://i.etsystatic.com/16399819/r/il/0edd01/1935571865/il_570xN.1935571865_i6ig.jpg'
}
const houseBlurbs = {
  Gryffindor: "You might belong in Gryffindor, where dwell the brave at heart, their daring, nerve, and chivalry set Gryffindors apart.",
  Slytherin: "In Slytherin you'll make your real friends, those cunning folks use any means to achieve their ends.",
  Ravenclaw: "In wise old Ravenclaw, if you've a ready mind, where those of wit and learning will always find their kind.",
  Hufflepuff: "You might belong in Hufflepuff, where they are just and loyal, those patient Hufflepuffs are true and unafraid of toil."
}
const wizards = [];
const expelledWizards = [];  

// Utility function to render HTML to a specific div
const renderToDom = (divId, htmlToRender) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = htmlToRender;
};

// Function to render wizard cards to the main div
const wizardsOnDom = (array) => {
  let domString = "";
  array.forEach((wizard) => {
    const titleClass = wizard.house === 'Gryffindor' ? 'title-gryffindor' :
                       wizard.house === 'Slytherin' ? 'title-slytherin' :
                       wizard.house === 'Ravenclaw' ? 'title-ravenclaw' :
                       'title-hufflepuff';
    const houseImage = houseImages[wizard.house];
    const houseBlurb = houseBlurbs[wizard.house];

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
  renderToDom('#app-content', domString);
};

// Function to render expelled wizard cards to the #ex-spelled div
const expelledWizardsOnDom = (array) => {
  let domString = "";
  array.forEach((wizard) => {

    domString += `<div class="card mx-auto expelled" style="width: 18rem;">
      <img class="card-img-top" src="https://wallpapercave.com/wp/wp5313132.jpg" alt="Card image cap">
      <h3 class="card-title wizardname">${wizard.name}</h3>
      <div class="card-body">
        <h4 class="card-title wizardhouse">Death Eater</h4>
        <h5 class="card-text">“There is no good and evil. There is only power – and those too weak to seek it.”</h5>
      </div>
    </div>`; 
  });
  renderToDom('#ex-spelled-content', domString);
};

// Function to handle the expel button click event
const handleExpel = (id) => {
  const index = wizards.findIndex(e => e.id === Number(id));
  if (index > -1) {
    // Move the wizard to the expelledWizards array
    expelledWizards.push(wizards[index]);
    wizards.splice(index, 1);
    // Update the DOM
    wizardsOnDom(wizards);
    expelledWizardsOnDom(expelledWizards);
  }
};

// Event listener for expel button
document.getElementById('app').addEventListener('click', (e) => {
  if (e.target.id.includes("delete")) {
    const [, id] = e.target.id.split("--");
    handleExpel(id);
  }
});

// Create form 
const form = document.querySelector('form');      
const createWizard = (e) => {                        
  e.preventDefault();   
  const newWizard = {  
    id: wizards.length + 1,
    name: document.querySelector("#name").value,
    house: houses[Math.floor(Math.random() * houses.length)],
  };
  wizards.push(newWizard);
  wizardsOnDom(wizards);
  form.reset();

  form.style.display = 'none';
};

// Submit form event listener
form.addEventListener('submit', createWizard); 

// Filter wizards by house 
const filter = (array, houseString) => {
  return array.filter(wizard => wizard.house === houseString);
};

// filter house buttons
const showAllBtn = document.querySelector("#show-all-btn");
const showGryffindorBtn = document.querySelector("#gryffindor-btn");
const showSlytherinBtn = document.querySelector("#slytherin-btn");
const showRavenclawBtn = document.querySelector("#ravenclaw-btn");
const showHufflepuffBtn = document.querySelector("#hufflepuff-btn");

showAllBtn.addEventListener("click", () => {    
  wizardsOnDom(wizards);
});

showGryffindorBtn.addEventListener("click", () => {    
  const gryffindor = filter(wizards, "Gryffindor");
  wizardsOnDom(gryffindor);
});

showSlytherinBtn.addEventListener("click", () => {    
  const slytherin = filter(wizards, "Slytherin");
  wizardsOnDom(slytherin);
});

showRavenclawBtn.addEventListener("click", () => {    
  const ravenclaw = filter(wizards, "Ravenclaw");
  wizardsOnDom(ravenclaw);
});

showHufflepuffBtn.addEventListener("click", () => {    
  const hufflepuff = filter(wizards, "Hufflepuff");
  wizardsOnDom(hufflepuff);
});

// call events last 
wizardsOnDom(wizards);
expelledWizardsOnDom(expelledWizards);
