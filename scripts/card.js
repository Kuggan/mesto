export  default class Card {
  constructor(data, cardSelector, showPopupImage){
    this._link = data.link;
    this._name = data.name;
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
    this._element.querySelector('.element__image').addEventListener('click', () => { this._showPopupImage(this._link, this._name); });
  }
 _deleteCard(){
    this._element.remove();
 }
 _likeCard(){
    this._element.querySelector('.element__heart').classList.toggle('element__heart_active');
 }


  generateCard(){
    this._element = this._getTemplate();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._setEventListeners();
     return this._element;
  }

  
}


 
