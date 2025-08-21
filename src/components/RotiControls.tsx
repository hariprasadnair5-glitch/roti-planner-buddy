import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChefHat, Play, Square, RotateCw, Thermometer, Timer, Gauge } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface RotiSettings {
  thickness: number;
  temperature: number;
  quantity: number;
  oilLevel: 'none' | 'light' | 'medium' | 'heavy';
  cookTime: number;
}

const RotiControls = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [settings, setSettings] = useState<RotiSettings>({
    thickness: 3,
    temperature: 200,
    quantity: 4,
    oilLevel: 'light',
    cookTime: 45
  });
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const startRotiMaking = () => {
    setIsRunning(true);
    setProgress(0);

    // Simulate roti making progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          toast({
            title: "Rotis Complete!",
            description: `${settings.quantity} fresh rotis are ready to serve`,
          });
          return 0;
        }
        return prev + 2;
      });
    }, 200);

    toast({
      title: "Starting Roti Production",
      description: `Making ${settings.quantity} rotis at ${settings.temperature}°C`,
    });
  };

  const stopRotiMaking = () => {
    setIsRunning(false);
    setProgress(0);
    toast({
      title: "Production Stopped",
      description: "Roti making has been halted",
      variant: "destructive"
    });
  };

  const sendSettingsToESP32 = () => {
    // This would send settings to your ESP32
    const payload = {
      thickness: settings.thickness,
      temperature: settings.temperature,
      quantity: settings.quantity,
      oilLevel: settings.oilLevel,
      cookTime: settings.cookTime
    };

    console.log('ESP32 Settings:', payload);
    
    toast({
      title: "Settings Updated",
      description: "Roti preferences sent to ESP32 board",
    });
  };

  return (
    <div className="space-y-6">
      {/* Manual Controls */}
      <Card className="bg-gradient-to-br from-card via-card to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-primary" />
            Manual Roti Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Thickness Control */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Gauge className="h-4 w-4" />
              Thickness: {settings.thickness}mm
            </Label>
            <Slider
              value={[settings.thickness]}
              onValueChange={(value) => setSettings({...settings, thickness: value[0]})}
              max={8}
              min={1}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Thin (1mm)</span>
              <span>Thick (8mm)</span>
            </div>
          </div>

          {/* Temperature Control */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Thermometer className="h-4 w-4" />
              Temperature: {settings.temperature}°C
            </Label>
            <Slider
              value={[settings.temperature]}
              onValueChange={(value) => setSettings({...settings, temperature: value[0]})}
              max={250}
              min={150}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low Heat (150°C)</span>
              <span>High Heat (250°C)</span>
            </div>
          </div>

          {/* Cook Time */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Timer className="h-4 w-4" />
              Cook Time: {settings.cookTime}s
            </Label>
            <Slider
              value={[settings.cookTime]}
              onValueChange={(value) => setSettings({...settings, cookTime: value[0]})}
              max={120}
              min={20}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Quick (20s)</span>
              <span>Well-done (120s)</span>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Quantity</Label>
              <Select 
                value={settings.quantity.toString()} 
                onValueChange={(value) => setSettings({...settings, quantity: parseInt(value)})}
              >
                <SelectTrigger className="bg-background/80">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6,8,10,12].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num} rotis</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Oil Level</Label>
              <Select 
                value={settings.oilLevel} 
                onValueChange={(value: any) => setSettings({...settings, oilLevel: value})}
              >
                <SelectTrigger className="bg-background/80">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Oil</SelectItem>
                  <SelectItem value="light">Light Oil</SelectItem>
                  <SelectItem value="medium">Medium Oil</SelectItem>
                  <SelectItem value="heavy">Heavy Oil</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-border/50">
            {!isRunning ? (
              <Button 
                onClick={startRotiMaking}
                className="flex-1 bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 shadow-warm transition-all duration-300"
              >
                <Play className="h-4 w-4 mr-2" />
                Start Making Rotis
              </Button>
            ) : (
              <Button 
                onClick={stopRotiMaking}
                variant="destructive"
                className="flex-1"
              >
                <Square className="h-4 w-4 mr-2" />
                Stop Production
              </Button>
            )}
            
            <Button 
              onClick={sendSettingsToESP32}
              variant="outline"
              className="bg-gradient-to-r from-secondary to-accent border-primary/20 hover:from-secondary/80 hover:to-accent/80"
            >
              <RotateCw className="h-4 w-4 mr-2" />
              Update ESP32
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress Display */}
      {isRunning && (
        <Card className="border-primary/30 bg-gradient-to-r from-primary/10 to-primary-glow/10">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Making Rotis...</span>
              <Badge variant="default" className="bg-primary">
                {Math.floor(progress)}% Complete
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="w-full bg-secondary rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-primary to-primary-glow h-3 rounded-full transition-all duration-300 shadow-glow"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Rotis Made:</span>
                  <span className="ml-2 font-semibold">
                    {Math.floor((progress / 100) * settings.quantity)}/{settings.quantity}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Est. Time Left:</span>
                  <span className="ml-2 font-semibold">
                    {Math.ceil(((100 - progress) / 100) * (settings.quantity * settings.cookTime))}s
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RotiControls;