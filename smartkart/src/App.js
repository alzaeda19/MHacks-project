import React, { useState } from 'react';
import GroceryList from './GroceryList';
import LowStockAlerts from './LowStockAlerts';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [groceryItems, setGroceryItems] = useState([]);

  // Function to add an item to the grocery list
  const addItem = (item) => {
    setGroceryItems([...groceryItems, item]);
  };

  // Function to remove an item from the grocery list
  const removeItem = (itemIndex) => {
    setGroceryItems(groceryItems.filter((_, index) => index !== itemIndex));
  };

  return (
    <div className="App container my-3">
      <h1 className="text-center">SmartKart</h1>
      <GroceryList items={groceryItems} onAddItem={addItem} onRemoveItem={removeItem} />
      <LowStockAlerts items={groceryItems} />
    </div>
  );
}

export default App;
