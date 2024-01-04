// add event listener that loads DOM content after HTML document has loaded
document.addEventListener('DOMContentLoaded', () => {
    // select HTML element with the class Animal-list and assign it a variable
    const animalList = document.querySelector('.animal-list');
    // select HTML element with the class Animal-details and assign it a variable
    const animalDetails = document.querySelector('.animal-details');
    let selectedAnimal = null;

    // Function to create an individual card for each animal
    function createAnimalCard(animal) {
        const card = document.createElement('div');
        // add the animal card to the div
        card.classList.add('animal-card');

        const img = document.createElement('img');
        // Set the src attribute of the img element to the URL
        img.src = animal.image;
        img.alt = animal.name;
        // Add a class to the animal name for event handling
        const name = document.createElement('h3');
        // add animal name to h3
        name.textContent = animal.name;

        //create a button and assign it a variable name
        const voteButton = document.createElement('button');
        voteButton.classList.add('vote-button');
        voteButton.textContent = `Vote (${animal.votes})`;

        //add event listener that increments votes when clicked
        voteButton.addEventListener('click', () => {
            // Increment the vote count and update the button text
            animal.votes++;
            voteButton.textContent = `Vote (${animal.votes})`;
        });

        // create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'Delete Vote';
        // add an event listener that decrements votes when clicked
        deleteButton.addEventListener('click', () => {
            // Decrement the vote count and update the button text
            if (animal.votes > 0) {
                animal.votes--;
                voteButton.textContent = `Vote (${animal.votes})`;
            }
        });

        // Add the image to the card
        card.appendChild(img);
        // Add the name to the card
        card.appendChild(name);
        // Add the vote button to the card
        card.appendChild(voteButton);
        // Add the delete button to the card
        card.appendChild(deleteButton);

        // Add a click event listener to the animal card for details
        card.addEventListener('click', () => {
            // Check if this animal is already selected; if not, display its details
            if (selectedAnimal !== animal) {
                // Clear the animal details container
                animalDetails.innerHTML = '';

                // Fetch details for the selected animal from the API
                fetch(`http://localhost:3000/characters/${animal.id}`)
                    .then((response) => response.json())
                    .then((animalData) => {
                        // Create elements to display the details
                        const detailsImg = document.createElement('img');
                        detailsImg.src = animalData.image;
                        detailsImg.alt = animalData.name;

                        // create a p element that displays number of votes
                        const detailsVotes = document.createElement('p');
                        detailsVotes.textContent = `Votes: ${animalData.votes}`;

                        // Append the details elements to the animal details container
                        animalDetails.appendChild(detailsImg);
                        animalDetails.appendChild(detailsVotes);

                        // Update the selected animal
                        selectedAnimal = animal;
                    })
                    // provides error when element is not found
                    .catch((error) => {
                        console.error('Error fetching animal details:', error);
                    });
            }
        });

        return card;
    }

    // Function to fetch and display the list of animals from db.json
    function fetchAndDisplayAnimals() {
        fetch('http://localhost:3000/characters')
            .then((response) => response.json())
            .then((animals) => {
                // Populate the animal list
                animals.forEach((animal) => {
                    const card = createAnimalCard(animal);
                    animalList.appendChild(card);
                });
            })
            // return error when data is not found
            .catch((error) => {
                console.error('Error fetching animal data:', error);
            });
    }

    // Call the function to fetch and display the list of animals
    fetchAndDisplayAnimals();
});