import "./index.css";

import { validationConfig } from "../scripts/utils/constants.js";

import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithQuestion from "../scripts/components/PopupWithQuestion.js";
import Api from "../scripts/utils/Api.js";

// Api - ask the server
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-19",
  headers: {
    authorization: "92a26d6c-40ed-4aca-ae57-01c4984e9943",
    "Content-Type": "application/json",
  },
});

//  //validate forms
const formEditProfile = document.querySelector(".popup__form_edit-profile");
const popupFormAddCard = document.querySelector(".popup__form_add-card");
const popupFormAvatarProfile = document.querySelector(
  ".popup__form_avatar-profile"
);

const editProfileFormValidator = new FormValidator(
  validationConfig,
  formEditProfile
);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(
  validationConfig,
  popupFormAddCard
);
addCardFormValidator.enableValidation();

const popupAvatarProfileValidator = new FormValidator(
  validationConfig,
  popupFormAvatarProfile
);
popupAvatarProfileValidator.enableValidation();

//  open popup of zoomed picture
const popupImageZoomed = new PopupWithImage(".popup_image");
popupImageZoomed.setEventListeners();

// open popup with the question of deleting card
const deleteCard = new PopupWithQuestion({
  popupSelector: ".popup_question",
  handleSubmitForm: ({ element, id }) => {
    const deleteElement = element;
    const idElement = id;
    api
      .deleteCard(idElement)
      .then(() => {
        deleteElement.remove();
        deleteCard.close();
      })
      .catch((err) => {
        alert(err);
      });
  },
});
deleteCard.setEventListeners();

//  intial cards

const initialCardsList = new Section(
  {
    renderer: ({ name, link, likes, cardId, owner, userId }) => {
      const card = new Card(
        { name, link, likes, cardId, owner, userId },
        ".element-template",
        {
          showPopupImage: ({ name, link }) => {
            popupImageZoomed.openImage({ name, link });
          },
          showPopupWithQuestion: ({ element, id }) => {
            deleteCard.open({ element, id });
          },
          likeCard: ({ cardId, method }) => {
            api
              .likeCard(cardId, method)
              .then((result) => {
                card.setLikes(result);
              })
              .catch((err) => {
                alert(err);
              });
          },
        }
      );
      const cardElement = card.generateCard();
      initialCardsList.addItem(cardElement);
    },
  },
  ".elements"
);

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cardData, userData]) => {
    const cards = cardData.map((item) => {
      return {
        name: item.name,
        link: item.link,
        likes: item.likes,
        cardId: item._id,
        owner: item.owner._id,
      };
    });

    initialCardsList.renderItems(cards, { userId: userData._id });
    userInfo.setUserInfo(userData);
  })
  .catch((err) => {
    alert(err);
  });

//a form which to add a new card
const addCardButton = document.querySelector(".profile__button-add");

const popupAddForm = new PopupWithForm({
  popupSelector: ".popup_add-card",
  handleSubmitForm: (inputValues) => {
    api
      .createNewCard(inputValues)
      .then((result) => {
        const card = new Card(
          {
            name: result.name,
            link: result.link,
            likes: result.likes,
            cardId: result._id,
            owner: result.owner._id,
            userId: result.owner._id,
          },
          ".element-template",
          {
            showPopupImage: ({ name, link }) => {
              popupImageZoomed.openImage({ name, link });
            },
            showPopupWithQuestion: ({ element, id }) => {
              deleteCard.open({ element, id });
            },
            likeCard: ({ cardId, method }) => {
              api
                .likeCard(cardId, method)
                .then((result) => {
                  card.setLikes(result);
                })
                .catch((err) => {
                  alert(err);
                });
            },
          }
        );
        const cardElement = card.generateCard();
        initialCardsList.addItem(cardElement);
        popupAddForm.close();
      })
      .finally(() => {
        popupAddForm.renderLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  },
});
// handlers to add new card and to open popup

popupAddForm.setEventListeners();
addCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  popupAddForm.open();
});

// Profile form
const avatarEdit = document.querySelector(".profile__overlay");

const editButton = document.querySelector(".profile__button-edit");
const fieldName = document.querySelector(".popup__input_enter_name");
const fieldDescription = document.querySelector(
  ".popup__input_enter_description"
);

const userInfo = new UserInfo({
  nameProfile: ".profile__title",
  jobProfile: ".profile__subtitle",
  avatarProfile: ".profile__avatar",
});

const popupEditForm = new PopupWithForm({
  popupSelector: ".popup_edit-profile",
  handleSubmitForm: (inputValues) => {
    api
      .renewUserInfo(inputValues)
      .then((result) => {
        userInfo.setUserInfo(result);
        popupEditForm.close();
      })
      .finally(() => {
        popupEditForm.renderLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  },
});
// avatar form
const popupAvatarForm = new PopupWithForm({
  popupSelector: ".popup_avatar-profile",
  handleSubmitForm: (inputValues) => {
    api
      .renewUserAvatar(inputValues)
      .then((result) => {
        userInfo.setUserInfo(result);
        popupAvatarForm.close();
      })
      .finally(() => {
        popupAvatarForm.renderLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  },
});
// handlers of the profile of edt and the avatar of edit
popupEditForm.setEventListeners();
popupAvatarForm.setEventListeners();

editButton.addEventListener("click", () => {
  const userProfile = userInfo.getUserInfo();
  fieldName.value = userProfile.name;
  fieldDescription.value = userProfile.about;
  editProfileFormValidator.resetValidation();
  popupEditForm.open();
});

avatarEdit.addEventListener("click", () => {
  popupAvatarProfileValidator.resetValidation();
  popupAvatarForm.open();
});
