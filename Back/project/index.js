import express from'express';
import initApp from './src/app.router.js';
const app = express();
const port = 8888;
initApp(express,app);
app.get('/', (req, res) => res.json({message:'hii'}));
app.listen(port, () => console.log(`the ${port} is run :)`));
