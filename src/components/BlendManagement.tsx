'use client';

import React from 'react';
import { useCoffee } from '../context/CoffeeContext';
import { BlendComponent } from '../types';

interface BlendState {
    name: string;
    components: BlendComponent[];
    retailSize: number;
    roastedInventory: number;
  }

export function BlendManagement() {
  const { state, dispatch } = useCoffee();
  const [newBlend, setNewBlend] = React.useState<BlendState>({    name: '',
    components: [],
    retailSize: 283,
    roastedInventory: 0,
  });

  const handleAddComponent = () => {
    if (newBlend.components.length < 3) {
      setNewBlend({
        ...newBlend,
        components: [...newBlend.components, { coffeeId: '', percentage: 0 }],
      });
    }
  };

  const handleUpdateComponent = (
    index: number,
    field: keyof BlendComponent,
    value: string | number
  ) => {
    const updatedComponents = [...newBlend.components];
    updatedComponents[index] = {
      ...updatedComponents[index],
      [field]: field === 'percentage' ? parseFloat(value as string) : value,
    };
    setNewBlend({ ...newBlend, components: updatedComponents });
  };

  const handleAddBlend = () => {
    const totalPercentage = newBlend.components.reduce(
      (sum, comp) => sum + comp.percentage,
      0
    );

    if (
      newBlend.name &&
      newBlend.components.length > 0 &&
      Math.abs(totalPercentage - 100) < 0.01
    ) {
      dispatch({
        type: 'ADD_BLEND',
        blend: {
          id: crypto.randomUUID(),
          ...newBlend,
        },
      });
      setNewBlend({
        name: '',
        components: [],
        retailSize: 283,
        roastedInventory: 0,
      });
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Blend Management</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Blend Name"
          className="w-full p-2 border rounded"
          value={newBlend.name}
          onChange={(e) => setNewBlend({ ...newBlend, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Retail Size (g)"
          className="w-full p-2 border rounded"
          value={newBlend.retailSize}
          onChange={(e) =>
            setNewBlend({ ...newBlend, retailSize: parseFloat(e.target.value) })
          }
        />

        {newBlend.components.map((component, index) => (
          <div key={index} className="grid grid-cols-2 gap-2">
            <select
              className="p-2 border rounded"
              value={component.coffeeId}
              onChange={(e) =>
                handleUpdateComponent(index, 'coffeeId', e.target.value)
              }
            >
              <option value="">Select Coffee</option>
              {state.coffees
                .filter((c) => !c.isSingleOrigin || c.isBlendOnly)
                .map((coffee) => (
                  <option key={coffee.id} value={coffee.id}>
                    {coffee.name}
                  </option>
                ))}
            </select>
            <input
              type="number"
              placeholder="Percentage"
              className="p-2 border rounded"
              value={component.percentage}
              onChange={(e) =>
                handleUpdateComponent(index, 'percentage', e.target.value)
              }
            />
          </div>
        ))}

        <button
          className="w-full p-2 bg-green-500 text-white rounded"
          onClick={handleAddComponent}
          disabled={newBlend.components.length >= 3}
        >
          Add Component
        </button>

        <button
          className="w-full p-2 bg-blue-500 text-white rounded"
          onClick={handleAddBlend}
        >
          Create Blend
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Current Blends</h3>
        <div className="space-y-2">
          {state.blends.map((blend) => (
            <div
              key={blend.id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <h4 className="font-medium">{blend.name}</h4>
                <div className="text-sm text-gray-500">
                  {blend.components.map((component) => {
                    const coffee = state.coffees.find(
                      (c) => c.id === component.coffeeId
                    );
                    return (
                      <div key={component.coffeeId}>
                        {coffee?.name}: {component.percentage}%
                      </div>
                    );
                  })}
                </div>
              </div>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded"
                onClick={() => dispatch({ type: 'DELETE_BLEND', id: blend.id })}
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