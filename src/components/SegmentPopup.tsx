import React, { useState, useMemo, useEffect } from "react";

import Button from "./Button";
import { TraitIndicator } from "./TraitIndicator";
import type { SchemaOption, SelectedSchema, SegmentPayload } from "../types";
import SchemaDropDown from "./SchemaDropDown";

// Master list of schema options
const SCHEMA_OPTIONS: SchemaOption[] = [
  { label: "First Name", value: "first_name", type: "user" },
  { label: "Last Name", value: "last_name", type: "user" },
  { label: "Gender", value: "gender", type: "user" },
  { label: "Age", value: "age", type: "user" },
  { label: "Account Name", value: "account_name", type: "group" },
  { label: "City", value: "city", type: "user" },
  { label: "State", value: "state", type: "user" },
];

const WEBHOOK_URL = "/.netlify/functions/proxyWebhook";

interface SegmentPopupProps {
  onClose: () => void;
}

const SegmentPopup: React.FC<SegmentPopupProps> = ({ onClose }) => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState<SelectedSchema[]>([]);
  const [addSchemaDropdownValue, setAddSchemaDropdownValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Memoized list of currently selected schema values
  const currentSelectedValues = useMemo(
    () => new Set(selectedSchemas.map((s) => s.value)),
    [selectedSchemas]
  );

  //  filtered options for the *Add* dropdown
  const availableOptionsForAddDropdown = useMemo(
    () =>
      SCHEMA_OPTIONS.filter(
        (option) => !currentSelectedValues.has(option.value)
      ).sort((a, b) => a.label.localeCompare(b.label)),
    [currentSelectedValues]
  );

  useEffect(() => {
    if (availableOptionsForAddDropdown.length > 0) {
      const isCurrentValueAvailable = availableOptionsForAddDropdown.some(
        (opt) => opt.value === addSchemaDropdownValue
      );

      if (!isCurrentValueAvailable || !addSchemaDropdownValue) {
        setAddSchemaDropdownValue(availableOptionsForAddDropdown[0].value);
      }
    } else {
      setAddSchemaDropdownValue("");
    }
  }, [availableOptionsForAddDropdown, addSchemaDropdownValue]);

  const handleAddNewSchema = () => {
    if (addSchemaDropdownValue) {
      const newSchema: SelectedSchema = {
        id: Date.now().toString(),
        value: addSchemaDropdownValue,
      };
      setSelectedSchemas((prev) => [...prev, newSchema]);
      setError(null);
    }
  };

  const handleSchemaChange = (id: string, newValue: string) => {
    const isNewValueAlreadySelected = selectedSchemas.some(
      (s) => s.id !== id && s.value === newValue
    );

    if (isNewValueAlreadySelected) {
      setError("This schema trait is already selected in another dropdown.");
      return;
    }
    setError(null);

    setSelectedSchemas((prevSchemas) =>
      prevSchemas.map((s) => (s.id === id ? { ...s, value: newValue } : s))
    );
  };

  const handleRemoveSchema = (id: string) => {
    setSelectedSchemas((prevSchemas) => prevSchemas.filter((s) => s.id !== id));
    setError(null);
  };

  const handleSaveSegment = async () => {
    if (!segmentName.trim() || selectedSchemas.length === 0) {
      setError("Please enter a segment name and add at least one schema.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const schemaArray = selectedSchemas.map((s) => {
      const label =
        SCHEMA_OPTIONS.find((opt) => opt.value === s.value)?.label || s.value;
      return { [s.value]: label };
    });

    const payload: SegmentPayload = {
      segment_name: segmentName.trim(),
      schema: schemaArray,
    };

    console.log("Sending Payload:", payload);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      setSuccess(true);
      setTimeout(onClose, 2000);
    } catch (err: any) {
      setError(
        `Failed to save segment: ${err.message}. Please check your webhook URL and network.`
      );
      console.error("API Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex overflow-hidden">
      {/*  background overlay */}
      <div
        className="absolute inset-0 bg-gray-600 bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Popup Content Pane */}
      <div className="flex w-full h-full max-w-md ml-auto bg-white shadow-xl relative z-10">
        <div className="w-full bg-white flex flex-col">
          {/* Header */}
          <div
            onClick={onClose}
            className="bg-[#39aebc] text-white p-4 flex items-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <h2 className="text-xl font-semibold">Saving Segment</h2>
          </div>

          {/* Body Content */}
          <div className="p-6 flex-grow overflow-y-auto">
            <p className="mb-2 text-sm text-gray-600">
              Enter the Name of the Segment
            </p>
            <input
              type="text"
              placeholder="Name of the segment"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm mb-6 focus:outline-none focus:border-teal-500"
              disabled={isLoading}
            />

            <p className="mb-4 text-sm text-gray-600">
              To save your segment, you need to add the schemas to build the
              query
            </p>

            <div className="flex space-x-4 justify-end mb-4 text-xs">
              <span className="flex items-center">
                <TraitIndicator type="user" /> User Traits
              </span>
              <span className="flex items-center">
                <TraitIndicator type="group" /> Group Traits
              </span>
            </div>

            <div className="bg-blue-50 p-4 rounded mb-6 border border-blue-100">
              {selectedSchemas.map((schema) => (
                <SchemaDropDown
                  key={schema.id}
                  currentValue={schema.value}
                  allOptions={SCHEMA_OPTIONS}
                  selectedValues={currentSelectedValues}
                  onSelectChange={(newValue: any) =>
                    handleSchemaChange(schema.id, newValue)
                  }
                  onRemove={() => handleRemoveSchema(schema.id)}
                  isDisabled={isLoading}
                />
              ))}

              {availableOptionsForAddDropdown.length > 0 && (
                <div className="flex w-full items-center space-x-2 py-2">
                  <TraitIndicator type="none" />
                  <select
                    value={addSchemaDropdownValue}
                    onChange={(e) => setAddSchemaDropdownValue(e.target.value)}
                    className="flex-grow p-2 pr-8 border border-gray-300 rounded text-gray-500 text-sm focus:outline-none focus:border-teal-500"
                    disabled={isLoading}
                  >
                    {availableOptionsForAddDropdown.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <div className="w-6 h-6 flex items-center justify-center bg-transparent"></div>
                </div>
              )}

              {/* + Add new schema link */}
              {addSchemaDropdownValue &&
                availableOptionsForAddDropdown.length > 0 && (
                  <button
                    onClick={handleAddNewSchema}
                    className="text-teal-500 text-sm mt-1 ml-4 hover:text-teal-600 focus:outline-none"
                    disabled={isLoading}
                  >
                    + Add new schema
                  </button>
                )}
            </div>

            {/* Status Messages */}
            {error && (
              <div className="p-2 bg-red-100 text-red-700 rounded text-sm mb-4">
                {error}
              </div>
            )}
            {success && (
              <div className="p-2 bg-green-100 text-green-700 rounded text-sm mb-4">
                Segment saved successfully!
              </div>
            )}
          </div>

          <div className="p-4 bg-[#f6f6f6] flex justify-start gap-6 md:gap-4 ">
            <Button
              variant="primary"
              onClick={handleSaveSegment}
              disabled={isLoading}
              className="text-sm"
            >
              {isLoading ? "Saving..." : "Save the Segment"}
            </Button>
            <Button
              variant="tertiary"
              onClick={onClose}
              disabled={isLoading}
              className="font-normal text-sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SegmentPopup;
