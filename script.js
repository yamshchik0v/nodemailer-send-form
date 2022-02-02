document.addEventListener('DOMContentLoaded', () => {
   const form = document.getElementById('form');
   form.addEventListener('submit', sendForm)

   async function sendForm(e) {
      e.preventDefault();

      let error = formValidate(form)
   }

})