export default function isFormValid(formElem, requieredClassName) {
   const formChildren = formElem.querySelectorAll(requieredClassName)
   if (formChildren.length > 0) {

      return false
   }


   return formChildren
}