import express from "express";
import { posts, post, createPost, updatePost, deletePost, searchPost} from "../controllers/post.js";
import auth from "../middleware/auth.js"; 

const router = express.Router(); 

router.get("/posts", posts)
router.get("/post/:id", post)
router.post("/postCreate", auth, createPost)
router.patch("/postUpdate/:id", auth, updatePost)
router.delete("/postDelete/:id", auth, deletePost)
router.get("/searchPost", searchPost)

export default router;