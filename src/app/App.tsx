'use client';

import React, { useState } from 'react';
import { CoffeeProvider } from '../context/CoffeeContext';
import { CoffeeDatabase } from '../components/CoffeeDatabase';
import { BlendManagement } from '../components/BlendManagement';
import { OrderEntry } from '../components/OrderEntry';
import { RoastingRequirements } from '../components/RoastingRequirements';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/Tabs';

export default function App() {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <CoffeeProvider>
      <div className="container mx-auto p-4 bg-background border border-secondary rounded">
        <h1 className="text-3xl font-bold mb-8 text-primary">
          Coffee Roasting Production Management
        </h1>

        <Tabs defaultValue="orders" className="space-y-4" activeTab={activeTab} setActiveTab={setActiveTab}>
          <TabsList>
            <TabsTrigger value="orders" activeTab={activeTab} setActiveTab={setActiveTab}>Orders</TabsTrigger>
            <TabsTrigger value="coffee" activeTab={activeTab} setActiveTab={setActiveTab}>Coffee Database</TabsTrigger>
            <TabsTrigger value="blends" activeTab={activeTab} setActiveTab={setActiveTab}>Blend Management</TabsTrigger>
            <TabsTrigger value="roasting" activeTab={activeTab} setActiveTab={setActiveTab}>Roasting Requirements</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" activeTab={activeTab}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <OrderEntry />
              <RoastingRequirements />
            </div>
          </TabsContent>

          <TabsContent value="coffee" activeTab={activeTab}>
            <CoffeeDatabase />
          </TabsContent>

          <TabsContent value="blends" activeTab={activeTab}>
            <BlendManagement />
          </TabsContent>

          <TabsContent value="roasting" activeTab={activeTab}>
            <RoastingRequirements />
          </TabsContent>
        </Tabs>
      </div>
    </CoffeeProvider>
  );
}