import isFormValid from './form-helpers/isFormValid.js';
import reqFieldsValidationEvent from './form-helpers/reqFieldsValidationEvent.js';
import Modal from './modal.js';

document.addEventListener('DOMContentLoaded', () => {
   const form = document.getElementById('form');
   const formImage = document.getElementById('formImage');
   const imagePreviewElem = document.getElementById('imagePreviewElem');
   const requiredElements = form.querySelectorAll('._required')
   const termsOfPersonalDataLink = document.getElementById('termsOfPD')
   const termsModal = new Modal({
      locationElem: document.body,
      title: 'Terms of the personal data and information processing',
      message: `'1. lalala 
      2. blablabla
      3. abasdfas'`,
      buttonText: 'Ok ;)'
   })
   termsModal.render()
   termsOfPersonalDataLink.addEventListener('click', (e) => {
      e.preventDefault();
      termsModal.open()
   })
   const modalSuccess = new Modal({
      locationElem: document.body,
      title: 'Successfully sent!',
      message: 'Your message has been successfully sent. Chek your Email',
      buttonText: 'Ok ;)'
   })
   const modalServerError = new Modal({
      locationElem: document.body,
      title: 'Server error',
      message: 'Server didn\'t response',
      buttonText: 'Ok :('
   })
   const modalFormError = new Modal({
      locationElem: document.body,
      title: 'Form error',
      message: 'Please, fill required fields',
      buttonText: 'Ok :('
   })
   modalSuccess.render()
   modalServerError.render()
   modalFormError.render()

   reqFieldsValidationEvent(requiredElements)
   form.addEventListener('submit', sendForm);

   async function sendForm(e) {
      e.preventDefault();
      const isFieldsOk = isFormValid(requiredElements)
      const formData = new FormData(form);
      if (!isFieldsOk) {
         modalFormError.open()
         return
      }
      else {
         form.classList.add('_sending')
         let response = await fetch('http://localhost:3000/index', {
            method: 'POST',
            body: formData
         })

         if (response.ok) {
            form.classList.remove('_sending')
            form.reset()
            imagePreviewElem.innerHTML = '';
            modalSuccess.open()
            return
         }
         else {
            form.classList.remove('_sending')
            modalError.open()
            return
         }
      }
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
      return image
   }
})