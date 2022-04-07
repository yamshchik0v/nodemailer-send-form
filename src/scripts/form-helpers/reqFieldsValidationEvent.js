import isInputValid from './isInputValid.js'
import { elementAddErrorClass, elementRemoveErrorClass } from './manipulateElemClasses.js'

export default function reqFieldsValidationEvent(reqElementsArr) {
   for (let elem of reqElementsArr) {
      elem.addEventListener('input', () => {

         if (isInputValid(elem)) {
            elementRemoveErrorClass(elem)
         } else {
            elementAddErrorClass(elem)
         }

      })
   }
}