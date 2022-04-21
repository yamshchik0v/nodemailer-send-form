export default class Modal {

   constructor(props = { title, messageHTML, button: { styleType, text } }) {
      this.modal = this.createModal(props);
      this.destroyed = false;
   }

   createModal(props) {
      const modal = document.createElement('section');
      modal.classList.add('modal-container');
      modal.dataset.modalClose = true
      modal.insertAdjacentHTML('afterbegin', `
               <div class="modal-window">
                  <h2 class="modal-title">${props.title || 'Modal window'}</h2>
                  ${props.messageHTML || ''}
                  <button class="modal-button ${props.button.styleType}" data-modal-close="true">${props.button.text}</button>
               </div>
      `);
      modal.addEventListener('click', this.handlers)
      return modal
   }

   handlers = (e) => {
      if (e.target.dataset.modalClose) {
         this.close()
      }
   }

   open() {
      if (this.destroyed) {
         return console.error('Modal is destroyed')
      }
      document.body.style.overflow = 'hidden';
      document.body.append(this.modal);
      setTimeout(() => {
         this.modal.classList.add('modal-show')
      }, 140)
   }

   close() {
      this.modal.classList.remove('modal-show');
      document.body.style.overflow = 'auto';
      setTimeout(() => {
         this._destroyModal()
      }, 140)

   }

   _destroyModal() {
      this.destroyed = true;
      this.modal.removeEventListener('click', this.handlers)
      this.modal.parentNode.removeChild(this.modal);
      return 'Modal destroyed'
   }
}