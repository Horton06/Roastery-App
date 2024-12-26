'use client';

import React from "react";

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  activeTab: string;
}

const Tabs = ({ children, className, activeTab, setActiveTab }: TabsProps) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<{ activeTab: string; setActiveTab: React.Dispatch<React.SetStateAction<string>>; }>, { activeTab, setActiveTab });
        }
        return child;
      })}
    </div>
  );
};

const TabsList = ({ children }: { children: React.ReactNode }) => (
  <div className="tabs-list">
    {children}
  </div>
);

const TabsTrigger = ({ value, children, activeTab, setActiveTab }: TabsTriggerProps) => (
  <button
    onClick={() => setActiveTab(value)}
    className={`tabs-trigger ${activeTab === value ? "bg-gray-200 font-bold" : ""}`}
  >
    {children}
  </button>
);

const TabsContent = ({ value, children, activeTab }: TabsContentProps) => (
  <>
    {activeTab === value && (
      <div className="tabs-content">
        {children}
      </div>
    )}
  </>
);

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

export { Tabs, TabsList, TabsTrigger, TabsContent };