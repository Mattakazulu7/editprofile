// Carousel functionality
let currentIndex = 0;
const slides = document.querySelectorAll(".slide");

document.getElementById("prev-slide").addEventListener("click", () => {
    changeSlide(-1);
});
document.getElementById("next-slide").addEventListener("click", () => {
    changeSlide(1);
});

function changeSlide(direction) {
    currentIndex = (currentIndex + direction + slides.length) % slides.length;
    document.getElementById("carousel").style.transform = `translateX(-${currentIndex * 100}%)`;
}

document.getElementById("prev-slide").onclick = () => changeSlide(-1);
document.getElementById("next-slide").onclick = () => changeSlide(1);

// Generate calendar dates
const dateGrid = document.querySelector(".date-grid");
for (let i = 1; i <= 30; i++) {
    let date = document.createElement("div");
    date.textContent = i;
    date.addEventListener("click", () => selectDate(date));
    dateGrid.appendChild(date);
}

function selectDate(dateElement) {
    document.querySelectorAll(".date-grid div").forEach(div => div.style.background = "#4CAF50");
    dateElement.style.background = "#ff9800"; // Highlight selected date
}

// Search & Filter Functionality
document.getElementById("search").addEventListener("input", (e) => {
    console.log("Searching for:", e.target.value);
});

document.getElementById("filter").addEventListener("change", (e) => {
    console.log("Filtering by:", e.target.value);
});

// Simulating property profile update
document.getElementById("book-now").addEventListener("click", () => {
    document.getElementById("property-description").textContent = "Booking confirmed! Thank you for choosing RentEase.";
});

