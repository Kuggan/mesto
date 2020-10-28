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