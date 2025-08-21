import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Plus, Trash2, Play, Pause } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface MealSchedule {
  id: string;
  time: string;
  quantity: number;
  thickness: 'thin' | 'medium' | 'thick';
  temperature: number;
  active: boolean;
}

const RotiScheduler = () => {
  const [schedules, setSchedules] = useState<MealSchedule[]>([]);
  const [newSchedule, setNewSchedule] = useState({
    time: '',
    quantity: 4,
    thickness: 'medium' as const,
    temperature: 200
  });
  const { toast } = useToast();

  const addSchedule = () => {
    if (!newSchedule.time) {
      toast({
        title: "Time Required",
        description: "Please select a time for your meal schedule",
        variant: "destructive"
      });
      return;
    }

    const schedule: MealSchedule = {
      id: Date.now().toString(),
      ...newSchedule,
      active: true
    };

    setSchedules([...schedules, schedule]);
    setNewSchedule({
      time: '',
      quantity: 4,
      thickness: 'medium',
      temperature: 200
    });

    toast({
      title: "Schedule Added",
      description: `Meal scheduled for ${newSchedule.time} - ${newSchedule.quantity} rotis`,
    });
  };

  const toggleSchedule = (id: string) => {
    setSchedules(schedules.map(s => 
      s.id === id ? { ...s, active: !s.active } : s
    ));
  };

  const deleteSchedule = (id: string) => {
    setSchedules(schedules.filter(s => s.id !== id));
    toast({
      title: "Schedule Deleted",
      description: "Meal schedule removed successfully",
    });
  };

  const sendToESP32 = async (schedule: MealSchedule) => {
    // This would connect to your ESP32 board
    const payload = {
      time: schedule.time,
      quantity: schedule.quantity,
      thickness: schedule.thickness,
      temperature: schedule.temperature
    };

    toast({
      title: "Sent to Rotimatic",
      description: `Schedule sent to ESP32 board for ${schedule.time}`,
    });

    // Example ESP32 communication (replace with your actual endpoint)
    try {
      // await fetch('http://your-esp32-ip/schedule', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload)
      // });
      console.log('ESP32 payload:', payload);
    } catch (error) {
      console.error('ESP32 connection error:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Schedule */}
      <Card className="border-border bg-gradient-to-br from-card via-card to-accent/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Schedule New Meal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="time">Meal Time</Label>
              <Input
                id="time"
                type="time"
                value={newSchedule.time}
                onChange={(e) => setNewSchedule({...newSchedule, time: e.target.value})}
                className="bg-background/80"
              />
            </div>
            <div>
              <Label htmlFor="quantity">Quantity (Rotis)</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max="20"
                value={newSchedule.quantity}
                onChange={(e) => setNewSchedule({...newSchedule, quantity: parseInt(e.target.value)})}
                className="bg-background/80"
              />
            </div>
            <div>
              <Label htmlFor="thickness">Thickness</Label>
              <Select value={newSchedule.thickness} onValueChange={(value: any) => setNewSchedule({...newSchedule, thickness: value})}>
                <SelectTrigger className="bg-background/80">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="thin">Thin</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="thick">Thick</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="temperature">Temperature (°C)</Label>
              <Input
                id="temperature"
                type="number"
                min="150"
                max="250"
                value={newSchedule.temperature}
                onChange={(e) => setNewSchedule({...newSchedule, temperature: parseInt(e.target.value)})}
                className="bg-background/80"
              />
            </div>
          </div>
          <Button 
            onClick={addSchedule} 
            className="w-full bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 shadow-warm transition-all duration-300"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add to Schedule
          </Button>
        </CardContent>
      </Card>

      {/* Current Schedules */}
      <Card>
        <CardHeader>
          <CardTitle>Meal Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          {schedules.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No meals scheduled yet. Add your first meal above!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {schedules.map((schedule) => (
                <div key={schedule.id} className="flex items-center justify-between p-4 bg-accent/30 rounded-lg border border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="font-medium text-lg">{schedule.time}</div>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{schedule.quantity} rotis</Badge>
                      <Badge variant="outline">{schedule.thickness}</Badge>
                      <Badge variant="outline">{schedule.temperature}°C</Badge>
                      <Badge variant={schedule.active ? "default" : "secondary"}>
                        {schedule.active ? "Active" : "Paused"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleSchedule(schedule.id)}
                    >
                      {schedule.active ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => sendToESP32(schedule)}
                      className="bg-gradient-to-r from-primary/10 to-primary-glow/10 border-primary/30 hover:from-primary/20 hover:to-primary-glow/20"
                    >
                      Send to ESP32
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteSchedule(schedule.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RotiScheduler;