'use client';

import React, { useEffect } from 'react';
import { useCoffee } from '../context/CoffeeContext';
import { calculateTotalPoundsNeeded, calculateBatchesNeeded } from '../utils/calculations';
export function RoastingRequirements() {
  const { state, dispatch } = useCoffee();

  useEffect(() => {
    const requirements = state.coffees.map((coffee) => {
      const totalPounds = calculateTotalPoundsNeeded(
        coffee,
        state.orders,
        state.blends
      );
      const batchesNeeded = calculateBatchesNeeded(coffee, totalPounds);

      return {
        coffeeId: coffee.id,
        totalPounds,
        batchesNeeded,
        inventoryAdjusted: coffee.roastedInventory > 0,
      };
    });

    dispatch({ type: 'UPDATE_REQUIREMENTS', requirements });
  }, [state.orders, state.coffees, state.blends, dispatch]);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Roasting Requirements</h2>
      <div className="space-y-4">
        {state.roastingRequirements.map((requirement) => {
          const coffee = state.coffees.find(
            (c) => c.id === requirement.coffeeId
          );
          if (!coffee) return null;

          return (
            <div
              key={requirement.coffeeId}
              className="p-4 border rounded"
            >
              <div className="space-y-2">
                <h4 className="font-medium">{coffee.name}</h4>
                <p>Total Pounds Needed: {requirement.totalPounds.toFixed(2)}</p>
                <p>Batches Required: {requirement.batchesNeeded}</p>
                {requirement.inventoryAdjusted && (
                  <p className="text-green-600">
                    Includes {coffee.roastedInventory}lbs from inventory
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}