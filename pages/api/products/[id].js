import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";
import mongoose from 'mongoose';

const mongoURL = "mongodb+srv://sayak:sayak1234@cluster0.veijnzi.mongodb.net/pizza?retryWrites=true&w=majority"

export default async function handler(req, res) {
  const { method, query: { id }, cookies } = req;

  const token = cookies.token

//   dbConnect().then((res) => console.log(res));
mongoose.connect(mongoURL, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }) 
        .then(() => { 
            console.log('MongoDB connected'); 
        }) 
        .catch(err => { 
            console.log(err); 
        })

  if(method === "GET") {
    try {
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
  }

  if(method === "PUT") {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch(err) {
        res.status(500).json(err);
    }
  }

  if(method === "DELETE") {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch(err) {
        res.status(500).json(err);
    }
  }
}
