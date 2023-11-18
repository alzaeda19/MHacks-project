import React, { useState } from 'react';

function GroceryList({ items, onAddItem, onRemoveItem }) {
  const [newItem, setNewItem] = useState('');

  return (
    <div>
      <h2>My Grocery List</h2>
      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control"
          value={newItem} 
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add a new item"
        />
        <div className="input-group-append">
          <button 
            className="btn btn-outline-secondary" 
            onClick={() => {
              onAddItem(newItem);
              setNewItem('');
            }}
          >Add Item</button>
        </div>
      </div>

      <ul className="list-group">
        {items.map((item, index) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
            {item}
            <button 
              className="btn btn-danger btn-sm" 
              onClick={() => onRemoveItem(index)}
            >Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroceryList;
