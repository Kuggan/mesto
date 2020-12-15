import {initialCards} from './data.js';
import{showPopup, closePopup} from './utils.js'
import Card from './card.js';
import FormValidator from './FormValidator.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inputInvalidClass: 'popup__input_state_invalid',
  buttonInvalidClass: 'popup__submit_invalid',
  errorClass: '.error'
};


const editButton = document.querySelector('.profile__button-edit');
const popupEditProfile = document.querySelector('.popup_edit-profile')
const closeEditButton = document.querySelector('.popup__close_edit-profile');
const addCardButton = document.querySelector('.profile__button-add');
const popupAddCard = document.querySelector('.popup_add-card');
const closeAddCardButton = document.querySelector('.popup__close_add-card');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');
const fieldName = document.querySelector('.popup__input_enter_name');
const fieldDescription = document.querySelector('.popup__input_enter_description');
const formEditProfile = document.querySelector('.popup__form_edit-profile');
const popupFormAddCard = document.querySelector('.popup__form_add-card');
const popupInputTypeName = document.querySelector('.popup__input_type_name');
const popupInputTypeLink = document.querySelector('.popup__input_type_link');
const popupImage = document.querySelector('.popup_image');
const popupImageCaption = document.querySelector('.popup__caption');
const popupImageZoomed = document.querySelector('.popup__image');
const closePopupImage = document.querySelector('.popup__close_image');
const cards = document.querySelector('.elements');


// event handlers
 editButton.addEventListener('click', ()=>{ 
   showPopup(popupEditProfile);
   fieldName.value = profileName.textContent;
   fieldDescription.value = profileDescription.textContent;
   editProfileFormValidator.resetValidation();
   
  } );
 
 closeEditButton.addEventListener('click', () => closePopup(popupEditProfile));

  addCardButton.addEventListener('click', ()=>{ 
   showPopup(popupAddCard);
   popupFormAddCard.reset();
   addCardFormValidator.resetValidation();
  });
  
 closeAddCardButton.addEventListener('click', ()=> closePopup(popupAddCard));
 // submit changes of profile a name and a description
 formEditProfile.addEventListener('submit',event=>{
  event.preventDefault();
  profileName.textContent = fieldName.value;
  profileDescription.textContent = fieldDescription.value;
  closePopup(popupEditProfile);
  
 });
// //  open popup of zoomed picture
function showPopupImage(src, alt){
  showPopup(popupImage);
  popupImageZoomed.src = src;
  popupImageZoomed.alt = alt;
  popupImageCaption.textContent = alt;
}

 closePopupImage.addEventListener('click',()=> closePopup(popupImage));


 const editProfileFormValidator = new FormValidator (validationConfig, formEditProfile );
 editProfileFormValidator.enableValidation();
 

 const addCardFormValidator = new FormValidator (validationConfig, popupFormAddCard);
 addCardFormValidator.enableValidation();

     

   //  submit data which comes from a form of input
   popupFormAddCard.addEventListener('submit', (event)=>{
    event.preventDefault();
    const card = new Card({
      name: popupInputTypeName.value,
      link: popupInputTypeLink.value
     }, '.element-template', showPopupImage);
    cards.prepend(card.generateCard());
    closePopup(popupAddCard);
   }
  );

  initialCards.forEach((item)=>{
    const card = new Card(item, '.element-template', showPopupImage);
    const cardElement = card.generateCard();
    cards.append(cardElement);
  });







