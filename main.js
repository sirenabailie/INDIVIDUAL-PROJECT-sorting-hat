document.getElementById('showform').addEventListener('click', function() {
  var form = document.getElementById('form');
  if (form.style.display === 'none' || form.style.display === '') {
      form.style.display = 'block';
  } else {
      form.style.display = 'none';
  }
});

const houses = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];
const wizards = [
  {
    id: 1,
    name: "Dahlia DeathMetal",
    house: "Slytherin",
    houseDescription: "Cunning and uses any means to achieve their ends"
  }
];

const renderToDom = (divId, htmlToRender) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = htmlToRender;
};

const wizardsOnDom = (array) => {
  let domString = "";
  array.forEach((wizard) => {
    domString += `<div class="card mx-auto" style="width: 18rem;">
        <h3 class="card-title">${wizard.name}</h3>
        <div class="card-body">
          <h5 class="card-title">${wizard.house}</h5>
          <p class="card-text">${wizard.houseDescription}</p>
          </div>
          <button class="btn btn-danger" id="delete--${wizard.id}">Expell</button>
      </div>`; 
  });
  renderToDom('#app', domString);
}

wizardsOnDom(wizards);

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

form.addEventListener('submit', createWizard); 
