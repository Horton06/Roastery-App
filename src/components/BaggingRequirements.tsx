import React from 'react';
import { useCoffee } from '../context/CoffeeContext';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface BagTotals {
  retail: { [key: string]: number };
  fivePound: { [key: string]: number };
  twoPound: { [key: string]: number };
  hundredGram: { [key: string]: number };
}

export function BaggingRequirements() {
  const { state } = useCoffee();
  
  // Calculate bag totals for all orders
  const calculateBagTotals = (): BagTotals => {
    const totals: BagTotals = {
      retail: {},
      fivePound: {},
      twoPound: {},
      hundredGram: {}
    };
    
    state.orders.forEach(order => {
      const coffee = state.coffees.find(c => c.id === order.coffeeId);
      const blend = state.blends.find(b => b.id === order.coffeeId);
      
      if (coffee || blend) {
        // Get the name and retail size
        const name = coffee ? coffee.name : blend!.name;
        const retailSize = coffee ? coffee.retailSize : blend!.retailSize;
        
        // Initialize retail entry if it doesn't exist
        if (!totals.retail[`${retailSize}g - ${name}`]) {
          totals.retail[`${retailSize}g - ${name}`] = 0;
        }
        if (!totals.fivePound[name]) {
          totals.fivePound[name] = 0;
        }
        if (!totals.twoPound[name]) {
          totals.twoPound[name] = 0;
        }
        if (!totals.hundredGram[name]) {
          totals.hundredGram[name] = 0;
        }
        
        // Add to totals
        totals.retail[`${retailSize}g - ${name}`] += order.retailQuantity;
        totals.fivePound[name] += order.fivePoundQuantity;
        totals.twoPound[name] += order.twoPoundQuantity;
        totals.hundredGram[name] += order.hundredGramQuantity;
      }
    });
    
    return totals;
  };
  
  const bagTotals = calculateBagTotals();

  // Calculate total bags for each category
  const totalRetailBags = Object.values(bagTotals.retail).reduce((sum, qty) => sum + qty, 0);
  const totalFivePoundBags = Object.values(bagTotals.fivePound).reduce((sum, qty) => sum + qty, 0);
  const totalTwoPoundBags = Object.values(bagTotals.twoPound).reduce((sum, qty) => sum + qty, 0);
  const totalHundredGramBags = Object.values(bagTotals.hundredGram).reduce((sum, qty) => sum + qty, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bagging Requirements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Retail Bags */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Retail Bags</h3>
            <div className="space-y-2">
              {Object.entries(bagTotals.retail).map(([size, quantity]) => (
                <div key={size} className="flex justify-between items-center border-b pb-2">
                  <span>{size}</span>
                  <span className="font-medium">{quantity} bags</span>
                </div>
              ))}
              <div className="flex justify-between items-center border-t pt-2">
                <span>Total Retail Bags</span>
                <span className="font-medium">{totalRetailBags} bags</span>
              </div>
            </div>
          </div>
          
          {/* Bulk Bags */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Bulk Bags</h3>
            <div className="space-y-2">
              {Object.entries(bagTotals.fivePound).map(([name, quantity]) => (
                quantity > 0 && (
                  <div key={name} className="flex justify-between items-center border-b pb-2">
                    <span>5 lb Bags - {name}</span>
                    <span className="font-medium">{quantity} bags</span>
                  </div>
                )
              ))}
              <div className="flex justify-between items-center border-t pt-2">
                <span>Total 5 lb Bags</span>
                <span className="font-medium">{totalFivePoundBags} bags</span>
              </div>
              {Object.entries(bagTotals.twoPound).map(([name, quantity]) => (
                quantity > 0 && (
                  <div key={name} className="flex justify-between items-center border-b pb-2">
                    <span>2 lb Bags - {name}</span>
                    <span className="font-medium">{quantity} bags</span>
                  </div>
                )
              ))}
              <div className="flex justify-between items-center border-t pt-2">
                <span>Total 2 lb Bags</span>
                <span className="font-medium">{totalTwoPoundBags} bags</span>
              </div>
              {Object.entries(bagTotals.hundredGram).map(([name, quantity]) => (
                quantity > 0 && (
                  <div key={name} className="flex justify-between items-center border-b pb-2">
                    <span>100g Bags - {name}</span>
                    <span className="font-medium">{quantity} bags</span>
                  </div>
                )
              ))}
              <div className="flex justify-between items-center border-t pt-2">
                <span>Total 100g Bags</span>
                <span className="font-medium">{totalHundredGramBags} bags</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}