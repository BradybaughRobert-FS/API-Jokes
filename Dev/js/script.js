// Wrap everything in an IIFE to prevent global scope pollution
(function() {
    // Define the API URL with the required parameters
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart';

    // Function to fetch jokes from the API
    function fetchJoke() {
        // Fetch jokes from the API
        fetch(apiUrl)
            .then(response => {
                // Check if the response is successful
                if (!response.ok) {
                    throw new Error('Failed to fetch joke.');
                }
                // Parse the JSON response
                return response.json();
            })
            .then(data => {
                // Check if the joke is a two-part joke
                if (data.type === 'twopart') {
                    // Update the joke text with the setup and delivery
                    document.getElementById('joke-text').innerHTML = `${data.setup}<br>${data.delivery}`;
                } else {
                    // Update the joke text with the single part joke
                    document.getElementById('joke-text').innerHTML = data.joke;
                }
            })
            .catch(error => {
                // Log any errors to the console
                console.error('Error fetching joke:', error.message);
                // Display an error message to the user
                document.getElementById('joke-text').innerHTML = 'Failed to fetch joke. Please try again later.';
            });
    }

    // Function to initialize the joke fetching process
    function init() {
        // Fetch a joke when the page loads
        fetchJoke();

        // Add event listener to the button to fetch another joke
        document.getElementById('load-joke-btn').addEventListener('click', fetchJoke);
    }

    // Call the init function when the DOM content is loaded
    document.addEventListener('DOMContentLoaded', init);
})();
