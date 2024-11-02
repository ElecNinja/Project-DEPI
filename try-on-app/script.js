const video = document.getElementById("video");
const canvas = document.getElementById("overlay");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");
const captureButton = document.getElementById("capture");
const opacitySlider = document.getElementById("opacitySlider");
const resetButton = document.getElementById("reset");
const widthSlider = document.getElementById("widthSlider");
const heightSlider = document.getElementById("heightSlider");
const widthValue = document.getElementById("widthValue");
const heightValue = document.getElementById("heightValue");

// Load t-shirt image
const clothingImg = new Image();
clothingImg.src = "white-tshirt.png";

let isDragging = false;
let offsetX, offsetY;
let initialLeftShoulderX = 0;
let initialLeftShoulderY = 0;
let shoulderWidth = 0;
let torsoHeight = 0;

// Width and height slider event listeners
widthSlider.addEventListener("input", function () {
  widthValue.textContent = this.value;
});

heightSlider.addEventListener("input", function () {
  heightValue.textContent = this.value;
});

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

async function loadPosenet() {
  return await posenet.load();
}

async function detectPose(model) {
  const pose = await model.estimateSinglePose(video, {
    flipHorizontal: false,
  });

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const keypoints = pose.keypoints;
  const leftShoulder = keypoints.find((k) => k.part === "leftShoulder");
  const rightShoulder = keypoints.find((k) => k.part === "rightShoulder");
  const leftHip = keypoints.find((k) => k.part === "leftHip");
  const rightHip = keypoints.find((k) => k.part === "rightHip");

  if (leftShoulder && rightShoulder && leftHip && rightHip) {
    shoulderWidth = rightShoulder.position.x - leftShoulder.position.x;
    torsoHeight = leftHip.position.y - leftShoulder.position.y;

    // Use slider values for factors
    const widthFactor = parseFloat(widthSlider.value);
    const heightFactor = parseFloat(heightSlider.value);

    const adjustedWidth = shoulderWidth * widthFactor;
    const adjustedHeight = torsoHeight * heightFactor;

    if (initialLeftShoulderX === 0 && initialLeftShoulderY === 0) {
      initialLeftShoulderX = leftShoulder.position.x;
      initialLeftShoulderY = leftShoulder.position.y;
    }

    ctx.globalAlpha = opacitySlider.value;
    ctx.drawImage(
      clothingImg,
      leftShoulder.position.x - (adjustedWidth - shoulderWidth) / 2,
      leftShoulder.position.y - 50,
      adjustedWidth,
      adjustedHeight
    );

    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = colorPicker.value;
    ctx.fillRect(
      leftShoulder.position.x - (adjustedWidth - shoulderWidth) / 2,
      leftShoulder.position.y - 50,
      adjustedWidth,
      adjustedHeight
    );
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
  }
}

canvas.addEventListener("mousedown", function (e) {
  isDragging = true;
  offsetX = e.offsetX;
  offsetY = e.offsetY;
});

canvas.addEventListener("mousemove", function (e) {
  if (isDragging) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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

function captureVideoAndCanvas() {
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = video.videoWidth;
  tempCanvas.height = video.videoHeight;
  const tempCtx = tempCanvas.getContext("2d");

  tempCtx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);
  tempCtx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);

  return tempCanvas.toDataURL("image/png");
}

captureButton.addEventListener("click", function () {
  const dataURL = captureVideoAndCanvas();
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "try-on-snapshot.png";
  link.click();
});

resetButton.addEventListener("click", function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    clothingImg,
    initialLeftShoulderX,
    initialLeftShoulderY - 50,
    shoulderWidth,
    torsoHeight
  );
});

async function main() {
  await setupCamera();
  const posenetModel = await loadPosenet();

  setInterval(() => {
    detectPose(posenetModel);
  }, 100);
}

main();
