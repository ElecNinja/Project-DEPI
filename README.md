# Online Clothing Store

This project is an online clothing store website built using HTML, CSS, and JavaScript. It provides a user-friendly interface for customers to browse and purchase clothing items.

## Getting Started

1. Clone the repository: `git clone https://github.com/ElecNinja/Project-DEPI.git`
2. Open the `index.html` file in a web browser to view the website.

## Live Preview

Live preview on GitHub : `https://elecninja.github.io/Project-DEPI/index.html`

## Technologies Used

- HTML
- CSS
- JavaScript
- Ionicons
- PoseNet (a pre-trained machine learning model)
- TensorFlow.js (for Pose detection)

## Current Functionality

- Responsive, adapt to different screen sizes with Mobile Navigation Menu
- Home page with featured products and image slider
- Category pages for men's and women's clothing
- Product detail pages
- About page
- Contact page
- Blog page
- Basic cart slider window functionality
- From window you Cart increase product number and then sum the total price
- Basic Favourite slider window functionality
- All pages including their breadcrumb at the top
- Go to the top button functionality
- run minify.js from the terminal to minify the CSS code
- User account page (My Account)
- Terms and conditions page

## Experimental Try-on-clothes functionality

- How It Works

1. **Camera Setup**: The app requests access to the user's webcam using the MediaDevices API. The live video feed is displayed in the video element.
2. **Pose Detection**: PoseNet (a pre-trained machine learning model) is loaded using TensorFlow.js. It estimates the user's body pose from the video feed in real-time.

3. **Overlay T-Shirt**: Based on the detected pose, the t-shirt image is dynamically resized and positioned over the user's body using the Canvas API.

4. **Color and Opacity Customization**: Users can modify the color of the t-shirt using a color picker and adjust its opacity using a range slider.

5. **Capture Snapshot**: The canvas is merged with the video feed to create a snapshot image, which can be downloaded by the user.

## Ionicons Library

- Benefits:

1. **Wide Icon Selection**: You can use hundreds of customizable icons in your web app without needing to create or load individual image files.
2. **Cross-Browser Compatibility**: The combination of type="module" and nomodule ensures that both modern and older browsers can load the appropriate version of the icon library.
3. **Performance Optimization**: Modern browsers use the ES module version (ionicons.esm.js), which is more efficient, while older browsers fall back to a more compatible version (ionicons.js).

## Project Structure

Online-Clothing-Store/
├── assets/
│ ├── css/
│ │ └── style.css
│ ├── images/
│ │ ├── icons/
│ │ │ ├── jacket.svg
│ │ │ └── dress.svg
│ │ ├── products/
│ │ │ ├── jacket-3.jpg
│ │ │ ├── jacket-5.jpg
│ │ │ └── ...
│ │ └── banner-1.jpg
│ │ └── banner-2.jpg
│ │ └── banner-3.jpg
│ └── js/
│ └── cart.js
│ └── darkmode.js
│ └── heart.js
│ └── script.js
├── Try-on-app
│ └── index.html
│ └── README.md
│ └── script.js
│ └── style.css
│ └── white-tshirt.png
├── about.html
├── blog.html
├── Categories.html
├── Category-men.html
├── Category-women.html
├── Checkout.html
├── contact.html
├── index.html
├── Login.html
├── mens-blog.html
├── womens-blog.html
├── My Account.html
├── terms-conditions.html
├── README.md
├── LICENSE

## Team Members and Responsibilities

- Mohamed: Home, about, contact, README, Try-On App
- Yehia: Cart, CSS, view Blog
- Kerolos: All products, All categories, all blog
- Youssef: My account, login, register, view products
- Karim: View blog, view product

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
