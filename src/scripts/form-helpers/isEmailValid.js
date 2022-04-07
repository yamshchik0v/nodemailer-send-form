export default function isEmailValid(emailInputValue) {
   return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/.test(emailInputValue);
}