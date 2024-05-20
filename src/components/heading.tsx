import { cn } from "@/lib/utils";
import Balancer from "react-wrap-balancer";

type HeadingProps =
	| {
			title: string;
			description?: string;
			centered?: boolean;
	  }
	| {
			title?: string;
			description: string;
			centered?: boolean;
	  };

export const Heading: React.FC<HeadingProps> = ({
	title,
	centered,
	description,
}) => {
	return (
		<div className="space-y-6">
			<div
				className={cn("space-y-2", {
					"text-center": centered,
				})}
			>
				{title && (
					<h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:font-bold">
						{title}
					</h1>
				)}
				{description && (
					<p className="text-lg text-muted-foreground">
						<Balancer>{description}</Balancer>
					</p>
				)}
			</div>
		</div>
	);
};
