import isInputValid from './isInputValid.js';
import { elementAddErrorClass, elementRemoveErrorClass } from './manipulateElemClasses.js';

export default function isFormValid(formRequiredElements) {
   let errorCounter = 0

   if (formRequiredElements.length > 0) {

      for (let requiredChildElem of formRequiredElements) {

         if (isInputValid(requiredChildElem)) {
            elementRemoveErrorClass(requiredChildElem)
         } else {
            elementAddErrorClass(requiredChildElem)
            errorCounter++
         }

      }

   }
   return errorCounter === 0
}