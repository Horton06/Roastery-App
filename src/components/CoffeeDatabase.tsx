'use client';

import React from 'react';
import { useCoffee } from '../context/CoffeeContext';

export function CoffeeDatabase() {
  const { state, dispatch } = useCoffee();
  const [newCoffee, setNewCoffee] = React.useState({
    name: '',
    retailSize: 283,
    batchSize: 13.5,
    roastedInventory: 0,
    isBlendOnly: false,
    isSingleOrigin: true,
  });

  const handleAddCoffee = () => {
    if (newCoffee.name) {
      dispatch({
        type: 'ADD_COFFEE',
        coffee: {
          id: crypto.randomUUID(),
          ...newCoffee,
        },
      });
      setNewCoffee({
        name: '',
        retailSize: 283,
        batchSize: 13.5,
        roastedInventory: 0,
        isBlendOnly: false,
        isSingleOrigin: true,
      });
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Coffee Database</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Coffee Name"
          className="w-full p-2 border rounded"
          value={newCoffee.name}
          onChange={(e) => setNewCoffee({ ...newCoffee, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Batch Size (lbs)"
          className="w-full p-2 border rounded"
          value={newCoffee.batchSize}
          onChange={(e) =>
            setNewCoffee({ ...newCoffee, batchSize: parseFloat(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Retail Size (g)"
          className="w-full p-2 border rounded"
          value={newCoffee.retailSize}
          onChange={(e) =>
            setNewCoffee({ ...newCoffee, retailSize: parseFloat(e.target.value) })
          }
        />
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={newCoffee.isBlendOnly}
            onChange={(e) =>
              setNewCoffee({ ...newCoffee, isBlendOnly: e.target.checked })
            }
          />
          <span className="ml-2">Blend Only</span>
        </div>
        <button
          className="w-full p-2 bg-blue-500 text-white rounded"
          onClick={handleAddCoffee}
        >
          Add Coffee
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Current Coffees</h3>
        <div className="space-y-2">
          {state.coffees.map((coffee) => (
            <div
              key={coffee.id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <h4 className="font-medium">{coffee.name}</h4>
                <p className="text-sm text-gray-500">
                  Batch Size: {coffee.batchSize}lbs | Retail: {coffee.retailSize}g
                </p>
              </div>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded"
                onClick={() => dispatch({ type: 'DELETE_COFFEE', id: coffee.id })}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}