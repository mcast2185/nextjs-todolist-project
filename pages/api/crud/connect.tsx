import Todo from "../../../models/dbModel";
import connectMongo from "../../../utils/connectDB";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  try {
    await connectMongo;
    console.log("Connecting to MongoDB");
    
    const todo = await Todo.create(req.body);
    res.json(todo);
    console.log("Todo item created");
    
  } catch(e) {

    res.status(404);
    console.log(e);

  };
};
