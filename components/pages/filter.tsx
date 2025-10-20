"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
} from "@heroui/react";
import { Search, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FilterField } from "@/types/filter";
import AppDatePicker from "@/components/pages/app-date-picker";
import AppDateRangePicker from "@/components/pages/app-date-range-picker";
import AppAutocomplete from "./app-autocomplete";
import AppTextInput from "./app-text-input";

interface DynamicFilterProps {
  fields: FilterField[];
  onFilter: (data: Record<string, any>) => void;
  onClear: () => void;
}

export default function DynamicFilter({
  fields,
  onFilter,
  onClear,
}: DynamicFilterProps) {
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (name: string, value: any) => {
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
    const clearedValues: Record<string, any> = {};
    fields.forEach((f) => {
      clearedValues[f.name] = null;
    });
    setFormValues(clearedValues);
    onClear();
  };

  return (
    <Card className="px-1 mb-3 overflow-hidden">
      {/* Header with toggle */}
      <CardHeader
        className="flex justify-between items-center cursor-pointer select-none"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="font-semibold">Filter</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </CardHeader>

      {/* Animated Body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="filter-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <CardBody>
              <Form id="filterForm" onSubmit={handleSubmit}>
                <div className="w-full flex flex-col gap-4">
                  <div className={`grid grid-cols-3 gap-4`}>
                    {fields.map((field) => {
                      const value = formValues[field.name];

                      switch (field.type) {
                        case "input":
                          return (
                            <AppTextInput
                              key={field.name}
                              label={field.label}
                              placeholder={field.placeholder}
                              value={value || ""}
                              onChange={(e) => handleChange(field.name, e.target.value)}
                            />
                          );

                        case "autocomplete":
                          return (
                            <AppAutocomplete
                              key={field.name}
                              label={field.label}
                              placeholder={field.placeholder}
                              selectedKey={value || ""}
                              items={field.options ?? []}
                              onSelectionChange={(v) => handleChange(field.name, v)}
                            />
                          );

                        case "datepicker":
                          return (
                            <AppDatePicker
                              key={field.name}
                              label={field.label}
                              value={value ?? null}
                              onChange={(v: any) => handleChange(field.name, v)}
                            />
                          );

                        case "daterange":
                          return (
                            <AppDateRangePicker
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

                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      color="primary"
                      variant="flat"
                      className="max-w-[120px]"
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
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
