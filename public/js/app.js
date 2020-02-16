console.log("CLIENT SIDE JAVASCRIPT IS LOADED!");

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const myLocation = search.value

    fetch('http://localhost:3000/weather?address=' + myLocation).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log(data.location + " " + data.forecast);
            }
        });
    });
})