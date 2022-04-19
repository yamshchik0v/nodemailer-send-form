import isFormValid from './form-helpers/isFormValid.js';
import reqFieldsValidationEvent from './form-helpers/reqFieldsValidationEvent.js';
import projectModals from './modal/projectModals.js';
import Modal from './modal/Modal.js';

document.addEventListener('DOMContentLoaded', () => {
   const form = document.getElementById('form');
   const formImage = document.getElementById('formImage');
   const imagePreviewElem = document.getElementById('imagePreviewElem');
   const requiredElements = form.querySelectorAll('._required');
   const termsOfPersonalDataLink = document.getElementById('terms');

   termsOfPersonalDataLink.addEventListener('click', (e) => {
      e.preventDefault();
      const modalTerms = new Modal(projectModals.modalTerms);
      modalTerms.open();
   })

   reqFieldsValidationEvent(requiredElements)
   form.addEventListener('submit', sendForm);

   async function sendForm(e) {
      e.preventDefault();
      const isFieldsOk = isFormValid(requiredElements)
      const formData = new FormData(form);
      if (isFieldsOk) {
         form.classList.add('_sending')
         let response = await fetch('http://localhost:3000/index', {
            method: 'POST',
            body: formData
         })

         if (response.ok) {
            form.classList.remove('_sending')
            form.reset()
            imagePreviewElem.innerHTML = '';
            const modalSuccess = new Modal(projectModals.modalSuccess);
            modalSuccess.open();
            return
         }
         else {
            form.classList.remove('_sending')
            const modalServErr = new Modal(projectModals.modalServErr);
            modalServErr.open();
            return
         }
      }
      else {
         const modalFormErr = new Modal(projectModals.modalFormErr);
         modalFormErr.open();
         return
      }
   }


   formImage.addEventListener('change', () => {
      uploadImage(formImage.files[0]);
   })

   function uploadImage(image) {
      if (!['image/jpeg', 'image/png', 'image/gif', 'image/jpg'].includes(image.type)) {
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
         const modalImage = new Modal(projectModals.modalImage);
         modalImage.open();
      })
      reader.readAsDataURL(image)
      return image
   }
})