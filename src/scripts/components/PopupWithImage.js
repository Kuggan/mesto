import Popup from './Popup.js'

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector);
        this._link = this._popup.querySelector('.popup__image');
        this._name = this._popup.querySelector('.popup__caption');
        
    }

    openImage({name, link}) {
        this._name.textContent = name;
        this._link.src = link;
        this._link.alt = name;
        super.open();
    }
}