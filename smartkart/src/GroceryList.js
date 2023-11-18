import React, { useState } from 'react';

function GroceryList({ items, onAddItem, onRemoveItem }) {
  const [newItem, setNewItem] = useState('');

  return (
    <div>
      <h2>My Grocery List</h2>
      <input 
        type="text" 
        value={newItem} 
        onChange={(e) => setNewItem(e.target.value)} 
      />
      <button onClick={() => {
        onAddItem(newItem);
        setNewItem('');
      }}>Add Item</button>

      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => onRemoveItem(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroceryList;
