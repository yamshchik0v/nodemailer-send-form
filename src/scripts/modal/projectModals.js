export default {
   modalTerms: {
      title: 'Terms of the personal data and information processing:',
      messageHTML: `
         <ol style="padding-left:20px">
            <li>
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni ipsa at, incidunt praesentium dolor sunt tempora unde aut laudantium excepturi, ipsam illum quaerat, quos quis?
            </li>
            <li>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus porro obcaecati ipsa enim.
            </li>
            <li>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut expedita, nisi earum quae delectus, iusto debitis commodi cum, non modi consequuntur necessitatibus accusamus! Nam debitis praesentium quae!
            </li>
         </ol>
      `,
      button: {
         styleType: 'modal-terms',
         text: 'Close ☑️'
      }
   },

   modalFormErr: {
      title: 'Invalid Form',
      messageHTML: `
         <p>Plese fill all required inputs</p>
      `,
      button: {
         styleType: 'modal-form-err',
         text: 'Ok 👌🏻'
      }
   },

   modalSuccess: {
      title: 'Success!',
      messageHTML: `
         <p>Your message\'ve been successfully sent.
         </p> <p>Please check your Email</p>
      `,
      button: {
         styleType: 'modal-form-succsess',
         text: 'Send more'
      }
   },

   modalServerErr: {
      title: 'Server error',
      messageHTML: `
         <p>Unfortunately your message wasn\'t send,</p>
         <p> Please try again later</p>
      `,
      button: {
         styleType: 'modal-form-err',
         text: 'Ok :('
      }
   },
   modalImage: {
      title: 'Image error',
      messageHTML: `
         <p>An error occurred while loading the image</p>
      `,
      button: {
         styleType: 'modal-form-err',
         text: 'Ok :('
      }
   }
}

