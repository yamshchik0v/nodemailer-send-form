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

   const modalTerms = new Modal(projectModals.modalTerms);
   const modalServErr = new Modal(projectModals.modalServerErr);
   const modalSuccess = new Modal(projectModals.modalSuccess);
   const modalFormErr = new Modal(projectModals.modalFormErr);
   const modalImage = new Modal(projectModals.modalImage);

   termsOfPersonalDataLink.addEventListener('click', (e) => {
      e.preventDefault();
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
         }).catch((err) => {
            console.error(err)
            modalServErr.open();
         })

         if (response.ok) {
            form.classList.remove('_sending')
            form.reset()
            imagePreviewElem.innerHTML = '';
            modalSuccess.open();
            return
         }
         else {
            form.classList.remove('_sending')
            modalServErr.open();
            return
         }
      }
      else {
         modalFormErr.open();
         return
      }
   }


   formImage.addEventListener('change', () => {
      uploadImage(formImage.files[0]);
   })

   function uploadImage(image) {
      if (!['image/jpeg', 'image/png', 'image/gif', 'image/jpg'].includes(image.type)) {
         formImage.value = '';
         modalImage.open()
         return false;
      }

      if (image.size > 2 * 1024 * 1024) {
         modalImage.open()
         return false;
      }

      let reader = new FileReader();
      reader.addEventListener('load', (e) => {
         imagePreviewElem.innerHTML = `<img src="${e.target.result}" alt="Image">`
      })
      reader.addEventListener('error', () => {
         modalImage.open();
      })
      reader.readAsDataURL(image)
      return image
   }
})