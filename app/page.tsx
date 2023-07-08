import Image from "next/image";
import { CarCanvas } from "./components/CarCanvas";
import Loading from "./loading";

export default function Home() {
	return (
		<main className="h-screen w-screen">
			<CarCanvas />
		</main>
	);
}
