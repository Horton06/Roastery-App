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

  // Calculate total batches needed
  const totalBatches = state.roastingRequirements.reduce((sum, req) => sum + req.batchesNeeded, 0);
  const estimatedRoastingTimeMinutes = totalBatches * 19; // 19 minutes per batch
  const estimatedRoastingTimeHours = Math.floor(estimatedRoastingTimeMinutes / 60);
  const estimatedRoastingTimeRemainingMinutes = estimatedRoastingTimeMinutes % 60;

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
      <div className="flex justify-between items-center border-t pt-2 mt-4">
        <span>Estimated Roasting Time</span>
        <span className="font-medium">
          {estimatedRoastingTimeHours} hours {estimatedRoastingTimeRemainingMinutes} minutes
        </span>
      </div>
    </div>
  );
}