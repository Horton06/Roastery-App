export interface Coffee {
    id: string;
    name: string;
    batchSize: number;
    roastedInventory: number;
    retailSize: number;
    isBlendOnly: boolean;
    isSingleOrigin: boolean;
  }
  
  export interface BlendComponent {
    coffeeId: string;
    percentage: number;
  }
  
  export interface BlendRecipe {
    id: string;
    name: string;
    components: BlendComponent[];
    retailSize: number;
    roastedInventory: number;
  }
  
  export interface Order {
    id: string;
    coffeeId: string;
    retailQuantity: number;
    fivePoundQuantity: number;
    twoPoundQuantity: number;
    hundredGramQuantity: number;
  }
  
  export interface RoastingRequirement {
    coffeeId: string;
    totalPounds: number;
    batchesNeeded: number;
    inventoryAdjusted: boolean;
  }
  
  export const WEIGHT_LOSS_FACTOR = 0.15;
  export const BUFFER_FACTOR = 0.12;
  export const HUNDRED_GRAMS_TO_POUNDS = 0.22;