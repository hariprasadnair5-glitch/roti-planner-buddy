import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Wifi, WifiOff, Thermometer, Clock, Settings, AlertCircle, Cpu } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import rotimatiMachine from "@/assets/rotimatic-machine.jpg";

interface ESP32Data {
  connected: boolean;
  temperature: number;
  isHeating: boolean;
  currentSchedule: string | null;
  rotisRemaining: number;
  lastUpdate: Date;
  batteryLevel?: number;
}

const ESP32Status = () => {
  const [esp32Data, setESP32Data] = useState<ESP32Data>({
    connected: false,
    temperature: 0,
    isHeating: false,
    currentSchedule: null,
    rotisRemaining: 0,
    lastUpdate: new Date(),
  });
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const { toast } = useToast();

  // Simulate ESP32 connection and data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate connection status and data
      setESP32Data(prev => ({
        ...prev,
        connected: Math.random() > 0.1, // 90% connected
        temperature: 180 + Math.random() * 40,
        isHeating: Math.random() > 0.6,
        rotisRemaining: Math.floor(Math.random() * 8),
        lastUpdate: new Date(),
        batteryLevel: 85 + Math.random() * 15,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const connectToESP32 = async () => {
    setConnectionAttempts(prev => prev + 1);
    
    try {
      // Replace with your actual ESP32 endpoint
      // const response = await fetch('http://your-esp32-ip/status');
      // const data = await response.json();
      
      // Simulate connection
      setTimeout(() => {
        setESP32Data(prev => ({ ...prev, connected: true }));
        toast({
          title: "ESP32 Connected",
          description: "Successfully connected to your Rotimatic board",
        });
      }, 1000);
      
    } catch (error) {
      toast({
        title: "Connection Failed", 
        description: "Unable to connect to ESP32. Check your network settings.",
        variant: "destructive"
      });
    }
  };

  const sendEmergencyStop = () => {
    // Send emergency stop command to ESP32
    toast({
      title: "Emergency Stop",
      description: "Emergency stop signal sent to Rotimatic",
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card className={`relative overflow-hidden border-2 transition-colors duration-300 ${
        esp32Data.connected 
          ? 'border-primary/30 bg-gradient-to-br from-primary/5 to-primary-glow/10' 
          : 'border-destructive/30 bg-gradient-to-br from-destructive/5 to-destructive/10'
      }`}>
        <div 
          className="absolute bottom-0 right-0 w-40 h-32 bg-cover bg-center opacity-20 rounded-tl-3xl"
          style={{ backgroundImage: `url(${rotimatiMachine})` }}
        />
        <CardHeader>
          <CardTitle className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Cpu className="h-5 w-5 text-primary" />
              </div>
              ESP32 Board Status
            </div>
            <Badge variant={esp32Data.connected ? "default" : "destructive"}>
              {esp32Data.connected ? "Connected" : "Disconnected"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-background/60 rounded-lg">
                <Thermometer className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Temperature</div>
                  <div className="font-semibold">{esp32Data.temperature.toFixed(1)}°C</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-background/60 rounded-lg">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Status</div>
                  <div className="font-semibold">
                    {esp32Data.isHeating ? "Heating" : "Ready"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-background/60 rounded-lg">
                <Settings className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Rotis Queue</div>
                  <div className="font-semibold">{esp32Data.rotisRemaining} remaining</div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button 
                onClick={connectToESP32}
                disabled={esp32Data.connected}
                variant={esp32Data.connected ? "secondary" : "default"}
                className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90"
              >
                {esp32Data.connected ? "Connected" : "Connect to ESP32"}
              </Button>
              
              <Button 
                onClick={sendEmergencyStop}
                variant="destructive"
                className="bg-gradient-to-r from-destructive to-destructive/80"
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                Emergency Stop
              </Button>
            </div>

            {!esp32Data.connected && (
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Setup Instructions:</strong> Ensure your ESP32 board is connected to the same network. 
                  Update the IP address in the app settings to match your ESP32's IP.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Activity */}
      {esp32Data.connected && (
        <Card>
          <CardHeader>
            <CardTitle>Live Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                <span className="text-sm">Last Update</span>
                <span className="text-sm font-medium">
                  {esp32Data.lastUpdate.toLocaleTimeString()}
                </span>
              </div>
              
              {esp32Data.batteryLevel && (
                <div className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                  <span className="text-sm">Battery Level</span>
                  <Badge variant={esp32Data.batteryLevel > 20 ? "secondary" : "destructive"}>
                    {esp32Data.batteryLevel.toFixed(0)}%
                  </Badge>
                </div>
              )}
              
              <div className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                <span className="text-sm">Heating Element</span>
                <Badge variant={esp32Data.isHeating ? "default" : "secondary"}>
                  {esp32Data.isHeating ? "Active" : "Idle"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ESP32Status;