// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Select all menu icons (including for Resources and Theoretical)
    const menuIcons = document.querySelectorAll('.menu-icon');

    // Iterate over each menu icon and add click event listeners
    menuIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Get the parent list item that holds the label-container (theoretical, resources, or certificates)
            const listItem = this.closest('li');

            // Check for the container of theoretical, resources, or certificates labels
            const theoreticalContainer = listItem.querySelector('.theoretical-block-label-container');
            const resourcesContainer = listItem.querySelector('.resources-block-label-container');
            const certificatesContainer = listItem.querySelector('.block-label-container'); // For certificates & qualifications
            
            let labelContainer;
            let labelClass;

            // Determine which container the icon is associated with
            if (theoreticalContainer) {
                labelContainer = theoreticalContainer;
                labelClass = 'theoretical-block-label';
            } else if (resourcesContainer) {
                labelContainer = resourcesContainer;
                labelClass = 'resources-block-label';
            } 

            if (labelContainer) {
                // Get the last label of the appropriate container to attach the input field to
                const lastLabel = labelContainer.querySelector(`.${labelClass}:last-child`);

                // Check if the list item already has an input field
                const existingInput = listItem.querySelector('.edit-input'); // Only one input per list item

                // Toggle the input field (appear to the right of the last label)
                if (existingInput) {
                    // If the input field exists, remove it
                    existingInput.remove();
                } else {
                    // If the input field doesn't exist, create and append it to the list item (to the right of the last label)
                    const input = document.createElement('input');
                    input.classList.add('edit-input');
                    input.type = 'text';
                    input.placeholder = 'Enter new label...';
                    listItem.appendChild(input);
                    input.focus();

                    // Add event listener to add the label when the Enter key is pressed
                    input.addEventListener('keypress', function(event) {
                        if (event.key === 'Enter' && input.value.trim() !== '') {
                            // Create a new label with the text from the input
                            const newLabel = document.createElement('span');
                            newLabel.classList.add(labelClass);
                            newLabel.textContent = input.value.trim();

                            // Add the new label to the correct container (either theoretical, resources, or certificates)
                            labelContainer.appendChild(newLabel);

                            // Add a red X to the new label
                            const redX = document.createElement('span');
                            redX.textContent = '❌';
                            redX.classList.add('red-x');
                            newLabel.appendChild(redX);

                            // Add the event listener to delete the new label when the red X is clicked
                            redX.addEventListener('click', function(event) {
                                // Prevent event bubbling to avoid triggering the parent event listeners
                                event.stopPropagation();
                                newLabel.remove();
                            });

                            // Clear the input field
                            input.value = '';
                        }
                    });
                }

                // Iterate over each label in the container and toggle the red X
                const labels = labelContainer.querySelectorAll(`.${labelClass}`);
                labels.forEach(label => {
                    const existingX = label.querySelector('.red-x');
                    if (existingX) {
                        // If there is already a red X, remove it
                        existingX.remove();
                    } else {
                        // If there isn't a red X, add it
                        const redX = document.createElement('span');
                        redX.textContent = '❌';
                        redX.classList.add('red-x');
                        label.appendChild(redX);

                        // Add event listener to remove the label when the red X is clicked
                        redX.addEventListener('click', function(event) {
                            // Prevent event bubbling to avoid triggering the parent event listeners
                            event.stopPropagation();
                            label.remove();
                        });
                    }
                });
            }
        });
    });
});

