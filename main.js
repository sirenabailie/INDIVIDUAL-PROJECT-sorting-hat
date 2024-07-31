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
const wizards = [
  {
    id: 1,
    name: "Dahlia DeathMetal",
    house: "Slytherin",
    houseDescription: "Cunning and uses any means to achieve their ends"
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

    domString += `<div class="card mx-auto ${titleClass}" style="width: 18rem;">
    <img class="card-img-top" src="..." alt="Card image cap">
        <h3 class="card-title">${wizard.name}</h3>
        <div class="card-body">
          <h5 class="card-title">${wizard.house}</h5>
          <p class="card-text">${wizard.houseDescription}</p>
          </div>
          <button class="btn btn-danger expel-btn" id="delete--${wizard.id}">Expell</button>
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

// const filter = (array, house) => {
//   return array.filter(wizard => wizard.house === house);
// };

//() events last
const startApp = () => {                              
  wizardsOnDom(wizards);                                 
}

// call event function
startApp();

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
