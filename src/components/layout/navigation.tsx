import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const Navigation: React.FC = () => {
    const [focusMode, setFocusMode] = useState(false);
    const toggleFocusMode = () => {
        setFocusMode(!focusMode);
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
          </div>
        </div>
      </nav>
    )
}

export default Navigation;