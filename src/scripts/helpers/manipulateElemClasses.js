export const elementAddErrorClass = elem => {
   if (!elem) return false
   elem.parentElement.classList.add(className)
   elem.classList.add(className)
   return true
}

export const elementRemoveErrorClass = elem => {
   if (!elem) return false
   elem.parentElement.classList.remove('_err');
   elem.classList.remove('_err');
   return true
}