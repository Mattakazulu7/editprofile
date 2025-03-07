document.addEventListener("DOMContentLoaded", function () {
    const timeSlots = document.querySelectorAll("#playdate-schedule ul li");

    timeSlots.forEach(slot => {
        slot.addEventListener("click", function () {
            const text = slot.textContent.trim();
            if (text.includes("–")) {
                const parts = text.split("–");
                if (parts.length > 1 && parts[1].trim() !== "") {
                    slot.innerHTML = `${parts[0].trim()} –`;
                }
            }
        });
    });
});

