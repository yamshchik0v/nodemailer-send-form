export const elementAddErrorClass = elem => {
   if (!elem) return false
   elem.parentElement.classList.add('_err')
   elem.classList.add('_err')
   return true
}

export const elementRemoveErrorClass = elem => {
   if (!elem) return false
   elem.parentElement.classList.remove('_err');
   elem.classList.remove('_err');
   return true
}