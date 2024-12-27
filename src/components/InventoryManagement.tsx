'use client';

import React from 'react';
import { useCoffee } from '../context/CoffeeContext';

export function InventoryManagement() {
  const { state, dispatch } = useCoffee();

  const handleUpdateInventory = (coffeeId: string, inventory: number) => {
    const coffee = state.coffees.find(c => c.id === coffeeId);
    if (coffee) {
      dispatch({
        type: 'UPDATE_COFFEE',
        coffee: {
          ...coffee,
          roastedInventory: inventory
        }
      });
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Roasted Inventory Management</h2>
      <div className="space-y-4">
        {state.coffees.map((coffee) => (
          <div 
            key={coffee.id}
            className="flex items-center justify-between p-4 border rounded"
          >
            <div>
              <h3 className="font-medium">{coffee.name}</h3>
              <p className="text-sm text-gray-500">Current Inventory: {coffee.roastedInventory}lbs</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="w-24 p-2 border rounded"
                value={coffee.roastedInventory}
                onChange={(e) => handleUpdateInventory(coffee.id, parseFloat(e.target.value) || 0)}
                min="0"
                step="0.1"
              />
              <span className="text-sm text-gray-500">lbs</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
