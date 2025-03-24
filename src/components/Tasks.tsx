import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import taskData from "@/data/db.json";
import { Task } from '@/lib/utils';

const Tasks: React.FC = () => {
    const [taskItems, setTaskItems] = useState<Task[]|null>(taskData.tasks as Task[]);
      const [showAddTask, setShowAddTask] = useState(false);
      const [newTask, setNewTask] = useState<Task>({ id: null, user: 1, name: '', dueDate: '', priority: 'medium', hours: 0 });

      const saveTaskData = async () => {
        if (newTask.name && newTask.dueDate) {
          try {
            const response = await fetch('/api/saveTask', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newTask),
            });
    
            if (!response.ok) throw new Error('Failed to save task');
    
            const data = await response.json();
            setTaskItems(data.tasks);
            setShowAddTask(false);
            setNewTask({ id: null, user: 1, name: '', dueDate: '', priority: 'medium', hours: 0 });
          } catch (error) {
            console.error('Error:', error);
          }
        }
      };

    return (
        <div className="col-span-8 space-y-6">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Study Timetable</h2>
              <Dialog open={showAddTask} onOpenChange={setShowAddTask}>
                <DialogTrigger asChild>
                  <Button 
                    onClick={() => {
                      setNewTask({ id: null, user: 1, name: '', dueDate: '', priority: 'medium', hours: 0 });
                    }}
                    className="!rounded-button"
                  >
                    <i className="fas fa-plus mr-2"></i>
                    Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Study Task</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label htmlFor="task-name" className="text-sm font-medium">
                        Task Name
                      </label>
                      <Input
                        placeholder="Task name"
                        value={newTask.name}
                        onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                      />
                    </div>
                    <div className='space-y-2'>
                      <label htmlFor="due-date" className="text-sm font-medium">
                        Due Date
                      </label>
                      <Input
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="priority" className="text-sm font-medium">
                        Priority
                      </label>
                      <Select
                        value={newTask.priority}
                        onValueChange={(value: "high" | "medium" | "low") => setNewTask({ ...newTask, priority: value })}
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
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="estimated-hours" className="text-sm font-medium">
                      Estimated Hours
                      </label>
                      <Input
                      id="estimated-hours"
                      type="number"
                      placeholder="Estimated hours"
                      value={newTask.hours}
                      onChange={(e) => setNewTask({ ...newTask, hours: parseInt(e.target.value) })}
                      />
                    </div>
                    <Button onClick={saveTaskData} className="w-full !rounded-button">Add Task</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {taskItems && taskItems.map(task => (
                <div 
                  key={task.id} 
                  className={`p-4 rounded-lg border cursor-pointer hover:shadow-md transition-shadow ${
                  task.priority === 'high' ? 'border-red-200 bg-red-50' :
                  task.priority === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                  'border-green-200 bg-green-50'
                  }`}
                  onClick={() => {
                    setNewTask(task);
                    setShowAddTask(true);
                  }}
                >
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
    )
}

export default Tasks;