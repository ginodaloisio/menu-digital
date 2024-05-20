import { cn } from "@/lib/utils";

interface ShellProps
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {
	children: React.ReactNode;
	layout?: "default" | "admin" | "auth";
}

export default function Shell({
	children,
	className,
	layout = "default",
	...props
}: ShellProps) {
	return (
		<section
			className={cn(
				"grid items-center gap-8 py-8 pb-8 pt-6",
				layout === "default" && "container",
				layout === "auth" && "container max-w-lg",
				layout === "admin" && "px-2",
				className,
			)}
			{...props}
		>
			{children}
		</section>
	);
}
