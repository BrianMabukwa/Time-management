import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useRouter } from "next/navigation";

const Navigation: React.FC = () => {
  const router = useRouter();
  const [focusMode, setFocusMode] = useState(false);
  const toggleFocusMode = () => {
    setFocusMode(!focusMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    router.push("/Login"); 
  };
  
  return (
    <nav className="flex items-center bg-white shadow-sm px-6 h-16">
      <h1 className="font-bold text-black-700 text-2xl">BookWorm</h1>
      <div className="flex items-center space-x-4 ml-auto">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-sm">Focus Mode</span>
          <Switch
            checked={focusMode}
            onCheckedChange={toggleFocusMode}
          />
          <Button variant="destructive" onClick={handleLogout}>logout</Button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation;