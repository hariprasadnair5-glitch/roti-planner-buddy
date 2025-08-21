import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RotiScheduler from '@/components/RotiScheduler';
import ESP32Status from '@/components/ESP32Status';
import RotiControls from '@/components/RotiControls';
import { ChefHat, Calendar, Wifi, Settings } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary-glow to-primary p-6 shadow-warm">
        <div className="container mx-auto">
          <div className="flex items-center gap-3">
            <ChefHat className="h-8 w-8 text-primary-foreground" />
            <div>
              <h1 className="text-3xl font-bold text-primary-foreground">Roti Planner Buddy</h1>
              <p className="text-primary-foreground/80">Your autonomous rotimatic companion</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        <Tabs defaultValue="scheduler" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-card/80 p-1">
            <TabsTrigger value="scheduler" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Scheduler
            </TabsTrigger>
            <TabsTrigger value="controls" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Controls
            </TabsTrigger>
            <TabsTrigger value="status" className="flex items-center gap-2">
              <Wifi className="h-4 w-4" />
              ESP32 Status
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scheduler">
            <RotiScheduler />
          </TabsContent>

          <TabsContent value="controls">
            <RotiControls />
          </TabsContent>

          <TabsContent value="status">
            <ESP32Status />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
