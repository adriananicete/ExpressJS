import express from 'express';
import path from 'path';
import url from 'url';
import posts from './routes/posts.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';

const PORT = process.env.PORT || 8000;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// setup static folder
app.use(express.static(path.join(__dirname, 'public')));

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// logger middleware
app.use(logger)


app.use('/api/posts/', posts)

app.use(notFound);

// errorHandler
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
