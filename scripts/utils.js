
export {showPopup, closePopup, closePopupOverlay, closePopupEscape};

// create a function to open a popup
function showPopup(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
  document.addEventListener('mousedown', closePopupOverlay);
  
  }
// create a function to close a popup
function closePopup(popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
 }
// create a function to close a popup by 'overlay'
 function closePopupOverlay (evt){
   const popupOverlay = document.querySelector('.popup_opened');
    if (evt.target.classList.contains('popup')){
    closePopup(popupOverlay);
  }
 }

// create a function to close a popup by 'Escape'
function closePopupEscape(evt){
  const popupActive = document.querySelector('.popup_opened');
  if (evt.key === 'Escape'){
    closePopup(popupActive);
  }
}