'use client';

import React, { createContext, useContext, useReducer } from 'react';
import { Coffee, BlendRecipe, Order, RoastingRequirement } from '../types';

interface CoffeeState {
  coffees: Coffee[];
  blends: BlendRecipe[];
  orders: Order[];
  roastingRequirements: RoastingRequirement[];
}

type CoffeeAction =
  | { type: 'ADD_COFFEE'; coffee: Coffee }
  | { type: 'UPDATE_COFFEE'; coffee: Coffee }
  | { type: 'DELETE_COFFEE'; id: string }
  | { type: 'ADD_BLEND'; blend: BlendRecipe }
  | { type: 'UPDATE_BLEND'; blend: BlendRecipe }
  | { type: 'DELETE_BLEND'; id: string }
  | { type: 'ADD_ORDER'; order: Order }
  | { type: 'UPDATE_REQUIREMENTS'; requirements: RoastingRequirement[] };

const initialState: CoffeeState = {
  coffees: [],
  blends: [],
  orders: [],
  roastingRequirements: [],
};

function coffeeReducer(state: CoffeeState, action: CoffeeAction): CoffeeState {
  switch (action.type) {
    case 'ADD_COFFEE':
      return { ...state, coffees: [...state.coffees, action.coffee] };
    case 'UPDATE_COFFEE':
      return {
        ...state,
        coffees: state.coffees.map((c) =>
          c.id === action.coffee.id ? action.coffee : c
        ),
      };
    case 'DELETE_COFFEE':
      return {
        ...state,
        coffees: state.coffees.filter((c) => c.id !== action.id),
      };
    case 'ADD_BLEND':
      return { ...state, blends: [...state.blends, action.blend] };
    case 'UPDATE_BLEND':
      return {
        ...state,
        blends: state.blends.map((b) =>
          b.id === action.blend.id ? action.blend : b
        ),
      };
    case 'DELETE_BLEND':
      return {
        ...state,
        blends: state.blends.filter((b) => b.id !== action.id),
      };
    case 'ADD_ORDER':
      return { ...state, orders: [...state.orders, action.order] };
    case 'UPDATE_REQUIREMENTS':
      return { ...state, roastingRequirements: action.requirements };
    default:
      return state;
  }
}

const CoffeeContext = createContext<{
  state: CoffeeState;
  dispatch: React.Dispatch<CoffeeAction>;
} | null>(null);

export function CoffeeProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(coffeeReducer, initialState);
  return (
    <CoffeeContext.Provider value={{ state, dispatch }}>
      {children}
    </CoffeeContext.Provider>
  );
}

export function useCoffee() {
  const context = useContext(CoffeeContext);
  if (!context) {
    throw new Error('useCoffee must be used within a CoffeeProvider');
  }
  return context;
}