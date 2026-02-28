import express from 'express';

const router = express.Router();

let posts = [
  { id: 1, title: "Post One" },
  { id: 2, title: "Post Two" },
  { id: 3, title: "Post Three" },
];




// GET all posts
router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.json(posts.slice(0, limit));
  }
  res.json(posts);
});

// GET single post
router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }
  res.status(200).json(post);
});

// create new post
router.post('/', (req,res,next) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };

  if(!newPost.title) {
    const error = new Error('Please include a title.');
    error.status = 400;
    return next(error)
  }

  posts.push(newPost);
  res.status(201).json(posts);
})

// Update a post
router.put('/:id',(req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find(post => post.id === id);

  if(!post){
    const error = new Error(`A post with th id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  post.title = req.body.title;
  res.status(200).json(posts)
});

// Delete post
router.delete('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find(post => post.id === id);

  if(!post){
    const error = new Error(`A post with th id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  posts = posts.filter(post => post.id !== id);
  res.status(200).json(posts)
})

export default router;