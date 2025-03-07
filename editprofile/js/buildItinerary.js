document.addEventListener("DOMContentLoaded", function () {
    const timeSlots = document.querySelectorAll("#playdate-schedule ul li");

    // Function to attach click event to labels (only attach once)
    function attachLabelClickEvent(labels) {
        labels.forEach(label => {
            // Skip labels that have already been clicked
            if (!label.hasAttribute('data-clicked')) {
                label.addEventListener("click", function () {
                    const text = this.textContent.trim();

                    // Loop through the time slots and fill only the first available slot
                    for (let i = 0; i < timeSlots.length; i++) {
                        // Check if the time slot is empty (i.e., contains "–")
                        if (timeSlots[i].textContent.includes("–") && timeSlots[i].textContent.trim().endsWith("–")) {
                            // Fill the slot with the label's text
                            timeSlots[i].innerHTML = `${timeSlots[i].innerHTML.trim()} ${text}`;
                            break;  // Exit after filling the first available slot
                        }
                    }

                    // Mark the label as clicked to prevent attaching event again
                    label.setAttribute('data-clicked', 'true');
                });
            }
        });
    }

    // Initial event binding for both existing and new labels
    attachLabelClickEvent(document.querySelectorAll(".theoretical-block-label, .practical-block-label"));

    // Observe changes to dynamically added labels
    const observer = new MutationObserver(function (mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.type === "childList") {
                // For newly added labels, bind the same click event to fill the next available slot
                const newLabels = mutation.addedNodes;
                newLabels.forEach(node => {
                    if (node.classList && (node.classList.contains("theoretical-block-label") || node.classList.contains("practical-block-label"))) {
                        // Only attach event to newly added labels
                        attachLabelClickEvent([node]);
                    }
                });
            }
        }
    });

    // Start observing the parent container where labels might be added dynamically
    const container = document.body; // Adjust to your specific container if necessary
    observer.observe(container, { childList: true, subtree: true });
});

