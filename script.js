const scriptURL = 'YOUR_WEB_APP_URL_HERE'; // Replace with your Web App URL
const form = document.forms['google-sheet'];

form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(scriptURL, {
        method: 'POST',
        body: new FormData(form),
        mode: 'no-cors', // Add this to avoid CORS errors
    })
        .then(() => {
            alert('Thanks for Contacting us! We will get back to you soon.');
            form.reset();
        })
        .catch((error) => {
            alert('Error!', error.message);
        });
});