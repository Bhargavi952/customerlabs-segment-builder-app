export interface SchemaOption {
  label: string;
  value: string;
  type: "user" | "group";
}

export interface SelectedSchema {
  id: string; // Unique ID
  value: string;
}

export interface SegmentPayload {
  segment_name: string;
  schema: { [key: string]: string }[];
}
