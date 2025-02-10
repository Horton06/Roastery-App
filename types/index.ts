export interface Coffee {
  id: string;
  name: string;
  retailSize: number;
  batchSize: number;
  roastedInventory: number;
  isBlendOnly: boolean;
}

export interface BlendRecipe {
  id: string;
  name: string;
  components: {
    coffeeId: string;
    percentage: number;
  }[];
}

export interface Order {
  id: string;
  customerName: string;
  items: {
    coffeeId: string;
    amount: number;
  }[];
  status: 'pending' | 'processing' | 'completed';
  createdAt: Date;
}

export interface RoastingRequirement {
  id: string;
  coffeeId: string;
  amount: number;
  dueDate: Date;
  status: 'pending' | 'in-progress' | 'completed';
  notes?: string;
}
