import multer from "multer";

// Cấu hình multer để lưu file tạm thời
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

export { upload };