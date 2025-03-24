"use client";
import React from 'react';
import Navigation from '@/components/layout/navigation';
import { Tasks, ApplicationControl, Buddy } from '@/components';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-6 py-8 grid grid-cols-12 gap-6">
        <Tasks />
        <div className="col-span-4 space-y-6">
          <ApplicationControl />
          <Buddy />
        </div>
      </div>
    </div>
  );
}
