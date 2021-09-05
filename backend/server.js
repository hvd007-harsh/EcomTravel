import express from 'express';
import data from './data.js';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config.js';
import userRouter from './router/userRouter.js';
mongoose.connect(config.MONGODB_URL,{
useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true
})
.then(()=>{
    console.log('Connected to mongodb.');
})
.catch((error)=>{
    console.log(error);
})
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users',userRouter);
app.get("/api/products",(req,res)=>{
 res.send(data.products);
});
app.get('/api/products/:id',(req,res)=>{
    const products = data.products.find(x => x._id === req.params.id);
    if(products){
        res.send(products);
   }  else {
        res.status(404).send({ message: 'Product Not found'});
    }
});
app.use((err,req,res,next)=>{
    const status = err.name && err.name === 'ValidationError' ? 400 : 500;
    res.status(status).send({message: err.message});
})
app.listen(3535,()=>{
    console.log('\t Serve at \t https//localhost:3535');
});
