import './index.css'

import {initialCards, validationConfig } from '../scripts/components/components.js';

import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';

 // validate forms 
 const formEditProfile = document.querySelector('.popup__form_edit-profile');
 const popupFormAddCard = document.querySelector('.popup__form_add-card');

 const editProfileFormValidator = new FormValidator (validationConfig, formEditProfile);
 editProfileFormValidator.enableValidation();
 

 const addCardFormValidator = new FormValidator (validationConfig, popupFormAddCard);
 addCardFormValidator.enableValidation(); 
 
 //  open popup of zoomed picture
 const popupImageZoomed = new PopupWithImage('.popup_image');

 function showPopupImage({name, link}){
   popupImageZoomed.setEventListeners();
   popupImageZoomed.openImage({name,link});
 }

 

const initialCardsList = new Section({
  items: initialCards,
  renderer: ({name, link})=>{
    const card = new Card ({name, link},  '.element-template', showPopupImage);
    const cardElement = card.generateCard();
    initialCardsList.addItem(cardElement);
  }
}, '.elements');

//a form which to add a new card 
const addCardButton = document.querySelector('.profile__button-add');

const popupAddForm = new PopupWithForm ('.popup_add-card', (itemValue) =>{
    const card = new Card ({name: itemValue.name, link: itemValue.link},  '.element-template', showPopupImage);
    const cardElement = card.generateCard();
    initialCardsList.addItem(cardElement);
  });
// event handlers of addCard form
 popupAddForm.setEventListeners();
 addCardButton.addEventListener('click', ()=> {
  popupAddForm.open();
  addCardFormValidator.resetValidation();
});

// Profile form
const editButton = document.querySelector('.profile__button-edit');
const userInfo = new UserInfo({nameProfile:'.profile__title', jobProfile:'.profile__subtitle'});
const fieldName = document.querySelector('.popup__input_enter_name');
const fieldDescription = document.querySelector('.popup__input_enter_description');

const popupEditForm = new PopupWithForm(
   '.popup_edit-profile',
    (inputValues) => {
    userInfo.setUserInfo(inputValues);
}
);

// event handlers of profile form
popupEditForm.setEventListeners();

editButton.addEventListener('click', ()=>{
  const userProfile = userInfo.getUserInfo();
  fieldName.value = userProfile.name;
  fieldDescription.value = userProfile.job;
  editProfileFormValidator.resetValidation();
  popupEditForm.open();

});

initialCardsList.rendererItems();
