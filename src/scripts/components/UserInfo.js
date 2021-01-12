export default class UserInfo {
    constructor({nameProfile, jobProfile}){
        this._nameProfile = document.querySelector(nameProfile);
        this._jobProfile = document.querySelector(jobProfile);
    }
    getUserInfo(){
        const name = this._nameProfile.textContent;
        const job = this._jobProfile.textContent;
        const profile ={
            name: name,
            job: job 
        }
        return profile;
    }
    setUserInfo(inputValues){
        this._nameProfile.textContent = inputValues.name;
        this._jobProfile.textContent = inputValues.job;

    }
}
  