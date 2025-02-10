import React, { createContext } from 'react';
import { BlendRecipe } from '../types/CoffeeTypes'; // Adjust the path accordingly

interface CoffeeContextType {
  recipe: BlendRecipe;
  // other properties...
}

export const CoffeeContext = createContext<CoffeeContextType | null>(null);

// ...existing code...
