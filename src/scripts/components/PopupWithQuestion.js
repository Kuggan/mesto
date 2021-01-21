import Popup from './Popup.js';

export default class PopupWithQuestion extends Popup {
    constructor({popupSelector, handleSubmitForm}){
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._popupForm = this._popup.querySelector('.popup__form');

    }

    setEventListeners(){
        super.setEventListeners();
        this._popupForm.addEventListener( 'submit', (evt)=>{
            evt.preventDefault();
            this._handleSubmitForm();
            super.close()
        });
    }
   
}
