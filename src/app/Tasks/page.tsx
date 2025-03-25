"use client";
import React from 'react';
import Navigation from '@/components/layout/navigation';
import { Tasks, ApplicationControl, Buddy } from '@/components';

export default function Task() {
  console.log("User", localStorage.getItem(""))
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navigation />
      <div className="gap-6 grid grid-cols-12 mx-auto px-6 py-8 container">
        <Tasks />
        <div className="space-y-6 col-span-4">
          <ApplicationControl />
          <Buddy />
        </div>
      </div>
    </div>
  );
}
