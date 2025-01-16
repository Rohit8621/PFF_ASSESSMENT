import React from 'react';

interface TypeFilterProps {
  types: string[];
  selectedType: string;
  onChange: (type: string) => void;
}

export function TypeFilter({ types, selectedType, onChange }: TypeFilterProps) {
  return (
    <select
      value={selectedType}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm transition-all"
    >
      <option value="">All Types</option>
      {types.map((type) => (
        <option key={type} value={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
      ))}
    </select>
  );
}