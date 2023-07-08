"use client";

import { FC } from "react";

type PlatformProps = {
	position?: [number, number, number];
};

export const Platform: FC<PlatformProps> = ({ position = [0, 0, 0] }) => {
	return (
		<group position={position}>
			<mesh position={[0, -0.1, 0]} receiveShadow>
				<boxGeometry args={[4, 0.2, 4]} />
				<meshStandardMaterial color="limegreen" />
			</mesh>
		</group>
	);
};
