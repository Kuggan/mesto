export default class Api{
    constructor({url, headers}){
       this._url = url;
       this._headers = headers;
    }

    _handleOriginalRes(res){
        if (!res.ok){
            return Promise.reject(`Ошибка: ${res.status}`);
          }
          return res.json();
    }
        
    
    getUserInfo(){
        return  fetch (`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
        .then(res=>this._handleOriginalRes(res));
          
        
    }
    renewUserInfo(inputValues){
        return fetch(`${this._url}/users/me`,{
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({name: inputValues.name, about: inputValues.about})
        })
        .then(res=>this._handleOriginalRes(res));

    }
    renewUserAvatar(inputValues){
        return fetch(`${this._url}/users/me/avatar`,{
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({avatar: inputValues.avatar})
        })
        .then(res=>this._handleOriginalRes(res));

    }
    getInitialCards(){
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        })
        .then(res=>this._handleOriginalRes(res));
    
    }

    createNewCard(inputValues){
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({name: inputValues.title, link: inputValues.url})
        })
        .then(res=>this._handleOriginalRes(res));
        
        
    }
    deleteCard(cardId){
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(res=>this._handleOriginalRes(res));
        
       

    }
    likeCard(cardId, method){
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: method,
            headers: this._headers
        })
        .then(res=>this._handleOriginalRes(res));
        
    }

 
}

