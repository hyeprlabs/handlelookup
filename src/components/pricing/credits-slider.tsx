"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const MIN_PACKS = 1;
const MAX_PACKS = 12;
const CREDITS_PER_PACK = 10000;
const SKIP_INTERVAL = 2;

const ticks = Array.from(
  { length: MAX_PACKS - MIN_PACKS + 1 },
  (_, i) => i + MIN_PACKS,
);

function getPricePerPack(packs: number) {
  if (packs >= 7) return 14;
  if (packs >= 3) return 16;

  return 18;
}

export function CreditsSlider() {
  const [packsValue, setPacksValue] = React.useState<number[]>([3]);

  const packs = Math.max(MIN_PACKS, packsValue[0] ?? MIN_PACKS);
  const pricePerPack = getPricePerPack(packs);
  const totalCredits = packs * CREDITS_PER_PACK;
  const totalPrice = packs * pricePerPack;
  const costPerThousand = totalPrice / (totalCredits / 1000);

  return (
    <div className="grid gap-4">
      <div className="rounded-xl border bg-secondary/15 px-4 py-3">
        <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-[0.14em]">
          Top-up preview
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <p className="font-semibold text-2xl sm:text-3xl leading-none">
            {totalCredits.toLocaleString()} credits
          </p>
          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground text-sm">
              ${totalPrice.toFixed(2)} one-time
            </p>
            <p className="text-muted-foreground text-xs">
              ${costPerThousand.toFixed(2)} per 1,000 credits
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-background px-4 py-4">
        <Label className="text-sm font-medium">
          Choose top-up packs (10k credits each)
        </Label>
        <div className="mt-4">
          <Slider
            min={MIN_PACKS}
            max={MAX_PACKS}
            step={1}
            value={[packs]}
            onValueChange={setPacksValue}
          />
        </div>
        <span
          aria-hidden="true"
          className="text-muted-foreground mt-2 flex w-full items-center justify-between gap-1 px-2.5 text-xs font-medium"
        >
          {ticks.map((tick) => (
            <span
              key={tick}
              className="flex w-0 flex-col items-center justify-center gap-2"
            >
              <span
                className={cn(
                  "bg-muted-foreground/70 h-1 w-px",
                  tick % SKIP_INTERVAL !== 0 && "h-0.5",
                )}
              />
              <span className={cn(tick % SKIP_INTERVAL !== 0 && "opacity-0")}>
                {tick}
              </span>
            </span>
          ))}
        </span>
      </div>

      <Button asChild className="w-full">
        <Link href={`/upgrade?topup=${totalCredits}`}>
          Buy {totalCredits.toLocaleString()} credits for $
          {totalPrice.toFixed(2)}
        </Link>
      </Button>
    </div>
  );
}
