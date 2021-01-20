export default class Section{
    constructor({renderer}, containerSelector){
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    renderItems(items, {userId}){
        items.forEach(({name, link, likes, cardId, owner}) =>{
            this._renderer({name, link, likes, cardId, owner, userId});
        });
    }
    addItem(element){
        this._container.prepend(element);
    }

    // addItemAppend(element){
    //     this._container.append(element);
    // }

}