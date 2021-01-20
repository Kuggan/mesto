

export default class Popup {
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        // this._closeButton = this._popup.querySelector('.popup__close');
        // this.close = this.close.bind(this);
        // this._handleOverLayClose =this._handleOverLayClose.bind(this)
    }
    _handleEscClose(evt){
        if (evt.key === 'Escape'){
            this.close()
        }
    }
    _handleOverLayClose(evt){
        if (evt.target === evt.currentTarget){
            this.close();
          }
    }
    open(){
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    close(){
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    setEventListeners(){
        this._popup.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
        this._popup.addEventListener('mouseup',this._handleOverLayClose.bind(this));
    }
}