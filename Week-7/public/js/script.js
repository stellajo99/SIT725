document.addEventListener('DOMContentLoaded', async () => {
    const catGallery = document.getElementById('catGallery');

    // Fetch cats from server
    const response = await fetch('/cats');
    const cats = await response.json();

    // Display cats
    cats.forEach((cat) => {
        const col = document.createElement('div');
        col.className = 'col s12 m6 l4';
        col.innerHTML = `
            <div class="card">
                <div class="card-image">
                    <img src="${cat.photo}" alt="${cat.name}">
                </div>
                <div class="card-content">
                    <p class="center-align">${cat.name}</p>
                </div>
            </div>
        `;
        catGallery.appendChild(col);
    });
});

let socket = io();
socket.on('number',(msg)=>{
    console.log('Random Number: ' + msg);
});