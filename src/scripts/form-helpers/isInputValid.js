import isEmailValid from './isEmailValid.js'

export default function isInputValid(inputElement) {

   if (inputElement.classList.contains('_email')) {
      if (!isEmailValid(inputElement.value)) {
         return false
      }
   }

   if (inputElement.getAttribute('type') === 'checkbox' && !inputElement.checked) {
      return false
   }

   if (inputElement.value === '') {
      return false
   }

   return true
}