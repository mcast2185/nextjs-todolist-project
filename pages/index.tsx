import { useState } from "react";
import {v4 as uuidv4} from 'uuid';
import cx from "classnames";

import Todo from "../models/dbModel";
import connectMongo from "../utils/connectDB";
import styles from "../styles/Home.module.css";

export default function Home({todos}: any) {

  // using useState to establish our new todo items as strings
  const [addedTodo, setAddedTodo] = useState("");
  // using useState to establish the properties expected from each of our todo items, and adds them within an array
  const [todoList, setTodoList] = useState([...todos]);
  

  const addTodoItemDB = async () => {
    let res = await fetch("/api/crud/connect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: `${uuidv4()}`,
        message: addedTodo,
        done: false
      })
    });
    const data = await res.json();
    console.log(data);

  }

  
  // creating a function that checks if there is a todo item, if so apply the properties 
  // from setTodo to our new todo items, properties of id, message(todo items), done
  // then adds them to our array along with any previous todos, then finally clears our text
  const handleAddedTodo = (e: any) => {
    e.preventDefault()
    if (addedTodo) {
      setTodoList([
        {
          id: uuidv4(),
          message: addedTodo,
          done: false
        },
        ...todoList,
      ])
      setAddedTodo("");
    }
  }
  
  // creating a function that allows us to click on an item and change the current property of done
  // and returns our todo with its updated property
  const handleToggle = (id: string | number) => {
    const listedItems = todoList.map((item: any) => {
      if (item.id === id) {
        return {
          ...item,
          done: !item.done
        }
      }
      return item
    });

    setTodoList(listedItems)
  }
  
  // creating a function that reacts to users enter key as a form of submitting text
  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      handleAddedTodo(e);
    }
  }

  // creating a function that deletes the items from the list
  const handleDelete = (item: any) => {
    const deletedItem = todoList.filter((targetItem: any) => todoList.indexOf(targetItem) !== todoList.indexOf(item))
    setTodoList(deletedItem)
  }
  

  return (
    <div className="
      w-3/4 mx-auto 
      text-center">
      <div className="pt-12">
        <h6 className="
          text-xs font-bold 
          pb-3">[ de·i·ty ]</h6>
        <h1 className="
          text-5xl font-bold 
          pb-1">Todo-List</h1>
      </div>
      <div className="pt-12">
        <input type="text" 
          placeholder="Press Enter"
          className="
            w-full text-gray-900 
            px-3 py-2 text-center 
            rounded"
          value={addedTodo} 
          onChange={(e: any) => {
            setAddedTodo(e.target.value)}}
          onKeyDown={handleEnter}
        />
      </div>
      <ul className={styles.two}>
        {/* 
          creating two separate lists, todo items that are considered done are pushed to the bottom
          and the ones that are not considered done remain towards the top
        */}
         
         {todoList.filter((item) => !item.done)
          .map((item: string | any) => (
            <div key={item.id} className={styles.one}>

              <li key={item.id} 
                className={styles.todo}>
                  <p className={styles.todo}
                    key={item.id} 
                    onClick={() => handleToggle(item.id)}>
                      {item.message} 
                  </p>
              </li>
              <button className="px-2 py-1 border" 
                key={item.id}
                type="button" 
                onClick={(e: any) => {
                  e.preventDefault()
                  handleDelete(item)}}>
                  Delete
              </button>
            </div>
        ))}

        {todoList.filter((item) => item.done)
          .map((item: string | any) => (
            <div key={item.id} className={styles.one}>

              <li key={item.id}
                className={styles.todo}>
                  <p className={cx(styles.todo, styles.done)} 
                    key={item.id}
                    onClick={() => handleToggle(item.id)}>
                      {item.message} 
                  </p>
              </li>
              <button className="px-2 py-1 border" 
                key={item.id}
                type="button" 
                onClick={(e: any) => {
                  e.preventDefault()
                  handleDelete(item)}}>
                  Delete
              </button>
            </div>
        ))}

      </ul>
    </div>
  )
}

export const getServerSideProps = async () => {
  try {
    console.log("Connecting to MongoDB");
    await connectMongo;
  
    const todos = await Todo.find();
    // console.log(todos);
    
    console.log("Todo list fetched");
    
    return {
      props: {
        todos: JSON.parse(JSON.stringify(todos))
      }
    };
  } catch(e) {
    console.log(e);

    return {
      notFound: true
    };
  };
}