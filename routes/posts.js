import express from 'express';
import { createPost, deletePost, getAllPosts, getPost, updatePost } from '../controller/postController.js';

const router = express.Router();






// GET all posts
router.get("/",getAllPosts);

// GET single post
router.get('/:id', getPost);

// create new post
router.post('/', createPost)

// Update a post
router.put('/:id', updatePost);

// Delete post
router.delete('/:id', deletePost)

export default router;