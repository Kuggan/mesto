import './index.css';

// import { validationConfig } from '../scripts/utils/constants.js';

import Card from '../scripts/components/Card.js';
// import FormValidator from '../scripts/components/FormValidator.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithQuestion from '../scripts/components/PopupWithQuestion.js';
import Api from '../scripts/utils/Api.js';

// Api - ask the server
const api = new Api({
  url:'https://mesto.nomoreparties.co/v1/cohort-19',
  headers: {
    authorization: '92a26d6c-40ed-4aca-ae57-01c4984e9943',
    'Content-Type': 'application/json'
  }
  
});


    
     //validate forms
    //  const formEditProfile = document.querySelector('.popup__form_edit-profile');
    //  const popupFormAddCard = document.querySelector('.popup__form_add-card');
    //  const popupAvatarProfile = document.querySelector('.popup_avatar-profile');

    //  const editProfileFormValidator = new FormValidator(validationConfig, formEditProfile);
    //  editProfileFormValidator.enableValidation();

    //  const addCardFormValidator = new FormValidator(validationConfig, popupFormAddCard);
    //  addCardFormValidator.enableValidation();

    //  const popupAvatarProfileValidator = new FormValidator( validationConfig, popupAvatarProfile);
    //  popupAvatarProfileValidator.enableValidation();

       //  open popup of zoomed picture
        

        function showPopupImage({name, link}) {
          const popupImageZoomed = new PopupWithImage('.popup_image');
           popupImageZoomed.openImage({name, link});
           popupImageZoomed.setEventListeners();
        }

      
     // open popup with the question

     function showPopupWithQuestion({element, id}) {
      const deleteElement = element;
      const idElement = id;
      const deleteCard = new PopupWithQuestion({
               popupSelector: '.popup_question',
               handleSubmitForm: () => {
                 api.deleteCard(idElement)
                   .then((result) => {
                    
                     deleteElement.remove();
                 })
               }
       });
       deleteCard.setEventListeners();
       deleteCard.open()
       
             
     }
     
     // set a like

     function likeCard({element, cardId, method}) {
       api.likeCard(cardId, method)
         .then((result)=>{
           element.querySelector('.element__heart').classList.toggle('element__heart_active');
           element.querySelector('.element__counter').textContent = result.likes.length;
         })
       }



     const initialCardsList = new Section ({
           renderer: ({name, link, likes, cardId, owner, userId}) => {
           const card = new Card({name, link, likes, cardId, owner, userId}, '.element-template', showPopupImage, showPopupWithQuestion, likeCard );
           const cardElement = card.generateCard();
           initialCardsList.addItem(cardElement);
         }
       },'.elements');

       Promise.all([api.getInitialCards(), api.getUserInfo()])
         .then (([cardData, userData]) => {
            const cards = cardData.map(item => {
              return {
                name: item.name,
                link: item.link,
                likes: item.likes,
                cardId: item._id,
                owner: item.owner._id
              }
            });
            initialCardsList.renderItems(cards, {userId: userData._id});
            userInfo.setUserInfo(userData);
            avatarUser.src = userData.avatar;
          });

       //a form which to add a new card
     const addCardButton = document.querySelector('.profile__button-add');

     const popupAddForm = new PopupWithForm({
       popupSelector: '.popup_add-card',
       handleSubmitForm: (inputValues)=>{
         api.createNewCard(inputValues)
         .then((result)=>{
           const card = new Card({
             name: result.name,
             link: result.link,
             likes: result.likes,
             cardId: result._id,
             owner: result.owner._id,
             userId: result.owner._id
           }, '.element-template', showPopupImage, showPopupWithQuestion, likeCard);
           const cardElement = card.generateCard();
           initialCardsList.addItem(cardElement);
           
         })
         .finally(()=>{
           popupAddForm.renderLoading(false);
           popupAddForm.close();
         })
        
       }

     });
      // handlers to add new card and to open popup
     
     popupAddForm.setEventListeners();
     addCardButton.addEventListener('click', ()=>{
      //  addCardFormValidator.resetValidation();
       popupAddForm.open()
     });

            // Profile form
     const avatarEdit = document.querySelector('.profile__overlay');
     const avatarUser = document.querySelector('.profile__avatar');
     const editButton = document.querySelector('.profile__button-edit');
     
     const fieldName = document.querySelector('.popup__input_enter_name');
     const fieldDescription = document.querySelector('.popup__input_enter_description');

     const userInfo = new UserInfo({nameProfile: '.profile__title', jobProfile: '.profile__subtitle'});

     const popupEditForm = new PopupWithForm({
       popupSelector: '.popup_edit-profile',
       handleSubmitForm: (inputValues) => {
         api.renewUserInfo(inputValues)
           .then((result) => {
             userInfo.setUserInfo(result);          
           })
           .finally(() => {
             popupEditForm.renderLoading(false);
             popupEditForm.close();
           })
           
       }
     });
          // avatar form
     const popupAvatarForm = new PopupWithForm({
       popupSelector: '.popup_avatar-profile',
       handleSubmitForm: (inputValues) => {
         api.renewUserAvatar(inputValues)
            .then((result) => {
             avatarUser.src = result.avatar;
            })
           .finally(() => {
             popupAvatarForm.renderLoading(false);
             popupAvatarForm.close();
           })
           
       }
     });
      // handlers of the profile of edt and the avatar of edit
     popupEditForm.setEventListeners();
     popupAvatarForm.setEventListeners();

     editButton.addEventListener('click', ()=>{
       const userProfile = userInfo.getUserInfo();
       fieldName.value = userProfile.name;
       fieldDescription.value = userProfile.about;
        // editProfileFormValidator.resetValidation();
        popupEditForm.open();
     });
      
     avatarEdit.addEventListener('click', ()=>{
      // popupAvatarProfileValidator.resetValidation();
      popupAvatarForm.open();
     });

  
  // .catch(err=>{
  //   alert(err);
  // });
      
//        // Profile form
//      const avatarEdit = documnet.querySelector('.profile__overlay');
//      const avatarUser = document.querySelector('.profile__avatar');
//      const editButton = document.querySelector('.profile__button-edit');
     
//      const fieldName = document.querySelector('.popup__input_enter_name');
//      const fieldDescription = document.querySelector('.popup__input_enter_description');

//      const userInfo = new UserInfo({nameProfile: '.profile__title', jobProfile: '.profile__subtitle'});

//      const popupEditForm = new PopupWithForm({
//        popupSelector: '.popup_edit-profile',
//        handleSubmitForm: (inputValues) => {
//          api.renewUserInfo(inputValues)
//            .then((result) => {
//              userInfo.setUserInfo(result);
//              popupEditForm.close();
//              console.log(result)
//            })
//            .finally(() => {
//              popupEditForm.renderLoading(false);
//            })
//            .catch((err) => {
//              alert(err);
//            });
//        }
//      });
    
//      // avatar form
//      const popupAvatarForm = new PopupWithForm({
//        popupSelector: '.popup_avatar-profile',
//        handleSubmitForm: (inputValues) => {
//          api.renewUserAvatar(inputValues)
        
//            .then((result) => {
             
//              avatarUser.src = result.avatar;
//              popupAvatarForm.close();
//            })
//            .finally(() => {
//              popupAvatarForm.renderLoading(false);
//            })
//            .catch((err) => {
//              alert(err);
//            });
//        }
//      });
    
//       

//          // popup with question to delete card
//      const deleteCard = new PopupWithQuestion({
//        popupSelector: '.popup_question',
//        handleSubmitForm: ({element, id}) => {
//          const deleteElement = element;
//          const idElement = id;
//          api.deleteCard(idElement)
//            .then((result) => {
//              deleteElement.remove();
//              deleteCard.close();
//            })
//            .catch((err) => {
//              alert(err);
//            });
//        }
//      });

//      // open popup with the question

//      function showPopupWithQuestion({element, id}) {
//        deleteCard.open({element, id});
//      }
      
//      // set a like

//      function likeCard({element, cardId, method}) {
//        api.likeCard(cardId, method)
//          .then((result)=>{
//            element.querySelector('.element__heart').classList.toggle('.element__heart_active');
//            element.querySelector('.element__counter').textContent = result.likes.length;
//          })
//          .catch(err =>{
//            alert(err);
//          });
//        }
  


//      //a form which to add a new card
//      const addCardButton = document.querySelector('.profile__button-add');

//      const popupAddForm = new PopupWithForm({
//        popupSelector: '.popup_add-card',
//        handleSubmitForm: (inputValues)=>{
//          api.createNewCard(inputValues)
//          .then((result)=>{
//            const card = new Card({
//              name: result.name,
//              link: result.link,
//              likes: result.likes,
//              cardId: result._id,
//              owner: result.owner._id,
//              userId: userData._id
//            }, '.element-template', showPopupImage, showPopupWithQuestion, likeCard);
//            const cardElement = card.generateCard();
//            initialCardsList.addItemPrepend(cardElement);
//            popupAddForm.close();
//          })
//          .finally(()=>{
//            popupAddForm.renderLoading(false);
//          })
//          .catch(err=>{
//            alert(err);
//          })
//        }

//      });
        
              

     
    


//      // handlers of zoomed and delete card
//      popupImageZoomed.setEventListeners();
//      deleteCard.setEventListeners();

//      // handlers to add new card and to open popup
     
//      popupAddForm.setEventListeners();
//      addCardButton.addEventListener('click', ()=>{
//       //  addCardFormValidator.resetValidation();
//        popupAddForm.open()
//      });
//      // handlers of the profile of edt and the avatar of edit
//      popupEditForm.setEventListeners();
//      popupAvatarForm.setEventListeners();

    

//      editButton.addEventListener('click', ()=>{
//        const userProfile = userInfo.getUserInfo();
//        fieldName.value = userProfile.name;
//        fieldDescription.value = userProfile.about;
//       //  editProfileFormValidator.resetValidation();
//        popupEditForm.open();
     
//      });

//      avatarEdit.addEventListener('click', ()=>{
//       //  popupAvatarProfileValidator.resetValidation();
//        popupAvatarForm.open();
      
//     });
// // get initial cards from the server


 
  
 