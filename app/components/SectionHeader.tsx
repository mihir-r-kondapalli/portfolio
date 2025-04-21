import React from 'react';

interface SectionHeaderProps {
  children: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ children }) => {
  return (
    <div className="relative">
      <h2 className="text-3xl font-bold">{children}</h2>
      <div className="w-20 h-1 bg-blue-600 mt-3"></div>
    </div>
  );
};

export default SectionHeader;