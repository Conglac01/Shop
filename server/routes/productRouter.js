import express from "express";
import { upload } from "../middleware/multer.js";
import authAdmin from "../middleware/authAdmin.js";
import { 
    addProduct, 
    changeStock, 
    listProduct, 
    singleProduct,
    updateProduct,  // THÊM
    deleteProduct   // THÊM
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post('/add', upload.array("images", 4), authAdmin, addProduct);
productRouter.get('/list', listProduct);
productRouter.post('/single', singleProduct);
productRouter.post('/stock', authAdmin, changeStock);
productRouter.put('/:id', authAdmin, updateProduct);        // BỎ upload vì EditProduct dùng JSON
productRouter.delete('/:id', authAdmin, deleteProduct);     // Route xóa

export default productRouter;