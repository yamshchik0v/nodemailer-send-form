document.addEventListener('DOMContentLoaded', () => {
   const form = document.getElementById('form');

   const formImage = document.getElementById('formImage');
   const imagePreviewElem = document.getElementById('imagePreviewElem');

   form.addEventListener('submit', sendForm);
   
   async function sendForm(e) {
      e.preventDefault();

      const hasFormErrs = howMuchErrsInForm(form) > 0;

      const formData = new FormData(form);
      // formData.append('image', formImage.files[0])
      

      if (hasFormErrs) {
         console.error('Errors in form!');
         return
      }
      else {
         form.classList.add('_sending')

         let response = await fetch('http://localhost:3000/index', {
            method: 'POST',
            body: formData
         })
         let result = await response.json()

         if (response.ok) {
            form.classList.remove('_sending')
            form.reset()
            imagePreviewElem.innerHTML = '';
            
            console.log(formData)
            console.log(result)
            return
         }
         else {            
            form.classList.remove('_sending')
            console.error('FAILED TO SEND');
            return
         }
      }
   }

   function howMuchErrsInForm(form) {
      let errors = 0;
      const formRequired = document.querySelectorAll('._required');

      
      for (let i = 0; i < formRequired.length; i++) {
         const requiredElement = formRequired[i];
         elementRemoveErrorClass(requiredElement);

         requiredElement.addEventListener('input', (e) => {

            if (requiredElement.getAttribute('type') === 'checkbox' && requiredElement.checked) {
               elementRemoveErrorClass(requiredElement)
            }
            else {
               elementRemoveErrorClass(requiredElement)
            }
         })

         if (requiredElement.classList.contains('_email')) {
            if (isEmailValid(requiredElement === false)){
               elementAddErrorClass(requiredElement);
               errors++;
            }
            
         } 
         if (requiredElement.getAttribute('type') === 'checkbox' && requiredElement.checked === false) {
            elementAddErrorClass(requiredElement);
            errors++;
         }
         
         if (requiredElement.value === '') {
            elementAddErrorClass(requiredElement);
            errors++;
         }

         
         
         
      }
      return errors
   }
      function elementAddErrorClass(elem) {
         elem.parentElement.classList.add('_err');
         elem.classList.add('_err');
      }
      function elementRemoveErrorClass(elem) {
         elem.parentElement.classList.remove('_err');
         elem.classList.remove('_err');
      }

      function isEmailValid(input) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/.test(input.value);
      }

      formImage.addEventListener('change', () => {
         uploadImage(formImage.files[0]);
      })

      function uploadImage(image) {
         if (!['image/jpeg', 'image/png', 'image.gif'].includes(image.type)) {
            console.error('Please, add an image file. Only .png, .jpg, .gif extensions are enabled');
            formImage.value = '';
            return false;
         }
         
         if (image.size > 2 * 1024 * 1024) {
            console.error('File must be lesser than 2MB');
            return false;
         }      

         let reader = new FileReader();
         reader.addEventListener('load', (e) => {
            imagePreviewElem.innerHTML = `<img src="${e.target.result}" alt="Image">`
         })
         reader.addEventListener('error', () => {
            console.error('an error occurred while loading the image')
         })
         reader.readAsDataURL(image)
      }
})