'use client';

import { useAuth } from '@/context/AuthContext';
import { LoginForm } from '@/components/LoginForm';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CoffeeProvider } from '@/context/CoffeeContext';
import { OrderEntry } from '@/components/OrderEntry';
import { RoastingRequirements } from '@/components/RoastingRequirements';
import { CoffeeDatabase } from '@/components/CoffeeDatabase';
import { BlendManagement } from '@/components/BlendManagement';
import { InventoryManagement } from '@/components/InventoryManagement';
import { BaggingRequirements } from '@/components/BaggingRequirements';

export default function Page() {
  const { auth, login, logout } = useAuth();

  if (!auth.isLoggedIn) {
    return <LoginForm onLogin={login} />;
  }
  
  return (
    <CoffeeProvider>
      <div className="container mx-auto p-4 bg-background border border-secondary rounded">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Image 
              src="/images/upshot-logo.png"
              alt="Upshot Coffee"
              width={150}
              height={50}
              priority
              className="h-auto"
            />
            <h1 className="text-3xl font-bold text-primary">
              Roasting Production Management
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span>{auth.userEmail}</span>
            <Button variant="outline" onClick={logout}>Sign Out</Button>
          </div>
        </div>

        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="roasting">Roasting Requirements</TabsTrigger>
            <TabsTrigger value="bagging">Bagging Requirements</TabsTrigger>
            <TabsTrigger value="coffee">Coffee Database</TabsTrigger>
            <TabsTrigger value="blends">Blend Management</TabsTrigger>
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