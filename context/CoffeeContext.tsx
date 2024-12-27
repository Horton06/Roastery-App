import { createContext, useContext, useState, useEffect } from 'react';
import { Coffee, BlendRecipe, Order, RoastingRequirement } from '../types';
import { supabase } from '../lib/supabase';

interface CoffeeState {
  coffees: Coffee[];
  blends: BlendRecipe[];
  orders: Order[];
  roastingRequirements: RoastingRequirement[];
}

const CoffeeContext = createContext<CoffeeState | undefined>(undefined);

export const CoffeeProvider: React.FC = ({ children }) => {
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [blends] = useState<BlendRecipe[]>([]);
  const [orders] = useState<Order[]>([]);
  const [roastingRequirements] = useState<RoastingRequirement[]>([]);

  const loadData = async () => {
    const { data: coffeesData } = await supabase.from('coffees').select('*');
    if (coffeesData) {
      setCoffees(coffeesData);
    }
    // Fetch other data from Supabase and update state
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel('coffee_changes')
      .on('postgres_changes', { event: '*', schema: 'public' }, 
        () => {
          // Update state based on database changes
          loadData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <CoffeeContext.Provider value={{ coffees, blends, orders, roastingRequirements }}>
      {children}
    </CoffeeContext.Provider>
  );
};

export const useCoffee = () => {
  const context = useContext(CoffeeContext);
  if (context === undefined) {
    throw new Error('useCoffee must be used within a CoffeeProvider');
  }
  return context;
};
