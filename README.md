# Image Compression Web Application

This web application is built using Node.js and Express and integrates with the `https://resmush.it/api` API to provide an easy-to-use service for compressing images.

## Features

- **User-Friendly Interface**: Simple and clean interface for uploading images.
- **Compression Quality Selection**: Users can choose the compression level (High, Medium, Low) for their images.
- **Image Compression**: Utilizes the reSmush.it API for efficient image optimization.
- **Immediate Results**: Displays the compressed image and offers a comparison of the original and compressed file sizes.

## How to Use

1. **Start the Application**: Run `npm start` from the terminal to launch the application. By default, it will be accessible at `http://localhost:3000`.
2. **Upload an Image**: Select an image file from your device using the upload button on the home page.
3. **Select Compression Quality**: Choose the desired quality level for the image compression from the dropdown menu.
4. **Compress**: Click the "Compress Image" button to send the image for compression.
5. **View Results**: After compression, view the optimized image and file size reduction on the results page.

## Installation

To set up the application locally, follow these steps:

1. Clone the repository to your local machine. `https://github.com/AD-320/quick-compress.git`
2. Navigate to the application's directory.
3. Run `npm install` to install the necessary dependencies.
4. Start the application with `npm start`.
5. Open your browser and go to `http://localhost:3000` to use the application.

## Dependencies

- Node.js
- Express
- Multer
- reSmush.it API
- file-type (for validating image types)

## License

This project is open-sourced under the ISC.
