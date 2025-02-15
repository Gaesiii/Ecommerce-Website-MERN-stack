const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");
const port = process.env.PORT || 4000;
//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Rejection`);
    process.exit(1);
});

//config

    // dotenv.config({ path: "backend/config/config.env" });

    dotenv.config({ path: "backend/config/config.env" });


//Connect to database
connectDatabase()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})


const server = app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`);
});


//Unhandled Promise Rejection
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    })

});