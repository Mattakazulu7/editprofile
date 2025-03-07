document.addEventListener('DOMContentLoaded', function() {
    const addonItems = document.querySelectorAll('.addon-item');
    const bookNowButton = document.getElementById('book-now');
    const calendar = document.getElementById('calendar');
    const dateGrid = document.querySelector('.date-grid');
    const addonSelectedContainer = document.getElementById('addon-selected-container');
    const addonsContainer = document.getElementById('addons-list'); // The original addons list

    // Function to toggle the position of an addon item between the original container and the selected container
    function toggleAddonPosition(event) {
        const clickedAddon = event.target;
        
        // If the clicked addon is currently in the selected container, move it back to the addon container
        if (clickedAddon.parentElement === addonSelectedContainer) {
            addonItems.forEach(item => {
                if (item.id === clickedAddon.id) {
                    // Append the item back to the addon list
                    addonsContainer.appendChild(clickedAddon);
                    clickedAddon.style.position = ''; // Reset styling
                    clickedAddon.style.top = '';
                }
            });
        } else {
            // Otherwise, move the clicked addon to the selected container
            addonSelectedContainer.appendChild(clickedAddon);
            clickedAddon.style.position = 'relative';
            clickedAddon.style.top = `${addonSelectedContainer.children.length * 1}px`; // Stack vertically in selected container
        }

        // Update the positions of the add-ons in both the selected container and the original container
        updateLayout();
    }

    // Function to update the positions of add-ons and layout
    function updateLayout() {
        let stackedAddonsAbove = addonSelectedContainer.children.length; // Count the number of add-ons in the selected container

        // Adjust positions of addons inside the selected container
        Array.from(addonSelectedContainer.children).forEach(function(item, index) {
            item.style.position = 'relative';
            item.style.top = `${index * 1}px`; // Stack add-ons in the selected container with proper spacing
        });

        // Adjust the calendar grid's margin-bottom to ensure it does not overlap with selected add-ons
        const calendarGridHeight = dateGrid.offsetHeight;
        const requiredSpace = stackedAddonsAbove * 1;
        calendar.style.marginBottom = `${Math.max(requiredSpace, calendarGridHeight)}px`;

        // Adjust the date grid's margin-top to make room for stacked add-ons
        if (stackedAddonsAbove > 0) {
            dateGrid.style.marginTop = `${stackedAddonsAbove * 1 }px`; // Create space for stacked add-ons
        } else {
            dateGrid.style.marginTop = '0'; // Reset margin-top when no add-ons are stacked
        }

        // Adjust the "Book Now" button's position based on the number of stacked add-ons
        const buttonOffset = stackedAddonsAbove * 1;
        bookNowButton.style.position = 'relative';
        bookNowButton.style.top = `${buttonOffset}px`;

        // Adjust the positions of unselected addons (those still in the addon container)
        let unstackedAddons = addonItems.length - stackedAddonsAbove;
        Array.from(addonsContainer.children).forEach(function(item, index) {
            item.style.position = 'relative';
            item.style.top = `${(stackedAddonsAbove * 1) + 1 + (index * 1)}px`; // Stack unselected addons below the "Book Now" button
        });
    }

    // Add click event listeners for each addon item
    addonItems.forEach(function(item) {
        item.addEventListener('click', toggleAddonPosition);
    });
});

