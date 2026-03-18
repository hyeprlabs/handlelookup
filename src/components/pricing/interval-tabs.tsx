"use client";

import { parseAsStringLiteral, useQueryState } from "nuqs";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function IntervalTabs() {
  const [interval, setInterval] = useQueryState(
    "interval",
    parseAsStringLiteral(["monthly", "yearly"]).withDefault("monthly"),
  );

  return (
    <Tabs
      className="items-start"
      value={interval}
      onValueChange={(value) => setInterval(value as "monthly" | "yearly")}
    >
      <TabsList>
        <TabsTrigger value="monthly">Monthly</TabsTrigger>
        <TabsTrigger value="yearly">
          Yearly <span className="text-green-500">(Save 20%)</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
