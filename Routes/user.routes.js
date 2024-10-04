import { Router } from "express";
import { Login, registerUser } from "../Controller/user.controller.js";
import { upload } from "../Middlewares/multer.middleware.js";


const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount : 1,
        }
    ]),registerUser
    
)
router.route("/login").post(Login);

export default router;