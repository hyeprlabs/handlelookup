"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Portal, PortalBackdrop } from "@/components/ui/portal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { navLinks } from "@/components/header";
import { XIcon, MenuIcon } from "lucide-react";
import { ClerkLoaded, ClerkLoading, Show } from "@clerk/nextjs";
import { UpgradeDialogDrawer } from "@/components/upgrade-dialog-drawer";
import { UserDropdown } from "@/components/user-dropdown";
import Link from "next/link";

export function MobileNav() {
	const [open, setOpen] = React.useState(false);

	return (
		<div className="flex items-center gap-2 md:hidden">
			<ClerkLoading>
				<Skeleton className="size-8 rounded-full" />
			</ClerkLoading>
			<ClerkLoaded>
				<Show when="signed-in">
					<UserDropdown />
				</Show>
			</ClerkLoaded>

			<Button
				aria-controls="mobile-menu"
				aria-expanded={open}
				aria-label="Toggle menu"
				onClick={() => setOpen(!open)}
				size="icon"
				variant="outline"
			>
				{open ? (
					<XIcon className="size-4.5" />
				) : (
					<MenuIcon className="size-4.5" />
				)}
			</Button>

			{open && (
				<Portal className="top-14" id="mobile-menu">
					<PortalBackdrop />
					<div
						className={cn(
							"data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in",
							"size-full p-4"
						)}
						data-slot={open ? "open" : "closed"}
					>
						<div className="grid gap-y-2">
							{navLinks.map((link) => (
								<Button
									asChild
									className="justify-start"
									key={link.label}
									variant="ghost"
								>
									<a href={link.href} onClick={() => setOpen(false)}>
										{link.label}
									</a>
								</Button>
							))}
						</div>
						<div className="mt-12 flex flex-col gap-2">
							<ClerkLoading>
								<Skeleton className="h-9 w-full rounded-full" />
								<Skeleton className="h-9 w-full rounded-full" />
							</ClerkLoading>
							<ClerkLoaded>
								<Show when="signed-out">
									<Button asChild className="w-full" variant="outline">
										<Link href="/sign-in" onClick={() => setOpen(false)}>
											Sign In
										</Link>
									</Button>
									<Button asChild className="w-full">
										<Link href="/sign-up" onClick={() => setOpen(false)}>
											Get Started
										</Link>
									</Button>
								</Show>
								<Show when={(has) => has({ plan: "free" })}>
									<UpgradeDialogDrawer>
										<Button className="w-full">Upgrade</Button>
									</UpgradeDialogDrawer>
								</Show>
							</ClerkLoaded>
						</div>
					</div>
				</Portal>
			)}
		</div>
	);
}
