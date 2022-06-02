import mongoose from 'mongoose';


const uri = "mongodb+srv://mcast2185:asdf2185@cluster0.umno5.mongodb.net/todo?retryWrites=true&w=majority";
const connectMongo = mongoose.connect(uri);

export default connectMongo;