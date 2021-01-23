export default class UserInfo {
    constructor({nameProfile, jobProfile, avatarProfile}){
        this._nameProfile = document.querySelector(nameProfile);
        this._jobProfile = document.querySelector(jobProfile);
        this._avatarProfile = document.querySelector(avatarProfile);
    }
    getUserInfo(){
        const name = this._nameProfile.textContent;
        const job = this._jobProfile.textContent;
        const avatar = this._avatarProfile.src;
        const profile ={
            name: name,
            about: job,
            avatar: avatar
        }
        return profile;
    }
    setUserInfo(inputValues){
        this._nameProfile.textContent = inputValues.name;
        this._jobProfile.textContent = inputValues.about;
        this._avatarProfile.src = inputValues.avatar;

    }
}
  