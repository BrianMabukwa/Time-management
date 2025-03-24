import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';

const Navigation: React.FC = () => {
    const [focusMode, setFocusMode] = useState(false);
    const toggleFocusMode = () => {
        setFocusMode(!focusMode);
    };
    return (
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
    )
}

export default Navigation;