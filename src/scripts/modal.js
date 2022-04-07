export default class Modal {
   constructor(props = { locationElem: document.body, title: 'no title', message: 'no message', button: 'just button' }) {
      this.locationElem = props.locationElem || document.body;
      this.title = props.title || 'no title';
      this.message = props.message || 'no message';
      this.buttonText = props.buttonText || 'just button';
      this.modalElem = document.createElement('section');
      this.modalElem.classList.add('modal-container');
   }

   render() {
      this.modalElem.innerHTML =
         `<div class="modal-window">
            <h2 class="modal-title">${this.title}</h2>
            <p class="modal-message">${this.message}</p>
            <button class="modal-button" data-modal-close>${this.buttonText}</button>
         </div>`
      this.buttonElem = this.modalElem.querySelector('[data-modal-close]')
      this.modalElem.addEventListener('click', (e) => {
         e.stopPropagation()
         console.log(e.target)
         this.close()
      })
      // this.buttonElem.addEventListener('click', this.close)
      this.locationElem.append(this.modalElem)
   }
   open() {
      this.modalElem.classList.add('modal-show')
   }

   close() {
      this.modalElem.classList.remove('modal-show')
   }
   destroy() {
      this.modalElem.parentNode.removeChild(this.modalElem)

   }
}
/*
TODO: 
* добавить ф-цию destroy(), который будет удалять из ДОМа узел модалки и снимать слушать
* добавить листенер для закрытия модалки при нажатии на бг 
* передавать пропсы в опен  для  ререндера модального окна (?)
*/
