"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Form,
  Autocomplete,
  AutocompleteItem,
} from "@heroui/react";
import { Search } from "lucide-react";
import { FilterField } from "@/types/filter";
import DatePicker from "@/components/pages/date-picker";
import DateRangePicker from "@/components/pages/date-range-picker";

interface DynamicFilterProps {
  fields: FilterField[];
  onFilter: (data: Record<string, any>) => void;
  onClear: () => void;
  gridCols?: number;
}

export default function DynamicFilter({
  fields,
  onFilter,
  onClear,
  gridCols = 3,
}: DynamicFilterProps) {
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  const handleChange = (name: string, value: any) => {
    console.log(name, value)
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedValues: Record<string, any> = {};
    Object.entries(formValues).forEach(([key, value]) => {
      if (!value) return;
      formattedValues[key] = value;
    });

    onFilter(formattedValues);
  };

  const handleClear = () => {
    // Reset all state values to null (not undefined)
    const clearedValues: Record<string, any> = {};
    fields.forEach((f) => {
      clearedValues[f.name] = null;
    });
    setFormValues(clearedValues);

    onClear();
  };

  return (
    <Card className="px-1 mb-3">
      <CardHeader>Filter</CardHeader>
      <CardBody>
        <Form id="filterForm" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col gap-4">
            <div className={`grid grid-cols-${gridCols} gap-4`}>
              {fields.map((field) => {
                const value = formValues[field.name];

                switch (field.type) {
                  case "input":
                    return (
                      <Input
                        key={field.name}
                        label={field.label}
                        placeholder={field.placeholder}
                        labelPlacement="outside-top"
                        value={value || ""}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                      />
                    );

                  case "autocomplete":
                    return (
                      <Autocomplete
                        key={field.name}
                        label={field.label}
                        labelPlacement="outside-top"
                        placeholder={field.placeholder}
                        selectedKey={value || ""}
                        onSelectionChange={(v) => handleChange(field.name, v)}
                      >
                        {(field.options ?? []).map((opt) => (
                          <AutocompleteItem key={opt.value}>
                            {opt.label}
                          </AutocompleteItem>
                        ))}
                      </Autocomplete>
                    );

                  case "datepicker":
                    return (
                      <DatePicker
                        key={field.name}
                        label={field.label}
                        value={value ?? null}
                        onChange={(v: any) => handleChange(field.name, v)}
                      />
                    );

                  case "daterange":
                    return (
                      <DateRangePicker
                        key={field.name}
                        label={field.label}
                        value={value ?? null}
                        onChange={(v) => handleChange(field.name, v)}
                      />
                    );

                  default:
                    return null;
                }
              })}
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                color="primary"
                variant="flat"
                className="max-w-[120px] mr-2"
                onPress={handleClear}
              >
                Clear
              </Button>
              <Button
                type="submit"
                color="primary"
                className="max-w-[120px]"
                startContent={<Search size={15} />}
              >
                Search
              </Button>
            </div>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
}
