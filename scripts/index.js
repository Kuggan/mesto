const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
const editButton = document.querySelector('.profile__button-edit');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__subtitle');
const form = document.querySelector('.popup__form');
const fieldName = document.querySelector('.popup__input_enter_name');
const fieldDescription = document.querySelector('.popup__input_enter_description');


function showPopup() {
  popup.classList.add('popup_opened');
  fieldName.value = profileName.textContent;
  fieldDescription.value = profileDescription.textContent;
} 
function closePopup() {
  popup.classList.remove('popup_opened');
}
function submitForm(event){
  event.preventDefault();
  profileName.textContent = fieldName.value;
  profileDescription.textContent = fieldDescription.value;
  closePopup();
}
editButton.addEventListener('click', showPopup);
popupCloseButton.addEventListener('click', closePopup);
form.addEventListener('submit',submitForm);

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; // given by conditions for loading a started page


 // variables
const cards = document.querySelector('.elements');
const popupAddCard = document.querySelector('.popup_add-card');
const addButton = document.querySelector('.profile__button-add');
const popupCloseAddButton = document.querySelector('.popup__close_add-card');
const popupSubmitAddCard = document.querySelector('.popup__submit_add-card')
const popupInputTypeName = document.querySelector('.popup__input_type_name');
const popupInputTypeLink = document.querySelector('.popup__input_type_link');
const popupFormAddCard = document.querySelector('.popup__form_add-card');
const popupCloseImage = document.querySelector('.popup__close_image');
const popupImage = document.querySelector('.popup_image');
const popupImageCaption = document.querySelector('.popup__image_caption');
const popupImageZoomed = document.querySelector('.popup__image')


// open popup of adding cards
function showPopupAddCard() {
  popupAddCard.classList.add('popup_opened');
}
function closePopupAddCard() {
  popupAddCard.classList.remove('popup_opened');
}

addButton.addEventListener('click', showPopupAddCard);
popupCloseAddButton.addEventListener('click', closePopupAddCard);
// open popup of zoomed picture
function showPopupImage(src, alt, caption){
  popupImage.classList.add('popup_opened');
  popupImageZoomed.src = src;
  popupImageZoomed.alt = alt;
  popupImageCaption.textContent = caption;
}
function closePopupImage(){
  popupImage.classList.remove('popup_opened');
}

popupCloseImage.addEventListener('click', closePopupImage);


// function  creating card 
function createCard(data) {
   const cardElement = document.querySelector('.element-template').content.cloneNode(true);// copy elements of a card and fill a card by elements
   cardElement.querySelector('.element__image').src = data.link; // picture 
   cardElement.querySelector('.element__title').textContent = data.name; //name
   //popup zoomed picture 
  cardElement.querySelector('.element__image').addEventListener('click',()=> showPopupImage(data.link, data.name,data.name));
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
  
  // method spread cards in the place
  cards.prepend(cardElement);
  return cardElement;
}


//block that adding a new card from a form
popupFormAddCard.addEventListener('submit', event=>{
  event.preventDefault();
  const dataCard = {
    name: popupInputTypeName.value,
    link: popupInputTypeLink.value
  };
  const elementCard = createCard(dataCard);
  cards.prepend(elementCard);
  popupFormAddCard.reset();
  closePopupAddCard()
});

initialCards.forEach(createCard);