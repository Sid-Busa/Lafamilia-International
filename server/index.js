import express from 'express';
import cors from 'cors';
import Connection from './connection/db.js';
import { auth } from './middleware/auth.js';
import Login from './routes/login.js';
import Category from './routes/category.js';
import Product from './routes/products.js';

const app = express();
Connection();

const PORT = 4000 || process.env.PORT;

let corsOptions = {
	origin: '*',
};
app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/auth', Login);
app.use('/api/category', auth, Category);
app.use('/api/product', auth, Product);

app.listen(PORT, () => console.log(`Server listening on port :-  ${PORT}`));
