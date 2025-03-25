import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import taskData from "@/data/db.json";
import { Task } from '@/lib/utils';

const Tasks: React.FC = () => {
    const [taskItems, setTaskItems] = useState<Task[]>([]); 
    const [showAddTask, setShowAddTask] = useState(false);
    const [userId, setUserId] = useState<number | null>(null);
    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            setUserId(parseInt(storedUserId));
        }

        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            setTaskItems(JSON.parse(storedTasks));
        }
    }, []);

    useEffect(() => {
        if (userId !== null) {
            const filteredTasks = taskData.tasks.filter(task => task.user === userId);
            setTaskItems(filteredTasks);
        }
    }, [userId]);

    const [newTask, setNewTask] = useState<Task>({
        id: null,
        user: userId || 1,
        name: '',
        dueDate: '',
        priority: 'medium',
        hours: 0
    });

    useEffect(() => {
        setNewTask((prevTask) => ({ ...prevTask, user: userId || 1 }));
    }, [userId]);

    
    const saveTaskData = async () => {
        if (newTask.name && newTask.dueDate && userId) {
            try {
                const newTaskId = Date.now(); 
                const taskToSave = { ...newTask, id: newTaskId };
                const updatedTasks = [...taskItems, taskToSave];
                setTaskItems(updatedTasks);
                localStorage.setItem("tasks", JSON.stringify(updatedTasks));
                setShowAddTask(false);
                setNewTask({ id: null, user: userId, name: '', dueDate: '', priority: 'medium', hours: 0 });

            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="space-y-6 col-span-8">
            <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-semibold text-xl">Study Timetable</h2>
                    <Dialog open={showAddTask} onOpenChange={setShowAddTask}>
                        <DialogTrigger asChild>
                            <Button
                                onClick={() => {
                                    setNewTask({ id: null, user: userId || 1, name: '', dueDate: '', priority: 'medium', hours: 0 });
                                }}
                                className="!rounded-button"
                            >
                                <i className="mr-2 fas fa-plus"></i>
                                Add Task
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Study Task</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <label htmlFor="task-name" className="font-medium text-sm">
                                        Task Name
                                    </label>
                                    <Input
                                        placeholder="Task name"
                                        value={newTask.name}
                                        onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <label htmlFor="due-date" className="font-medium text-sm">
                                        Due Date
                                    </label>
                                    <Input
                                        type="date"
                                        value={newTask.dueDate}
                                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="priority" className="font-medium text-sm">
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
                                    <label htmlFor="estimated-hours" className="font-medium text-sm">
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
                                <Button onClick={saveTaskData} className="!rounded-button w-full">
                                    {newTask.id === null ? "Add" : "Update"} Task
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="space-y-4">
                    {taskItems.length > 0 ? (
                        taskItems.map((task) => (
                            <Card key={task.id} className="p-4">
                                <h3 className="font-medium">{task.name}</h3>
                                <p>Due Date: {task.dueDate}</p>
                                <p>Priority: {task.priority}</p>
                                <p>Estimated Hours: {task.hours}</p>
                            </Card>
                        ))
                    ) : (
                        <p className="text-gray-500">No tasks available.</p>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default Tasks;