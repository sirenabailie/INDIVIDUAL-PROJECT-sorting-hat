// hides form until btn click
document.getElementById('showform').addEventListener('click', function() {
  var form = document.getElementById('form');
  if (form.style.display === 'none' || form.style.display === '') {
      form.style.display = 'block';
  } else {
      form.style.display = 'none';
  }
}); 


// setup for houses and wizards
const houses = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];
const houseImages = {
  Gryffindor: 'https://mrwallpaper.com/images/high/gryffindor-house-crest-artwork-h0g3h4hn7l34rz5q.jpg',
  Slytherin:  'https://wallpapercave.com/wp/wp2727931.jpg',
  Ravenclaw:  'https://preview.redd.it/does-anybody-else-prefer-the-hl-house-crests-over-the-v0-xadix09heg3b1.jpeg?width=1179&format=pjpg&auto=webp&s=c5cdb479072f3617b078f8d24e741423f36011a2',
  Hufflepuff: 'https://wallpapercave.com/wp/wp11077690.jpg'
}
const houseBlurbs = {
  Gryffindor: "You might belong in Gryffindor, where dwell the brave at heart, their daring, nerve, and chivalry set Gryffindors apart.",
  Slytherin: "In Slytherin you'll make your real friends, those cunning folks use any means to achieve their ends.",
  Ravenclaw: "In wise old Ravenclaw, if you've a ready mind, where those of wit and learning will always find their kind.",
  Hufflepuff: "You might belong in Hufflepuff, where they are just and loyal, those patient Hufflepuffs are true and unafraid of toil."
}
const wizards = [
  {
    id: 1,
    name: "Dahlia DeathMetal",
    house: "Slytherin",
  }
];



// utility function 
const renderToDom = (divId, htmlToRender) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = htmlToRender;
};


// renders cards to dom
const wizardsOnDom = (array) => {
  let domString = "";
  array.forEach((wizard) => {

    const titleClass = wizard.house === 'Gryffindor' ? 'title-gryffindor' : wizard.house === 'Slytherin' ? 'title-slytherin' : wizard.house === 'Ravenclaw' ? 'title-ravenclaw' : 'title-hufflepuff';  
    
    const houseImage = houseImages[wizard.house];

    const houseBlurb = houseBlurbs[wizard.house];

    domString += `<div class="card mx-auto ${titleClass}" style="width: 18rem;">
    <img class="card-img-top" src="${houseImage}" alt="Card image cap">
        <h3 class="card-title">${wizard.name}</h3>
        <div class="card-body">
          <h4 class="card-title">${wizard.house}</h4>
          <h5 class="card-text">${houseBlurb}</h5>
          </div>
          <button class="btn btn-danger expel-btn" id="delete--${wizard.id}">Ex-Spell</button>
      </div>`; 
  });
  renderToDom('#app', domString);
}

// filter wizards by assigned house
const filter = (array, houseString) => {
  const houseArray = [];
  for (const wizard of array) {
    if (wizard.house === houseString) {
      houseArray.push(wizard);
    }
  }

  return houseArray;
};


wizardsOnDom(wizards);


// create form
const form = document.querySelector('form');      
const createWizard = (e) => {                        
  e.preventDefault();   

  const newWizard = {  
    id: wizards.length + 1,
    name: document.querySelector("#name").value,
    house: houses[Math.floor(Math.random() * houses.length)],
    // houseDescription: document.querySelector("#houseDescription").value,
  }

  wizards.push(newWizard);
  wizardsOnDom(wizards);
  form.reset();
}

//submit form
form.addEventListener('submit', createWizard); 


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


//call event last
const startApp = () => {                              
  wizardsOnDom(wizards);                                 
}

// call event function
startApp();
