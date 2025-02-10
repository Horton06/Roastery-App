'use client';

import React, { useState } from 'react';
import { useCoffee } from '../context/CoffeeContext';

interface Order {
  id: string;
  coffeeId: string;
  retailQuantity: number;
  fivePoundQuantity: number;
  twoPoundQuantity: number;
  hundredGramQuantity: number;
}

export function OrderEntry() {
  const { state, dispatch } = useCoffee();
  const [newOrder, setNewOrder] = useState({
    id: '',
    coffeeId: '',
    retailQuantity: 0,
    fivePoundQuantity: 0,
    twoPoundQuantity: 0,
    hundredGramQuantity: 0,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleAddOrUpdateOrder = () => {
    if (newOrder.coffeeId) {
      if (isEditing) {
        dispatch({
          type: 'UPDATE_ORDER',
          order: newOrder,
        });
      } else {
        dispatch({
          type: 'ADD_ORDER',
          order: {
            ...newOrder,
            id: crypto.randomUUID(),
          },
        });
      }
      setNewOrder({
        id: '',
        coffeeId: '',
        retailQuantity: 0,
        fivePoundQuantity: 0,
        twoPoundQuantity: 0,
        hundredGramQuantity: 0,
      });
      setIsEditing(false);
    }
  };

  const handleEditOrder = (order: Order): void => {
    setNewOrder(order);
    setIsEditing(true);
  };

  const handleDeleteOrder = (orderId: string): void => {
    dispatch({ type: 'DELETE_ORDER', id: orderId });
  };

  const handleClearAll = () => {
    dispatch({ type: 'CLEAR_ORDERS' });
    dispatch({ type: 'CLEAR_ROASTING_REQUIREMENTS' });
    dispatch({ type: 'CLEAR_BAGGING_REQUIREMENTS' });
    // Reset inventory for all coffees
    state.coffees.forEach((coffee) => {
      dispatch({
        type: 'UPDATE_COFFEE',
        coffee: {
          ...coffee,
          roastedInventory: 0,
        },
      });
    });
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
            <label className="block text-sm font-medium text-gray-500">
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
            <label className="block text-sm font-medium text-gray-500">
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
            <label className="block text-sm font-medium text-gray-500">
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
            <label className="block text-sm font-medium text-gray-500">
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
          onClick={handleAddOrUpdateOrder}
        >
          {isEditing ? 'Update Order' : 'Add Order'}
        </button>
      </div>
      <button
        className="w-full p-2 bg-red-500 text-white rounded mt-4"
        onClick={handleClearAll}
      >
        Clear All
      </button>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Current Orders</h3>
        <div className="space-y-2">
          {state.orders.map((order) => (
            <div
              key={order.id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <h4 className="font-medium">
                  {state.coffees.find((c) => c.id === order.coffeeId)?.name ||
                    state.blends.find((b) => b.id === order.coffeeId)?.name}
                </h4>
                <p className="text-sm text-gray-500">
                  Retail: {order.retailQuantity} | 5lb: {order.fivePoundQuantity} | 2lb: {order.twoPoundQuantity} | 100g: {order.hundredGramQuantity}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                  onClick={() => handleEditOrder(order)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={() => handleDeleteOrder(order.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}