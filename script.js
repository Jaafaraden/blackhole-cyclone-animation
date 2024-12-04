// Get the canvas element and its drawing context
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Variables to control the animation
let dynamicNumber = 0;  // This number changes during the animation
const divisions = 150;  // Number of divisions for drawing lines
const maxNumber = 15;   // Maximum value for dynamicNumber
const radius = 200;     // Radius of the circle pattern
let animationFrameId;   // ID of the requestAnimationFrame
let isPaused = false;   // Flag to track if the animation is paused

// Function to draw the pattern on the canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
    ctx.beginPath();  // Start a new path for drawing
    for (let i = 0; i < divisions; i++) {
        // Calculate the angle, start and end points for each line
        const angle = (Math.PI * 2 * i) / divisions;
        const x = canvas.width / 2 + radius * Math.cos(angle);
        const y = canvas.height / 2 + radius * Math.sin(angle);
        const endX = canvas.width / 2 + radius * Math.cos(angle * dynamicNumber);
        const endY = canvas.height / 2 + radius * Math.sin(angle * dynamicNumber);

        // Move to the start point and draw a line to the end point
        ctx.moveTo(x, y);
        ctx.lineTo(endX, endY);
    }
    ctx.strokeStyle = "whitesmoke"; // Set line color to whitesmoke
    ctx.stroke(); // Apply the stroke to the path
}

// Function to update the animation
function update() {
    if (!isPaused) {
        // Increment the dynamic number and update the display
        dynamicNumber += 0.001;
        if (dynamicNumber >= maxNumber) {
            dynamicNumber = maxNumber;
        }
        document.getElementById("dynamicNumber").textContent = dynamicNumber.toFixed(3);
        draw(); // Call the draw function to render the updated pattern
    }

    // Request the next animation frame, if not paused
    if (!isPaused || !animationFrameId) {
        animationFrameId = requestAnimationFrame(update);
    }
}

// Event listener for the "Start" button
document.getElementById("startButton").addEventListener("click", function () {
    if (isPaused) {
        isPaused = false; // Resume the animation
        requestAnimationFrame(update); // Request a new animation frame
    } else {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId); // Cancel any ongoing animation
        }
        animationFrameId = requestAnimationFrame(update); // Start a new animation
    }
});

// Event listener for the "Pause" button
document.getElementById("pauseButton").addEventListener("click", function () {
    if (!isPaused) {
        cancelAnimationFrame(animationFrameId); // Cancel the animation when pausing
    }
    isPaused = !isPaused; // Toggle the pause state
    if (!isPaused) {
        requestAnimationFrame(update); // Resume the animation, if unpaused
    }
});

document.getElementById('resetButton').addEventListener('click', function() {
    isPaused = true;
    dynamicNumber = 0;
    document.getElementById('dynamicNumber').textContent = dynamicNumber.toFixed(3);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    removeActiveState();
});