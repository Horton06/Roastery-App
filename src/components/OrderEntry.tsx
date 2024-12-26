'use client';

import React from 'react';
import { useCoffee } from '../context/CoffeeContext';

export function OrderEntry() {
  const { state, dispatch } = useCoffee();
  const [newOrder, setNewOrder] = React.useState({
    coffeeId: '',
    retailQuantity: 0,
    fivePoundQuantity: 0,
    twoPoundQuantity: 0,
    hundredGramQuantity: 0,
  });

  const handleAddOrder = () => {
    if (newOrder.coffeeId) {
      dispatch({
        type: 'ADD_ORDER',
        order: {
          id: crypto.randomUUID(),
          ...newOrder,
        },
      });
      setNewOrder({
        coffeeId: '',
        retailQuantity: 0,
        fivePoundQuantity: 0,
        twoPoundQuantity: 0,
        hundredGramQuantity: 0,
      });
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Order Entry</h2>
      <div className="space-y-4">
        <select
          className="w-full p-2 border rounded"
          value={newOrder.coffeeId}
          onChange={(e) =>
            setNewOrder({ ...newOrder, coffeeId: e.target.value })
          }
        >
          <option value="">Select Coffee or Blend</option>
          {state.coffees
            .filter((c) => !c.isBlendOnly)
            .map((coffee) => (
              <option key={coffee.id} value={coffee.id}>
                {coffee.name}
              </option>
            ))}
          {state.blends.map((blend) => (
            <option key={blend.id} value={blend.id}>
              {blend.name}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Retail Bags
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={newOrder.retailQuantity}
              onChange={(e) =>
                setNewOrder({
                  ...newOrder,
                  retailQuantity: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              5lb Bags
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={newOrder.fivePoundQuantity}
              onChange={(e) =>
                setNewOrder({
                  ...newOrder,
                  fivePoundQuantity: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              2lb Bags
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={newOrder.twoPoundQuantity}
              onChange={(e) =>
                setNewOrder({
                  ...newOrder,
                  twoPoundQuantity: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              100g Bags
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={newOrder.hundredGramQuantity}
              onChange={(e) =>
                setNewOrder({
                  ...newOrder,
                  hundredGramQuantity: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>
        </div>

        <button
          className="w-full p-2 bg-blue-500 text-white rounded"
          onClick={handleAddOrder}
        >
          Add Order
        </button>
      </div>
    </div>
  );
}