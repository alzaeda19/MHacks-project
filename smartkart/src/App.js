import React, { useState } from 'react';
import GroceryList from './GroceryList';
import LowStockAlerts from './LowStockAlerts';

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
    <div className="App">
      <h1>SmartKart</h1>
      <GroceryList items={groceryItems} onAddItem={addItem} onRemoveItem={removeItem} />
      <LowStockAlerts items={groceryItems} />
    </div>
  );
}

export default App;
