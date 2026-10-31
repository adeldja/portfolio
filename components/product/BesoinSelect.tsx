"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Options come from the server (lib/services.ts) as props: importing lib/services
// here would share the module with the /services client chunk and change its size.
export interface BesoinOption {
  value: string;
  label: string;
}

function Select({ options, defaultValue }: { options: BesoinOption[]; defaultValue: string }) {
  return (
    <select id="contact-besoin" className="pd-input" name="besoin" defaultValue={defaultValue}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export function isKnownBesoin(options: BesoinOption[], value: string) {
  return value !== "" && options.some((option) => option.value === value);
}

function SelectFromParams({ options, value }: { options: BesoinOption[]; value?: string }) {
  const requested = useSearchParams().get("besoin") ?? "";
  return (
    <Select
      options={options}
      defaultValue={value ?? (isKnownBesoin(options, requested) ? requested : "")}
    />
  );
}

/**
 * The page is static, so ?besoin= is read on the client. `value` (the value
 * sent back after an invalid submit) wins over the query string.
 */
export default function BesoinSelect({ options, value }: { options: BesoinOption[]; value?: string }) {
  return (
    <Suspense fallback={<Select options={options} defaultValue={value ?? ""} />}>
      <SelectFromParams options={options} value={value} />
    </Suspense>
  );
}
