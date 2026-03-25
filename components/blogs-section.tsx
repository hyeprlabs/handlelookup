import { cn } from "@/lib/utils";
import { FullWidthDivider } from "@/components/ui/full-width-divider";

const blogs = [
	{
		title: "The New Design",
		date: "May 20 2025",
		description:
			"What everyone new to the field should know, and how we can help.",
		href: "#",
	},
	{
		title: "Letter Club",
		date: "Aug 14 2025",
		description: "An ode to the slow web.",
		href: "#",
	},
	{
		title: "Have the Coffee",
		date: "Sep 19 2025",
		description: "Carve space out for oppurtunity.",
		href: "#",
	},
	{
		title: "Shadcn UI",
		date: "Oct 12 2025",
		description: "Building modern applications with reusable components.",
		href: "#",
	},
	{
		title: "Fesgin",
		date: "Nov 23 2025",
		description: "Exploring the intersection of design and development.",
		href: "#",
	},
];

export function BlogsSection() {
	return (
		<div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-start md:border-x">
			<div className="space-y-2 px-4 py-8 md:py-12">
				<h1 className="font-semibold text-2xl tracking-wide md:text-4xl">
					Latest Blogs
				</h1>
				<p className="text-muted-foreground text-sm">
					Discover the latest trends and insights in the world of design and
					technology.
				</p>
			</div>

			<div className="relative">
				<FullWidthDivider />
				<div className="divide-y">
					{blogs.map((blog) => (
						<BlogCard {...blog} key={blog.title} />
					))}
				</div>
				<FullWidthDivider />
			</div>
		</div>
	);
}

function BlogCard({
	title,
	date,
	description,
	className,
	...props
}: React.ComponentProps<"a"> & {
	title: string;
	date: string;
	description: string;
}) {
	return (
		<a
			className={cn(
				"group flex h-24 w-full flex-col justify-center gap-y-1 p-4 hover:cursor-pointer hover:bg-accent/30 active:bg-accent dark:active:bg-accent/50",
				className
			)}
			{...props}
		>
			<div className="relative flex items-end justify-center gap-2">
				<h3 className="whitespace-nowrap font-medium text-foreground text-lg md:text-xl">
					{title}
				</h3>
				<span className="mb-[6px] w-full border-b-2 border-dashed" />
				<span className="whitespace-nowrap font-mono text-muted-foreground text-xs uppercase group-hover:text-foreground md:text-sm">
					{date}
				</span>
			</div>
			<div className="max-w-sm text-muted-foreground text-sm group-hover:text-foreground md:max-w-full md:text-base">
				{description}
			</div>
		</a>
	);
}
