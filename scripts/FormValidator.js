export default class FormValidator {
    constructor(config, form ) {
     this._config = config;
     this._form = form;
    }
    _showError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = input.validationMessage;
        input.classList.add(this._config.inputInvalidClass);
    }
    _hideError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = '';
        input.classList.remove(this._config.inputInvalidClass);
    }
    _checkInputValidity(input) {
    
        if (!input.validity.valid) {
            this._showError(input);
        } else {
            this._hideError(input);
        }
    }
    
    _setButtonState(button, isActive) {
        if (isActive) {
            button.classList.remove(this._config.buttonInvalidClass);
            button.disabled = false;
        } else {
            button.classList.add(this._config.buttonInvalidClass);
            button.disabled = true; 
        }
    }
    
    _setEventListeners() {
        const inputsList = this._form.querySelectorAll(this._config.inputSelector);
        const submitButton = this._form.querySelector(this._config.submitButtonSelector);
    
        inputsList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._setButtonState(submitButton, this._form.checkValidity());
            });
        });
    }
    
    enableValidation() {
            this._setEventListeners();
            this._form.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            
            const submitButton = this._form.querySelector(this._config.submitButtonSelector);
            this._setButtonState(submitButton, this._form.checkValidity());
        };
    resetValidation() {
        const inputsList = this._form.querySelectorAll(this._config.inputSelector);
        
        inputsList.forEach((input) =>{
            this._input = input;
            this._hideError(input); 
            
        });
        const button = this._form.querySelector(this._config.submitButtonSelector);
        this._setButtonState(button, false)
       }
       

}


 

 


 
 

