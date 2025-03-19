"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as data from "./../data/tasks.json";

export default function Home() {
  const [tasks, setTasks] = useState(data.tasks);

  const [apps, setApps] = useState([
    { id: 1, name: 'Instagram', icon: 'fa-brands fa-instagram', blocked: true },
    { id: 2, name: 'Twitter', icon: 'fa-brands fa-twitter', blocked: true },
    { id: 3, name: 'YouTube', icon: 'fa-brands fa-youtube', blocked: false },
    { id: 4, name: 'TikTok', icon: 'fa-brands fa-tiktok', blocked: true },
    { id: 5, name: 'Facebook', icon: 'fa-brands fa-facebook', blocked: false },
    { id: 6, name: 'WhatsApp', icon: 'fa-brands fa-whatsapp', blocked: false },
  ]);

  const [focusMode, setFocusMode] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({ name: '', dueDate: '', priority: 'medium', hours: 0 });

  const toggleFocusMode = () => {
    setFocusMode(!focusMode);
  };

  const toggleAppBlock = (appId: number) => {
    setApps(apps.map(app =>
      app.id === appId ? { ...app, blocked: !app.blocked } : app
    ));
  };

  const addNewTask = async () => {
    if (newTask.name && newTask.dueDate) {
      try {
        const response = await fetch('/api/saveTask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTask),
        });
  
        if (!response.ok) throw new Error('Failed to save task');
  
        const data = await response.json();
        setTasks(data.tasks);
        setShowAddTask(false);
        setNewTask({ name: '', dueDate: '', priority: 'medium', hours: 0 });
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  
  


  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm h-16 flex items-center px-6">
        <h1 className="text-2xl font-bold text-black-700">BookWorm</h1>
        <div className="ml-auto flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Focus Mode</span>
            <Switch
              checked={focusMode}
              onCheckedChange={toggleFocusMode}
            />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8 grid grid-cols-12 gap-6">
        <div className="col-span-8 space-y-6">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Study Timetable</h2>
              <Dialog open={showAddTask} onOpenChange={setShowAddTask}>
                <DialogTrigger asChild>
                  <Button className="!rounded-button">
                    <i className="fas fa-plus mr-2"></i>
                    Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Study Task</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <Input
                      placeholder="Task name"
                      value={newTask.name}
                      onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                    />
                    <Input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    />
                    <Select
                      value={newTask.priority}
                      onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High Priority</SelectItem>
                        <SelectItem value="medium">Medium Priority</SelectItem>
                        <SelectItem value="low">Low Priority</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      placeholder="Estimated hours"
                      value={newTask.hours}
                      onChange={(e) => setNewTask({ ...newTask, hours: parseInt(e.target.value) })}
                    />
                    <Button onClick={addNewTask} className="w-full !rounded-button">Add Task</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {tasks.map(task => (
                <div key={task.id} className={`p-4 rounded-lg border ${task.priority === 'high' ? 'border-red-200 bg-red-50' :
                  task.priority === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                    'border-green-200 bg-green-50'
                  }`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{task.name}</h3>
                      <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">{task.hours}h</span>
                      <div className="text-xs text-gray-500">estimated</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>


        <div className="col-span-4 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Application Control</h2>
            <div className="space-y-4">
              {apps.map(app => (
                <div key={app.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <i className={`${app.icon} text-xl`}></i>
                    <span>{app.name}</span>
                  </div>
                  <Switch
                    checked={app.blocked}
                    onCheckedChange={() => toggleAppBlock(app.id)}
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
