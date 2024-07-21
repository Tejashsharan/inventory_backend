const multer = require('multer');

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Specify the destination directory for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname) // Define the file naming convention
    }
});

// Configure multer
const upload = multer({ storage: storage });

// Export the upload configuration
module.exports = upload;
