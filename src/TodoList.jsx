import React, { useState, useEffect } from 'react'

const TodoList = () => {
   const [todos, setTodos] = useState([]);
   const [inputValue, setInputValue] = useState('');
   const [editingId, setEditingId] = useState(null);
   const [editValue, setEditValue] = useState('');

   const handleSubmit = e => {
      e.preventDefault();

      if (inputValue.trim()) {
         setTodos([...todos, { text: inputValue, id: Date.now() }]);
         setInputValue('');
      }
   };

   const handleChange = e => {
      setInputValue(e.target.value);
   };

   const handleDelete = (id) => {
      const filtered = todos.filter((todo) => todo.id !== id);
      setTodos(filtered);
   };

   const handleEdit = (id, text) => {
      setEditingId(id);
      setEditValue(text);
   };

   const handleEditChange = e => {
      setEditValue(e.target.value);
   };

   const handleEditSave = (id) => {
      setTodos(todos.map(todo =>
         todo.id === id ? { ...todo, text: editValue } : todo
      ));
      setEditingId(null);
      setEditValue('');
   };

   const handleEditCancel = () => {
      setEditingId(null);
      setEditValue('');
   };

   return (
      <div>
         <h1>Todo List</h1>
         <form onSubmit={handleSubmit}>
            <input
               type='text'
               value={inputValue}
               placeholder='Add a new Todo'
               onChange={handleChange}
            />
            <button type='submit'>Add Todo</button>
         </form>

         <ul>
            {todos.map((todo) => (
               <li key={todo.id}>
                  {editingId === todo.id ? (
                     <>
                        <input
                           type="text"
                           value={editValue}
                           onChange={handleEditChange}
                        />
                        <button onClick={() => handleEditSave(todo.id)}>Save</button>
                        <button onClick={handleEditCancel}>Cancel</button>
                     </>
                  ) : (
                     <>
                        {todo.text}
                        <button style={{ margin: '0.5rem' }} onClick={() => handleEdit(todo.id, todo.text)}>Edit</button>
                        <button onClick={() => handleDelete(todo.id)}>Delete</button>
                     </>
                  )}
               </li>
            ))}
         </ul>
      </div>
   );
};

export default TodoList