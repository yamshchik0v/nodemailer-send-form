export default function isEmailValid(input) {
   return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/.test(input.value);
}