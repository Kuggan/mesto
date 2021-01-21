export  default class Card {
  constructor({name, link, likes, cardId, owner, userId}, cardSelector, showPopupImage, showPopupWithQuestion, likeCard){
    this._link = link;
    this._name = name;
    this._likes = likes;
    this._cardId = cardId;
    this._owner = owner;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._showPopupImage = showPopupImage;
    this._showPopupWithQuestion = showPopupWithQuestion;
    this._likeCards = likeCard;
    
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
    this._showPopupWithQuestion({
      element: this._element,
      id: this._cardId
    });
 }
 _likeCard(){
    this._like = this._element.querySelector('.element__heart');
    if(this._like.classList.contains('element__heart_active')){
      this._likeCards({
        element: this._element,
        cardId: this._cardId,
        method: 'DELETE'
      })
    } else {
      this._likeCards({
        element: this._element,
        cardId: this._cardId,
        method: 'PUT'
      })
    }
 }

 _checkLikes(){
   if (this._likes.some(item => item._id === this._user)){
    this._element.querySelector('.element__heart').classList.add('element__heart_active');
   }
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
    this._element.querySelector('.element__counter').textContent = this._likes.length;
    this._setEventListeners();
    this._checkLikes();
    if (this._owner != this._userId){
      this._element.querySelector('.element__delete').classList.add('element__delete_disabled');
      return this._element;
    } else{
      return this._element;
    }
    
  }

  
}


 
