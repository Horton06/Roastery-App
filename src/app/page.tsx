'use client';

import React from 'react';
import { BlendManagement } from "@/components/BlendManagement";
import { CoffeeDatabase } from "@/components/CoffeeDatabase";
import { OrderEntry } from "@/components/OrderEntry";
import { RoastingRequirements } from "@/components/RoastingRequirements";
import { BaggingRequirements } from "@/components/BaggingRequirements";
import { CoffeeProvider } from "@/context/CoffeeContext";
import { Toaster } from "react-hot-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { InventoryManagement } from "@/components/InventoryManagement";

// App.tsx - Main Application Component
export default function App() {
  return (
    <CoffeeProvider>
      <Toaster />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">
          Coffee Roasting Production Management
        </h1>

        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="coffee">Coffee Database</TabsTrigger>
            <TabsTrigger value="blends">Blend Management</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="roasting">Roasting Requirements</TabsTrigger>
            <TabsTrigger value="bagging">Bagging Requirements</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <OrderEntry />
              <RoastingRequirements />
            </div>
          </TabsContent>

          <TabsContent value="coffee">
            <CoffeeDatabase />
          </TabsContent>

          <TabsContent value="blends">
            <BlendManagement />
          </TabsContent>

          <TabsContent value="inventory">
            <InventoryManagement />
          </TabsContent>

          <TabsContent value="roasting">
            <RoastingRequirements />
          </TabsContent>

          <TabsContent value="bagging">
            <BaggingRequirements />
          </TabsContent>
        </Tabs>
      </div>
    </CoffeeProvider>
  );
}