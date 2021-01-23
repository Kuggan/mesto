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
            this._handleSubmitForm({element:this._element, id: this._id});
           
        });
    }
   open({element, id}){
       this._element = element;
       this._id =id;
       super.open();
   }
}
