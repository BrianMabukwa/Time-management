import React, { useState } from "react";

import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";

const ApplicationControl = () => {
    const [apps, setApps] = useState([
        { id: 1, name: 'Instagram', icon: 'fa-brands fa-instagram', blocked: true },
        { id: 2, name: 'Twitter', icon: 'fa-brands fa-twitter', blocked: true },
        { id: 3, name: 'YouTube', icon: 'fa-brands fa-youtube', blocked: false },
        { id: 4, name: 'TikTok', icon: 'fa-brands fa-tiktok', blocked: true },
        { id: 5, name: 'Facebook', icon: 'fa-brands fa-facebook', blocked: false },
        { id: 6, name: 'WhatsApp', icon: 'fa-brands fa-whatsapp', blocked: false },
      ]);

      const toggleAppBlock = (appId: number) => {
        setApps(apps.map(app =>
          app.id === appId ? { ...app, blocked: !app.blocked } : app
        ));
      };
    
    return (
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
    )
}

export default ApplicationControl;