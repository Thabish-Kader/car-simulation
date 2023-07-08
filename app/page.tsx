import Image from "next/image";
import { CarCanvas } from "./components/CarCanvas";

export default function Home() {
	return (
		<main className="h-screen w-screen">
			<CarCanvas />
		</main>
	);
}
