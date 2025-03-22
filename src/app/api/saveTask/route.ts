import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Task } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), 'src/data/tasks.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const data: { tasks: Task[] } = JSON.parse(fileData);

    const newTask: Task = await req.json();
    if (newTask.id) {
      const existingTask = data.tasks.find(task => task.id === newTask.id);
      if (!existingTask) {
        return NextResponse.json({ success: false, message: 'Task not found' }, { status: 404 });
      }
      Object.assign(existingTask, newTask);
    }else{
      data.tasks.push({ ...newTask, id: data.tasks.length + 1 });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return NextResponse.json({ success: true, tasks: data.tasks });
  } catch (error) {
    // Type assertion to narrow the error type
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: 'Failed to save task', error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ success: false, message: 'An unknown error occurred', error: 'Unknown' }, { status: 500 });
    }
  }
}

export async function GET() {
  return NextResponse.json({ message: 'API is working!' });
}
