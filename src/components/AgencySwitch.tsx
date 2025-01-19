"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

const agencies = [
  {
    value: "clientflow",
    label: "ClientFlow",
    logo: "/logo-icon.png",
    email: "clientflowsdfdsfsdf@gmail.com",
  },
  {
    value: "microsoft",
    label: "Microsoft",
    logo: "/logo-icon.png",
    email: "microsoft@gmail.com",
  },
];

const AgencySwitch = () => {
  const [open, setOpen] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState(agencies[0]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between py-6"
        >
          <div className="flex items-center">
            {selectedAgency.logo && (
              <Image
                src={selectedAgency.logo}
                alt={selectedAgency.label}
                width={24}
                height={24}
                className="rounded-full mr-2"
              />
            )}
            <div className="text-left">
              <div className="font-semibold">{selectedAgency.label}</div>
              {/* <div className="text-xs text-gray-500 text-ellipsis overflow-hidden whitespace-nowrap">
                {selectedAgency.email}
              </div> */}
            </div>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search agency..." />
          <CommandList>
            <CommandEmpty>No agency found.</CommandEmpty>
            <CommandGroup>
              {agencies.map((agency) => (
                <CommandItem
                  key={agency.value}
                  value={agency.value}
                  onSelect={() => {
                    setSelectedAgency(agency);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedAgency.value === agency.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <div className="flex items-center">
                    {agency.logo && (
                      <Image
                        src={agency.logo}
                        alt={agency.label}
                        width={24}
                        height={24}
                        className="rounded-full mr-2"
                      />
                    )}
                    <div>
                      <div className="font-semibold">{agency.label}</div>
                      {/* <div className="text-xs text-gray-500 text-ellipsis overflow-hidden whitespace-nowrap">
                        {agency.email}
                      </div> */}
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AgencySwitch;
