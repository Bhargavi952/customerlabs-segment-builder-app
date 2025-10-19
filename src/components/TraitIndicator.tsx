import React from "react";
import type { SchemaOption } from "../types";

interface TraitIndicatorProps {
  type: SchemaOption["type"] | "none";
}

export const TraitIndicator: React.FC<TraitIndicatorProps> = ({ type }) => {
  let bgColor = "bg-gray-200"; // Default
  if (type === "user") {
    bgColor = "bg-green-500";
  } else if (type === "group") {
    bgColor = "bg-red-500";
  }

  return <div className={`w-2 h-2 rounded-full ${bgColor} mr-2`}></div>;
};
