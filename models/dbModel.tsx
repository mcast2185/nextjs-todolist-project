import mongoose, {Schema, model, models} from 'mongoose';

const todoProperties = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    required: true
  }
});


const Todo = mongoose.models.Todo || mongoose.model("todolist", todoProperties);

export default Todo;