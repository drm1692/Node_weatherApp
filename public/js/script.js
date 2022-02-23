
const inputForm = document.querySelector('form');
const input = document.querySelector('input');
const message1 = document.querySelector('#msg1')
const message2 = document.querySelector('#msg2')
inputForm.addEventListener('submit', (e) => {

   e.preventDefault();
   const location = input.value;
   message1.textContent = 'Loading...'
   message2.textContent = ''
   fetch('http://localhost:3000/weather?address='+ location).then((response) => {

    response.json().then((data) => {
        if(data.error){

            return message1.textContent = data.error;
        }
        message1.textContent = data.location;
        message2.textContent = data.forecast;
    })
})

})