export  default class Card {
  constructor({name, link}, cardSelector, showPopupImage){
    this._link = link;
    this._name = name;
    this._cardSelector = cardSelector;
    this._showPopupImage = showPopupImage;
    
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
	}
  _setEventListeners(){
    this._element.querySelector('.element__heart').addEventListener('click', () => { this._likeCard (); });  
    this._element.querySelector('.element__delete').addEventListener('click', () => { this._deleteCard(); });  
    this._element.querySelector('.element__image').addEventListener('click', () => { this._zoomedImage(); });
  }
 _deleteCard(){
    this._element.remove();
 }
 _likeCard(){
    this._element.querySelector('.element__heart').classList.toggle('element__heart_active');
 }

 _zoomedImage(){
    this._showPopupImage({
      name: this._name,
      link: this._link});
 }
  generateCard(){
    this._element = this._getTemplate();
     const cardElementImage = this._element.querySelector('.element__image')
       cardElementImage.src = this._link;
       cardElementImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._setEventListeners();
     return this._element;
  }

  
}


 
