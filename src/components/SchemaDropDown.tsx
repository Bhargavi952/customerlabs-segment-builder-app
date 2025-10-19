// src/components/SchemaDropdown.tsx

import React, { useMemo } from "react";
import type { SchemaOption } from "../types";
import { TraitIndicator } from "./TraitIndicator";

interface SchemaDropdownProps {
  currentValue: string;
  allOptions: SchemaOption[];
  selectedValues: Set<string>;
  onSelectChange: (newValue: string) => void;
  onRemove: () => void;
  isDisabled: boolean;
}

const SchemaDropDown: React.FC<SchemaDropdownProps> = ({
  currentValue,
  allOptions,
  selectedValues,
  onSelectChange,
  onRemove,
  isDisabled,
}) => {
  const currentOption = allOptions.find((opt) => opt.value === currentValue);
  const indicatorType = currentOption?.type || "none";

  const optionsForDropdown = useMemo(() => {
    return allOptions
      .filter(
        (option) =>
          option.value === currentValue || !selectedValues.has(option.value)
      )
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [allOptions, selectedValues, currentValue]);

  return (
    <div className="flex w-full items-center space-x-2 py-2">
      <TraitIndicator type={indicatorType} />

      <select
        value={currentValue}
        onChange={(e) => onSelectChange(e.target.value)}
        className="flex-grow p-2 pr-8 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-500"
        disabled={isDisabled}
      >
        <option value="" disabled={currentValue !== ""}>
          Add schema to segment
        </option>
        {optionsForDropdown.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Custom styled remove button */}
      <button
        onClick={onRemove}
        className="text-gray-400 hover:text-gray-600 rounded w-6 h-6 flex items-center justify-center  bg-[#f2fbf9] disabled:opacity-50"
        disabled={isDisabled}
      >
        <div className="w-3 h-0.5 bg-[#657a93]"></div>
      </button>
    </div>
  );
};

export default SchemaDropDown;
