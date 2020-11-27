import {initialCards} from './data.js';
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
const popupImageZoomed = document.querySelector('.popup__image')
const closePopupImage = document.querySelector('.popup__close_image');
const cards = document.querySelector('.elements');
const cardElementTemplate = document.querySelector('.element-template').content;

// create a function to open a popup.
function showPopup(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
  document.addEventListener('mousedown', (evt)=>{
    if (evt.target.classList.contains('popup')){
      closePopup(popup)
    }
  });
  
}
// create a function to close a popup
function closePopup(popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
 
}
// create a function to close a popup by 'Escape'
function closePopupEscape(evt){
  const popupImage = document.querySelector('.popup_image');
  if (evt.key === 'Escape'){
    closePopup(popupImage);
  }
  const popupAddCard = document.querySelector('.popup_add-card');
  if (evt.key === 'Escape'){
    closePopup(popupAddCard);
  }
  const popupEditProfile = document.querySelector('.popup_edit-profile')
  if (evt.key === 'Escape'){
    closePopup(popupEditProfile);
  }
  
}

// event handlers
 editButton.addEventListener('click', ()=>{ 
   showPopup(popupEditProfile);
   fieldName.value = profileName.textContent;
   fieldDescription.value = profileDescription.textContent;
   resetValidationState(popupEditProfile, validationConfig);
  } );
 
 closeEditButton.addEventListener('click', () => closePopup(popupEditProfile));

  addCardButton.addEventListener('click', ()=>{ 
   showPopup(popupAddCard);
   popupFormAddCard.reset();
   resetValidationState(popupAddCard, validationConfig);
  });
  
 closeAddCardButton.addEventListener('click', ()=> closePopup(popupAddCard));
 // submit changes of profile a name and a description
 formEditProfile.addEventListener('submit',event=>{
  event.preventDefault();
  profileName.textContent = fieldName.value;
  profileDescription.textContent = fieldDescription.value;
  closePopup(popupEditProfile);
  
 });
 // open popup of zoomed picture
function showPopupImage(src, alt){
  showPopup(popupImage);
  popupImageZoomed.src = src;
  popupImageZoomed.alt = alt;
  popupImageCaption.textContent = alt;
}
 closePopupImage.addEventListener('click',()=> closePopup(popupImage));

 // there is a function does a card and return it 
 function createCard(data) {
     const cardElement = cardElementTemplate.cloneNode(true);
     const cardImage = cardElement.querySelector('.element__image');
     const cardTitle = cardElement.querySelector('.element__title');
     cardImage.src = data.link;
     cardImage.alt = data.name;
     cardTitle.textContent = data.name;
     //popup zoomed picture 
     cardImage.addEventListener('click',()=> showPopupImage(data.link, data.name));
      // trash 
     cardElement.querySelector('.element__delete').addEventListener('click', event =>{
      const card = event.target.closest('.element');
  
      if (card){
        card.remove();
      }
    });
    // like
    cardElement.querySelector('.element__heart').addEventListener('click', event => {
      event.target.classList.toggle('element__heart_active');
    });
   
      return cardElement;
  }
   // add cards to a container(box)
   function addCard(data){
        const cardElement = createCard(data);
        cards.prepend(cardElement);
        
    }
        //  submit data which comes from a form of input
   popupFormAddCard.addEventListener('submit', event=>{
    event.preventDefault();
     const dataCard = {
      name: popupInputTypeName.value,
      link: popupInputTypeLink.value
     };
     addCard(dataCard);
     closePopup(popupAddCard)
     
});

  initialCards.forEach(addCard);
