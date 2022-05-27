function editNav() {
  var x = document.getElementById("myTopnav");

  if (x.className === "topnav") {
    x.className += " responsive";
    document.querySelectorAll('.main-navbar .icon i').forEach(item => {
      item.classList.add('fa-times')
      item.classList.remove('fa-bars')
    })
  } else {
    x.className = "topnav";
    document.querySelectorAll('.main-navbar .icon i').forEach(item => {
      item.classList.add('fa-bars')
      item.classList.remove('fa-times')
    })
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelectorAll('.close')
const formData = document.querySelectorAll(".formData");
const forms = document.querySelectorAll('form')

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
closeModalBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// block form submition
forms.forEach(form => form.addEventListener('submit', (e) => e.preventDefault()))

// check if the form is validate
function validate() {

  // reset error messages
  document.querySelectorAll('.error-message').forEach(item => {
    item.remove()
  })

  // DOM Form elements
  const firstInput = document.querySelector('#first')
  const lastInput = document.querySelector('#last')
  const emailInput = document.querySelector('#email')
  const dateInput = document.querySelector('#birthdate')
  const numberInput = document.querySelector('#quantity')
  const conditionsInput = document.querySelector('#checkbox1')
  const locationInputs = document.querySelectorAll('input[name="location"]')

  const checkFirst = firstInput.value.length >= 2 ? true : false // check that the firstname has at least 2 characters
  const checkLast = lastInput.value.length >= 2 ? true : false // check that the lastname has at least 2 characters
  const checkDate = dateInput.value != '' ? true : false // Vérifie que la date est bien renseignée
  const checkNumber = (Number.isInteger(Number(numberInput.value)) && numberInput.value != '') ? true : false// check that the quantity is a number
  const checkLocation = Array.from(locationInputs).find(item => item.checked === true) ? true : false;   // check that a location is choose
  const checkConditions = conditionsInput.checked ? true : false // check that the conditions are checked
  const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/); // create regex for email check
  const checkEmail = emailRegex.test(emailInput.value)   // check that the email have the good format
  
  if(!checkFirst) showError(firstInput, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.") // shows an error if the firstname's condition is not valide
  if(!checkLast) showError(lastInput, "Veuillez entrer 2 caractères ou plus pour le champ du nom.") // shows an error if the lastname's condition is not valide
  if(!checkDate) showError(dateInput, "Vous devez entrer votre date de naissance.") // shows an error if the datebirth's condition is not valide
  if(!checkNumber) showError(numberInput, "Veuillez entrer une quantité valide") // shows an error if the datebirth's condition is not valide
  if(!checkEmail) showError(emailInput, "Veuillez entrer un email valide") // shows an error if the email's condition is not valide
  if(!checkConditions) showError(conditionsInput.closest('.formData'), "Vous devez vérifier que vous acceptez les termes et conditions.") // shows an error if the conditions's condition is not valide
  if(!checkLocation) showError(document.querySelector('input[name="location"]').closest('.formData'), "Vous devez choisir une option.") // shows an error if the locations's condition is not valide

  if(checkFirst && checkLast && checkDate && checkNumber && checkEmail && checkConditions && checkLocation) {
    document.querySelector('.bground form').remove()
    document.querySelector('.bground .modal-body').innerHTML = `
    <div class="formData formDataResponsive">
      <span>Merci pour votre inscription !</span>
    </div>
    <div class="formData formDataResponsive">
    <button
    onClick="closeModal()"
      class="button"
    >Fermer</button>
    </div>`

  }
}

// show error message
function showError(item, message) {
  item.classList.add('error-input')
  let errorMessage = document.createElement('span') // create span element
  errorMessage.classList.add('error-message') // put a class on the span
  errorMessage.textContent = message // put a text inside the span
  item.after(errorMessage) // insert the span after a DOM element inside the DOM
}