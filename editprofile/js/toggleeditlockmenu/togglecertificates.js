document.addEventListener("DOMContentLoaded", function() {
    // Select only the certificates menu icon by its unique ID
    const certificateMenuIcon = document.getElementById("menu-icon-certificates");

    if (certificateMenuIcon) {
        certificateMenuIcon.addEventListener("click", function() {
            const listItem = this.closest("li");
            const certificatesContainer = listItem.querySelector(".cert-block-label-container");

            if (certificatesContainer) {
                const existingInput = listItem.querySelector(".edit-input");

                if (existingInput) {
                    existingInput.remove();
                    // Remove all red Xs and upload icons when input disappears
                    const labels = certificatesContainer.querySelectorAll(".cert-block-label");
                    labels.forEach(label => {
                        const redX = label.querySelector(".red-x");
                        const uploadIcon = label.querySelector(".upload-icon");
                        if (redX) redX.remove();
                        if (uploadIcon) uploadIcon.remove();
                    });
                } else {
                    const input = document.createElement("input");
                    input.classList.add("edit-input");
                    input.type = "text";
                    input.placeholder = "Enter new certificate...";
                    listItem.appendChild(input);
                    input.focus();

                    input.addEventListener("keypress", function(event) {
                        if (event.key === "Enter" && input.value.trim() !== "") {
                            const newLabel = document.createElement("span");
                            newLabel.classList.add("cert-block-label");
                            newLabel.textContent = input.value.trim();

                            certificatesContainer.appendChild(newLabel);

                            // Create the red X button for the new label
                            const redX = document.createElement("span");
                            redX.textContent = "❌";
                            redX.classList.add("red-x");
                            redX.setAttribute("aria-label", "Remove certificate");
                            newLabel.appendChild(redX);

                            // Create the upload icon for the new label
                            const uploadIcon = document.createElement("span");
                            uploadIcon.textContent = "⬆️";  // or you could use an image for the upload icon
                            uploadIcon.classList.add("upload-icon");
                            uploadIcon.setAttribute("aria-label", "Upload certificate");
                            newLabel.insertBefore(uploadIcon, redX);  // Add upload icon before the red X

                            redX.addEventListener("click", function(event) {
                                event.stopPropagation();
                                newLabel.remove();
                            });

                            input.value = ""; // Clear the input field
                        }
                    });

                    // Show red Xs and upload icons for existing labels when input is present
                    const labels = certificatesContainer.querySelectorAll(".cert-block-label");
                    labels.forEach(label => {
                        // Check if the red X already exists
                        const existingX = label.querySelector(".red-x");
                        const existingUploadIcon = label.querySelector(".upload-icon");

                        if (!existingX) {
                            const redX = document.createElement("span");
                            redX.textContent = "❌";
                            redX.classList.add("red-x");
                            redX.setAttribute("aria-label", "Remove certificate");
                            label.appendChild(redX);

                            redX.addEventListener("click", function(event) {
                                event.stopPropagation();
                                label.remove();
                            });
                        }

                        // Check if the upload icon exists, if not, add it
                        if (!existingUploadIcon) {
                            const uploadIcon = document.createElement("span");
                            uploadIcon.textContent = "⬆️";  // or you could use an image for the upload icon
                            uploadIcon.classList.add("upload-icon");
                            uploadIcon.setAttribute("aria-label", "Upload certificate");
                            label.insertBefore(uploadIcon, label.querySelector(".red-x")); // Insert before the red X
                        }
                    });
                }
            }
        });
    }
});

