import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RotiScheduler from '@/components/RotiScheduler';
import ESP32Status from '@/components/ESP32Status';
import RotiControls from '@/components/RotiControls';
import { ChefHat, Calendar, Wifi, Settings } from 'lucide-react';
import heroRoti from "@/assets/hero-roti.jpg";
import rotiStack from "@/assets/roti-stack.jpg";
import rotimatiMachine from "@/assets/rotimatic-machine.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary-glow/5 to-accent/10">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroRoti})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/80" />
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-6">
              🫓 Roti Planner Buddy
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your smart companion for automated roti making with ESP32 control
            </p>
            <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
              <div className="flex items-center gap-4 p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
                <img src={rotiStack} alt="Fresh Rotis" className="w-16 h-12 object-cover rounded-lg" />
                <div className="text-left">
                  <p className="font-semibold text-foreground">Fresh & Warm</p>
                  <p className="text-sm text-muted-foreground">Perfect rotis every time</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
                <img src={rotimatiMachine} alt="Automatic Machine" className="w-16 h-12 object-cover rounded-lg" />
                <div className="text-left">
                  <p className="font-semibold text-foreground">Automated</p>
                  <p className="text-sm text-muted-foreground">ESP32 controlled precision</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        <Tabs defaultValue="scheduler" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-card/80 p-1 backdrop-blur-sm">
            <TabsTrigger value="scheduler" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-primary-glow/20">
              <Calendar className="h-4 w-4" />
              Scheduler
            </TabsTrigger>
            <TabsTrigger value="controls" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-primary-glow/20">
              <Settings className="h-4 w-4" />
              Controls
            </TabsTrigger>
            <TabsTrigger value="status" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-primary-glow/20">
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
