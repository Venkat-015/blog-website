import express from "express";
import {getFeedPosts,getUserPosts,likePosts,commentPost,deletePost}from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
const router=express.Router();
//read
router.get("/",verifyToken,getFeedPosts);
router.get("/:userId/posts",verifyToken,getUserPosts);
//update
router.patch("/:id/like",verifyToken,likePosts);
router.patch("/:id/comment", verifyToken, commentPost);
//delete
router.delete("/:id/post",verifyToken,deletePost);
export default router;