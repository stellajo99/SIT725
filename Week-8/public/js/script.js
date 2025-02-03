document.addEventListener('DOMContentLoaded', async () => {
    const catGallery = document.getElementById('catGallery');
    const catForm = document.getElementById('catForm'); // Get the form

    // Fetch and display existing cats
    const response = await fetch('/cats');
    const cats = await response.json();

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

    // Handle form submission to prevent redirect
    catForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Stop the form from redirecting

        // Get form values
        const formData = new FormData(catForm);
        const name = formData.get("name");
        const photo = formData.get("photo");

        if (!name || !photo) {
            alert("Please enter a name and a photo URL!");
            return;
        }

        try {
            // Send data to the backend
            const response = await fetch('/add-cat', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, photo })
            });

            if (response.ok) {
                alert("Cat added successfully!");
                window.location.reload(); // Refresh the page to show the new cat
            } else {
                alert("Failed to add cat.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while adding the cat.");
        }
    });
});

let socket = io();
socket.on('number', (msg) => {
    console.log('Random Number: ' + msg);
});
