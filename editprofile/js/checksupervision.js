document.addEventListener('DOMContentLoaded', function () {
    // Get all supervision block labels
    const supervisionLabels = document.querySelectorAll('.supervision-block-label');

    // Event listener for adding volunteer details
    const addVolunteerButton = document.querySelector('.volunteer-button'); // Select the volunteer button

    // Handle the click event on each supervision label
    supervisionLabels.forEach(label => {
        label.addEventListener('click', function () {
            const labelText = label.innerText.trim(); // Get the text of the clicked label

            // Check if the badge already exists
            let existingBadge = label.querySelector('.supervision-badge');

            if (existingBadge) {
                // If the badge exists, remove it (hide the badge)
                label.removeChild(existingBadge);
            } else {
                // Get supervisor data based on label text
                const supervisor = getSupervisorData(labelText);

                if (supervisor) {
                    // Create the badge HTML element
                    const badge = document.createElement('div');
                    badge.classList.add('supervision-badge');

                    // Create the content for the badge (name, age, picture)
                    const nameElement = document.createElement('span');
                    nameElement.classList.add('supervision-name');
                    nameElement.innerText = `Name: ${supervisor.name}`;

                    const ageElement = document.createElement('span');
                    ageElement.classList.add('supervision-age');
                    ageElement.innerText = `Age: ${supervisor.age}`;

                    const pictureElement = document.createElement('img');
                    pictureElement.classList.add('supervision-picture');
                    pictureElement.src = supervisor.picture ? supervisor.picture : 'default-profile-icon.png'; // Default icon if no picture is provided

                    // Append elements to badge
                    badge.appendChild(pictureElement);
                    badge.appendChild(nameElement);
                    badge.appendChild(ageElement);

                    // Add badge to the DOM (for simplicity, we append to the label itself)
                    label.appendChild(badge);
                }
            }
        });
    });

    // Function to get supervisor data based on the label text
    function getSupervisorData(labelText) {
        const supervisorData = {
            '1 Staff Member': {
                name: 'John Doe',
                age: '35',
                picture: 'staff.jpg',
            },
            '1 Parent': {
                name: 'Jane Smith',
                age: '30',
                picture: '',
            },
            '1 Volunteer': {
                name: 'Emily White',
                age: '22',
                picture: 'volunteer.jpg',
            },
        };

        return supervisorData[labelText];
    }

    // Listen for the volunteer button click and add the volunteer details
    if (addVolunteerButton) {
        addVolunteerButton.addEventListener('click', function () {
            // Get the input values from the input fields
            const nameInput = document.querySelector('input[name="volunteer-name"]');
            const ageInput = document.querySelector('input[name="volunteer-age"]');
            const pictureInput = document.querySelector('input[name="volunteer-picture"]');

            const name = nameInput.value;
            const age = ageInput.value;
            const picture = pictureInput.files.length > 0 ? pictureInput.files[0] : null;

            // Find the label for "1 Volunteer"
            const volunteerLabel = document.querySelector('.supervision-block-label:contains("1 Volunteer")');
            if (volunteerLabel) {
                // Remove existing badge if any
                let existingBadge = volunteerLabel.querySelector('.supervision-badge');
                if (existingBadge) {
                    volunteerLabel.removeChild(existingBadge);
                }

                // Create the badge for the new volunteer
                const badge = document.createElement('div');
                badge.classList.add('supervision-badge');

                // Add name, age, and picture to the badge
                const nameElement = document.createElement('span');
                nameElement.classList.add('supervision-name');
                nameElement.innerText = `Name: ${name}`;

                const ageElement = document.createElement('span');
                ageElement.classList.add('supervision-age');
                ageElement.innerText = `Age: ${age}`;

                const pictureElement = document.createElement('img');
                pictureElement.classList.add('supervision-picture');
                pictureElement.src = picture ? URL.createObjectURL(picture) : 'default-profile-icon.png';

                // Append elements to badge
                badge.appendChild(pictureElement);
                badge.appendChild(nameElement);
                badge.appendChild(ageElement);

                // Append badge to the volunteer label
                volunteerLabel.appendChild(badge);
            }

            // Optionally, clear the input fields after adding the volunteer
            nameInput.value = '';
            ageInput.value = '';
            pictureInput.value = '';
        });
    }
});

