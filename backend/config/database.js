const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect('mongodb://localhost:27017/Ecommerce', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("MongoDB Connected");
    }).catch((err) => {
        console.error("MongoDB Connection Error:", err);
    });
};

module.exports = connectDatabase;