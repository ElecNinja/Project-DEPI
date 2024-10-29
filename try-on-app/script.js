const video = document.getElementById("video");
const canvas = document.getElementById("overlay");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");
const captureButton = document.getElementById("capture");
const opacitySlider = document.getElementById("opacitySlider");
const resetButton = document.getElementById("reset");

// Load t-shirt image
const clothingImg = new Image();
clothingImg.src = "white-tshirt.png"; // Default to white t-shirt

let isDragging = false;
let offsetX, offsetY;
let initialLeftShoulderX = 0;
let initialLeftShoulderY = 0;
let shoulderWidth = 0;
let torsoHeight = 0;

// Initialize video stream from the camera
async function setupCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });
  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

// Load PoseNet model
async function loadPosenet() {
  return await posenet.load();
}

// Estimate pose and draw the clothing image on the body
async function detectPose(model) {
  const pose = await model.estimateSinglePose(video, {
    flipHorizontal: false,
  });

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame

  // Get keypoints for the shoulders and hips
  const keypoints = pose.keypoints;
  const leftShoulder = keypoints.find((k) => k.part === "leftShoulder");
  const rightShoulder = keypoints.find((k) => k.part === "rightShoulder");
  const leftHip = keypoints.find((k) => k.part === "leftHip");
  const rightHip = keypoints.find((k) => k.part === "rightHip");

  if (leftShoulder && rightShoulder && leftHip && rightHip) {
    // Calculate shoulder width and torso height
    shoulderWidth = rightShoulder.position.x - leftShoulder.position.x;
    torsoHeight = leftHip.position.y - leftShoulder.position.y;

    // Add a scaling factor to make the t-shirt wider and taller
    const widthFactor = 2.2; // Increase width by 30%
    const heightFactor = 1.2; // Increase height by 20%

    const adjustedWidth = shoulderWidth * widthFactor;
    const adjustedHeight = torsoHeight * heightFactor;

    // Store initial position for reset
    if (initialLeftShoulderX === 0 && initialLeftShoulderY === 0) {
      initialLeftShoulderX = leftShoulder.position.x;
      initialLeftShoulderY = leftShoulder.position.y;
    }

    // Draw the t-shirt with adjusted width and height
    ctx.globalAlpha = opacitySlider.value; // Apply opacity
    ctx.drawImage(
      clothingImg,
      leftShoulder.position.x - (adjustedWidth - shoulderWidth) / 2,
      leftShoulder.position.y - 50,
      adjustedWidth,
      adjustedHeight
    );

    // Apply color customization
    ctx.globalCompositeOperation = "source-in"; // Apply color only to clothing
    ctx.fillStyle = colorPicker.value;
    ctx.fillRect(
      leftShoulder.position.x - (adjustedWidth - shoulderWidth) / 2,
      leftShoulder.position.y - 50,
      adjustedWidth,
      adjustedHeight
    );
    ctx.globalCompositeOperation = "source-over"; // Reset blending mode
    ctx.globalAlpha = 1; // Reset opacity
  }
}

// Drag and drop functionality for manual clothing adjustment
canvas.addEventListener("mousedown", function (e) {
  isDragging = true;
  offsetX = e.offsetX;
  offsetY = e.offsetY;
});

canvas.addEventListener("mousemove", function (e) {
  if (isDragging) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas for each move
    ctx.drawImage(
      clothingImg,
      e.offsetX - offsetX,
      e.offsetY - offsetY,
      shoulderWidth,
      torsoHeight
    );
  }
});

canvas.addEventListener("mouseup", function () {
  isDragging = false;
});

// Capture the current canvas and download as an image
// captureButton.addEventListener("click", function () {
//   const dataURL = canvas.toDataURL();
//   const link = document.createElement("a");
//   link.href = dataURL;
//   link.download = "try-on-snapshot.png";
//   link.click();
// });

// Add this function to combine video and canvas
function captureVideoAndCanvas() {
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = video.videoWidth;
  tempCanvas.height = video.videoHeight;
  const tempCtx = tempCanvas.getContext("2d");

  // Draw the video frame
  tempCtx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);

  // Draw the canvas content (t-shirt overlay)
  tempCtx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);

  return tempCanvas.toDataURL("image/png");
}

// Update the capture button event listener
captureButton.addEventListener("click", function () {
  const dataURL = captureVideoAndCanvas();
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "try-on-snapshot.png";
  link.click();
});

// Reset the t-shirt position to its initial position
resetButton.addEventListener("click", function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  ctx.drawImage(
    clothingImg,
    initialLeftShoulderX,
    initialLeftShoulderY - 50,
    shoulderWidth,
    torsoHeight
  );
});

// Main function to set everything up
async function main() {
  await setupCamera();
  const posenetModel = await loadPosenet();

  // Keep running pose detection
  setInterval(() => {
    detectPose(posenetModel);
  }, 100);
}

// Start the app
main();
