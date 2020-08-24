console.log("Client Side Js is loaded");
//how fetch works
// fetch('https://puzzle.mead.io/puzzle').then((res)=>{
//     res.json().then((data)=>{
//         console.log(data);
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#msg-1')
const message2 = document.querySelector('#msg-2')
//to send back result use
//textcontent
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value
    message1.textContent = 'Loading...'
    message2.textContent = ''
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error);
                message1.textContent=data.error
            }
            else{
                console.log(data.location);
                console.log(data.forecastData);
                message1.textContent = data.location
                message2.textContent = data.forecastData
            }
        })
    })
})