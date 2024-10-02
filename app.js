document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showAllergenInfo, handleLocationError);
        } else {
            root.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showAllergenInfo(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        
        fetch(`/api/allergens?lat=${latitude}&lon=${longitude}`)
            .then(response => response.json())
            .then(data => {
                root.innerHTML = `
                    <h1>Allergen Information</h1>
                    <p>Location: ${data.location}</p>
                    <ul>
                        ${data.allergens.map(allergen => `<li>${allergen.name}: ${allergen.level}</li>`).join('')}
                    </ul>
                `;
            })
            .catch(error => {
                root.innerHTML = `Error fetching allergen data: ${error.message}`;
            });
    }

    function handleLocationError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                root.innerHTML = "User denied the request for Geolocation.";
                break;
            case error.POSITION_UNAVAILABLE:
                root.innerHTML = "Location information is unavailable.";
                break;
            case error.TIMEOUT:
                root.innerHTML = "The request to get user location timed out.";
                break;
            case error.UNKNOWN_ERROR:
                root.innerHTML = "An unknown error occurred.";
                break;
        }
    }

    const button = document.createElement('button');
    button.textContent = 'Get Allergen Information';
    button.addEventListener('click', getLocation);
    root.appendChild(button);
});