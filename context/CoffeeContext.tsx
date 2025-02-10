'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Coffee, BlendRecipe, Order, RoastingRequirement } from '../types';
import { supabase } from '@/lib/supabase-client';

interface CoffeeState {
  coffees: Coffee[];
  blends: BlendRecipe[];
  orders: Order[];
  roastingRequirements: RoastingRequirement[];
}

export const CoffeeContext = createContext<{
  state: CoffeeState;
  dispatch: React.Dispatch<CoffeeAction>;
} | undefined>(undefined);

const initialState: CoffeeState = {
  coffees: [],
  blends: [],
  orders: [],
  roastingRequirements: []
};

type CoffeeAction =
  | { type: 'LOAD_STATE'; state: CoffeeState }
  | { type: 'ADD_COFFEE'; coffee: Coffee }
  | { type: 'UPDATE_COFFEE'; coffee: Coffee }
  | { type: 'DELETE_COFFEE'; id: string };

function coffeeReducer(state: CoffeeState, action: CoffeeAction): CoffeeState {
  switch (action.type) {
    case 'LOAD_STATE':
      return action.state;
    case 'ADD_COFFEE':
      return { ...state, coffees: [...state.coffees, action.coffee] };
    case 'UPDATE_COFFEE':
      return {
        ...state,
        coffees: state.coffees.map(coffee =>
          coffee.id === action.coffee.id ? action.coffee : coffee
        )
      };
    case 'DELETE_COFFEE':
      return {
        ...state,
        coffees: state.coffees.filter(coffee => coffee.id !== action.id)
      };
    default:
      return state;
  }
}

async function loadFromSupabase(): Promise<CoffeeState> {
  const { data: coffees } = await supabase.from('coffees').select('*');
  const { data: blends } = await supabase.from('blends').select('*, blend_components(*)');
  const { data: orders } = await supabase.from('orders').select('*');
  const { data: roastingRequirements } = await supabase.from('roasting_requirements').select('*');

  return {
    coffees: coffees || [],
    blends: blends || [],
    orders: orders || [],
    roastingRequirements: roastingRequirements || []
  };
}

async function saveToSupabase(state: CoffeeState, action: CoffeeAction) {
  switch (action.type) {
    case 'ADD_COFFEE':
      await supabase.from('coffees').insert(action.coffee);
      break;
    case 'UPDATE_COFFEE':
      await supabase.from('coffees').update(action.coffee).eq('id', action.coffee.id);
      break;
    case 'DELETE_COFFEE':
      await supabase.from('coffees').delete().eq('id', action.id);
      break;
    // ... similar for other actions ...
  }
}

export function CoffeeProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(coffeeReducer, initialState);

  useEffect(() => {
    loadFromSupabase().then(data => {
      dispatch({ type: 'LOAD_STATE', state: data });
    });

    const channel = supabase
      .channel('db-changes')
      .on('postgres_changes', { event: '*', schema: 'public' }, () => {
        loadFromSupabase().then(data => {
          dispatch({ type: 'LOAD_STATE', state: data });
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const wrappedDispatch: React.Dispatch<CoffeeAction> = async (action: CoffeeAction) => {
    await saveToSupabase(state, action);
    dispatch(action);
  };

  return (
    <CoffeeContext.Provider value={{ state, dispatch: wrappedDispatch }}>
      {children}
    </CoffeeContext.Provider>
  );
}

export const useCoffee = () => {
  const context = useContext(CoffeeContext);
  if (context === undefined) {
    throw new Error('useCoffee must be used within a CoffeeProvider');
  }
  return context;
};
