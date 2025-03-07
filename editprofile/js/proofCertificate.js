document.addEventListener('DOMContentLoaded', function () {
    // Define the default certificate image path (optional)
    const defaultCertificatePath = 'pictures/certificates/Untitled.jpeg';

    // Handle click events using event delegation
    document.addEventListener('click', function (event) {
        // Check if the clicked element is a .cert-block-label
        const label = event.target.closest('.cert-block-label');

        if (!label) return; // Exit if not a block-label

        // Check if the clicked element is the upload icon
        const uploadIcon = event.target.closest('.upload-icon');
        
        if (uploadIcon) {
            // Find the label associated with the upload icon
            const certificatesContainer = label.closest('.cert-block-label-container');
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*'; // Allow only image files
            
            // Trigger file input when the upload icon is clicked
            fileInput.addEventListener('change', function(event) {
                const file = event.target.files[0];

                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const uploadedImageSrc = e.target.result;

                        // Check if the certificate image already exists
                        let existingImage = label.querySelector('.certificate-image');

                        // If the image already exists, update its source
                        if (existingImage) {
                            existingImage.src = uploadedImageSrc;
                            existingImage.style.display = 'block'; // Ensure the image is visible
                        } else {
                            // Create the image element for the certificate
                            const image = document.createElement('img');
                            image.classList.add('certificate-image');
                            image.src = uploadedImageSrc;
                            image.alt = 'Uploaded Certificate';
                            image.style.display = 'block';

                            // Append the image to the label
                            label.appendChild(image);
                        }
                    };
                    reader.readAsDataURL(file); // Read the file as data URL
                }
            });

            // Trigger the file input click
            fileInput.click();
        }

        // Check if the certificate image already exists
        let existingImage = label.querySelector('.certificate-image');

        // If the image already exists, toggle its visibility
        if (existingImage) {
            existingImage.style.display = existingImage.style.display === 'none' ? 'block' : 'none';
        } else {
            // Create the image element for the certificate (if it doesn't exist)
            const image = document.createElement('img');
            image.classList.add('certificate-image');
            image.src = defaultCertificatePath;
            image.alt = 'Certificate';
            image.style.display = 'block';

            // Append the image to the label
            label.appendChild(image);
        }
    });
});

