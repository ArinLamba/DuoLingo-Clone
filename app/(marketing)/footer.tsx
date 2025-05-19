import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
	return (
		<footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
			<div className="max-w-screen-xl mx-auto flex items-center justify-evenly h-full">
				<Button size="lg" variant="ghost" className="w-full">
					<Image 
							src="/assets/flags/gr.svg" 
							alt="German" 
							height={32} 
							width={40}
							className="mr-4 rounded-md"
					/>
					German
				</Button>

				<Button size="lg" variant="ghost" className="w-full">
					<Image 
							src="/assets/flags/es.svg" 
							alt="Spanish" 
							height={32} 
							width={40}
							className="mr-4 rounded-md"
					/>
					Spanish
				</Button>

				<Button size="lg" variant="ghost" className="w-full">
					<Image 
							src="/assets/flags/fr.svg" 
							alt="Frencj" 
							height={32} 
							width={40}
							className="mr-4 rounded-md"
					/>
					French
				</Button>

				<Button size="lg" variant="ghost" className="w-full">
					<Image 
							src="/assets/flags/it.svg" 
							alt="Italian" 
							height={32} 
							width={40}
							className="mr-4 rounded-md"
					/>
					Italian
				</Button>

				<Button size="lg" variant="ghost" className="w-full">
					<Image 
							src="/assets/flags/jp.svg" 
							alt="Japanese" 
							height={32} 
							width={40}
							className="mr-4 rounded-md"
					/>
					Japanese
				</Button>

				<Button size="lg" variant="ghost" className="w-full">
					<Image 
							src="/assets/flags/in.svg" 
							alt="Hindi" 
							height={32} 
							width={40}
							className="mr-4 rounded-md"
					/>
					Hindi
				</Button>

			</div>
		</footer>
		);
};