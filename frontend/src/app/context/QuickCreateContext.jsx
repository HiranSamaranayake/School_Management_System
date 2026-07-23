import React, { createContext, useContext, useState } from 'react';

const QuickCreateContext = createContext(null);

export const QuickCreateProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeType, setActiveType] = useState(null); // 'student' | 'teacher' | 'class' | 'attendance' | 'exam' | 'announcement'

  const openQuickCreate = (type = 'student') => {
    setActiveType(type);
    setIsOpen(true);
  };

  const closeQuickCreate = () => {
    setIsOpen(false);
    setActiveType(null);
  };

  return (
    <QuickCreateContext.Provider
      value={{
        isOpen,
        activeType,
        openQuickCreate,
        closeQuickCreate,
      }}
    >
      {children}
    </QuickCreateContext.Provider>
  );
};

export const useQuickCreate = () => {
  const context = useContext(QuickCreateContext);
  if (!context) throw new Error('useQuickCreate must be used within a QuickCreateProvider');
  return context;
};
