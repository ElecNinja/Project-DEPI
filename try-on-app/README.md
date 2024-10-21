# Elite Wear Try-On App

An experimental virtual try-on clothes app that uses the camera to detect a user's body pose and overlay clothing (like a t-shirt) on top of the video feed. Users can customize the clothing's color and opacity, and even capture snapshots of their virtual try-on experience.

## Technologies Used

- **HTML**: Structure of the web page
- **CSS**: Styling for layout and UI components
- **JavaScript**: Main logic and interaction, including PoseNet for pose detection
- **PoseNet Model (TensorFlow.js)**: Used to detect human body pose through the video stream
- **TensorFlow.js**: Provides the PoseNet model and allows machine learning in the browser
- **MediaDevices API**: Accesses the user's webcam to provide a live video feed
- **Canvas API**: Used to draw the clothing overlay on the video feed
- **HTML5 Video Element**: Displays the webcam feed

## Features

- **Real-Time Pose Detection**: The app uses the PoseNet model to detect the user's body pose in real-time.
- **Virtual Try-On**: A t-shirt image is overlaid on the user's body based on the detected pose, allowing users to see how the clothing fits.
- **Customization Options**:
  - **Color Picker**: Users can change the color of the t-shirt.
  - **Opacity Slider**: Adjust the opacity of the t-shirt overlay.
- **Drag and Drop**: Users can manually adjust the t-shirt's position with drag-and-drop functionality.
- **Snapshot Capture**: Users can take a snapshot of their virtual try-on session and download it as a PNG image.
- **Reset**: Allows users to reset the t-shirt's position to its original state.

## Setup and Installation

### Prerequisites

- Ensure you have a modern web browser (Chrome, Firefox, etc.) with webcam permissions enabled.
- An internet connection to load external libraries (PoseNet and TensorFlow.js).

### Running the Application

1. Clone or download the repository.
2. Navigate to the project folder and open `index.html` in your preferred browser.

3. Allow camera access to start using the app.

### Folder Structure

Elite-Wear-Try-On/
├── index.html # Main HTML file
├── style.css # CSS for styling the layout and controls
├── script.js # Main JavaScript file for PoseNet and app logic
└── white-tshirt.png # Image of the t-shirt used for the overlay

## How It Works

1. **Camera Setup**: The app requests access to the user's webcam using the MediaDevices API. The live video feed is displayed in the video element.
2. **Pose Detection**: PoseNet (a pre-trained machine learning model) is loaded using TensorFlow.js. It estimates the user's body pose from the video feed in real-time.

3. **Overlay T-Shirt**: Based on the detected pose, the t-shirt image is dynamically resized and positioned over the user's body using the Canvas API.

4. **Color and Opacity Customization**: Users can modify the color of the t-shirt using a color picker and adjust its opacity using a range slider.

5. **Capture Snapshot**: The canvas is merged with the video feed to create a snapshot image, which can be downloaded by the user.

## Customization

You can easily customize the app by:

- Replacing the `white-tshirt.png` file with another clothing image.
- Adjusting the `widthFactor` and `heightFactor` in the `detectPose` function to change the fit of the clothing.

## Future Enhancements

- Add support for more clothing types (pants, jackets, etc.).
- Improve clothing fitting with more advanced pose detection and resizing logic.
- Allow users to upload custom clothing images.

## Demo

1. Open `index.html` in a browser.
2. Allow access to the webcam.
3. Use the controls to customize the color, adjust opacity, and drag the t-shirt to reposition it.

## License

This project is licensed under the MIT License.
