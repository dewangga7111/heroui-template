import { Combo } from "./combo";
type FieldType = "input" | "autocomplete" | "datepicker" | "daterange";

export interface FilterField {
  type: FieldType;
  name: string;
  label: string;
  placeholder?: string;
  options?: Combo[];
}