import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { User } from '@/lib/utils';
// import { SignJWT } from 'jose';

export async function POST(req: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), 'src/data/db.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const data: { users: User[] } = JSON.parse(fileData);
    
    const requestData = await req.json();
    const { action, ...userData } = requestData;
    
    // Handle different auth actions
    switch (action) {
      case 'login':
        return handleLogin(userData, data.users);
        
      case 'register':
        return handleRegister(userData, data, filePath);
        
      default:
        return handleUserUpdate(requestData, data, filePath);
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ 
        success: false, 
        message: 'Operation failed', 
        error: error.message 
      }, { status: 500 });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'An unknown error occurred', 
        error: 'Unknown' 
      }, { status: 500 });
    }
  }
}

async function handleLogin(userData: User, users: User[]) {
  const { email, password } = userData;
  
  const user = users.find(u => u.email === email);
  
  if (!user || user.password !== password) { // TODO: Use a secure password hashing algorithm instead of string comparison
    return NextResponse.json({ 
      success: false, 
      message: 'Invalid email or password' 
    }, { status: 401 });
  }
  

  // const token = await new SignJWT({ 
  //   userId: user.userId,
  //   email: user.email
  // })
  //   .setProtectedHeader({ alg: 'HS256' })
  //   .setIssuedAt()
  //   .setExpirationTime('2h')
  //   .sign(secret);
  
  // Don't return the password in the response
  const { password: _, ...userWithoutPassword } = user;
  
  // Set JWT as HTTP-only cookie and return user data
  const response = NextResponse.json({
    success: true,
    message: 'Login successful',
    user: userWithoutPassword
  });
  
  return response;
}

function handleRegister(userData: User, data: { users: User[] }, filePath: string) {
  // Check if email already exists
  const emailExists = data.users.some(user => user.email === userData.email);
  if (emailExists) {
    return NextResponse.json({ 
      success: false, 
      message: 'Email already in use' 
    }, { status: 400 });
  }

  // Create new user with generated ID and current date
  const newUser: User = {
    ...userData,
    userId: data.users.length + 1,
    dateCreated: new Date().toISOString()
  };
  
  data.users.push(newUser);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  
  // Don't return the password in the response
  const { password, ...userWithoutPassword } = newUser;
  
  return NextResponse.json({ 
    success: true, 
    message: 'Registration successful',
    user: userWithoutPassword
  });
}

function handleUserUpdate(userData: User, data: { users: User[] }, filePath: string) {
  if (userData.userId) {
    const existingUser = data.users.find(user => user.userId === userData.userId);
    if (!existingUser) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }
    Object.assign(existingUser, userData);
  } else {
    data.users.push({ ...userData, userId: data.users.length + 1 });
  }
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return NextResponse.json({ success: true, users: data.users });
}

export async function GET() {
  return NextResponse.json({ message: 'API is working!' });
}