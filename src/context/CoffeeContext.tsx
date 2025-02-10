'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
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
  | { type: 'UPDATE_ORDER'; order: Order }
  | { type: 'DELETE_ORDER'; id: string }
  | { type: 'UPDATE_REQUIREMENTS'; requirements: RoastingRequirement[] }
  | { type: 'CLEAR_ORDERS' }
  | { type: 'CLEAR_ROASTING_REQUIREMENTS' }
  | { type: 'CLEAR_BAGGING_REQUIREMENTS' }
  | { type: 'LOAD_STATE'; state: CoffeeState };

const initialState: CoffeeState = {
  coffees: [],
  blends: [],
  orders: [],
  roastingRequirements: [],
};

// Load state from localStorage
const loadState = (): CoffeeState => {
  if (typeof window === 'undefined') return initialState;
  try {
    const savedState = localStorage.getItem('coffeeState');
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error('Error loading state:', error);
  }
  return initialState;
};

// Save state to localStorage
const saveState = (state: CoffeeState) => {
  try {
    localStorage.setItem('coffeeState', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

function coffeeReducer(state: CoffeeState, action: CoffeeAction): CoffeeState {
  let newState: CoffeeState;

  switch (action.type) {
    case 'LOAD_STATE':
      return action.state;
    case 'ADD_COFFEE':
      newState = { ...state, coffees: [...state.coffees, action.coffee] };
      break;
    case 'UPDATE_COFFEE':
      newState = {
        ...state,
        coffees: state.coffees.map((c) =>
          c.id === action.coffee.id ? action.coffee : c
        ),
      };
      break;
    case 'DELETE_COFFEE':
      newState = {
        ...state,
        coffees: state.coffees.filter((c) => c.id !== action.id),
      };
      break;
    case 'ADD_BLEND':
      newState = { ...state, blends: [...state.blends, action.blend] };
      break;
    case 'UPDATE_BLEND':
      newState = {
        ...state,
        blends: state.blends.map((b) =>
          b.id === action.blend.id ? action.blend : b
        ),
      };
      break;
    case 'DELETE_BLEND':
      newState = {
        ...state,
        blends: state.blends.filter((b) => b.id !== action.id),
      };
      break;
    case 'ADD_ORDER':
      newState = { ...state, orders: [...state.orders, action.order] };
      break;
    case 'UPDATE_ORDER':
      newState = {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.order.id ? action.order : order
        ),
      };
      break;
    case 'DELETE_ORDER':
      newState = {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.id),
      };
      break;
    case 'UPDATE_REQUIREMENTS':
      newState = { ...state, roastingRequirements: action.requirements };
      break;
    case 'CLEAR_ORDERS':
      newState = { ...state, orders: [] };
      break;
    case 'CLEAR_ROASTING_REQUIREMENTS':
      newState = { ...state, roastingRequirements: [] };
      break;
    case 'CLEAR_BAGGING_REQUIREMENTS':
      newState = { ...state, roastingRequirements: [] };
      break;
    default:
      return state;
  }

  // Save state after each change
  saveState(newState);
  return newState;
}

const CoffeeContext = createContext<{
  state: CoffeeState;
  dispatch: React.Dispatch<CoffeeAction>;
} | null>(null);

export function CoffeeProvider({ children }: { children: React.ReactNode }) {
  // Initialize with data from localStorage
  const [state, dispatch] = useReducer(coffeeReducer, initialState);

  // Load saved state on initial mount
  useEffect(() => {
    const savedState = loadState();
    dispatch({ type: 'LOAD_STATE', state: savedState });
  }, []);

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