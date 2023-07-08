"use client";
import { FC } from "react";
import * as THREE from "three";

// instantiated in the top for optimization
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

type PlatformProps = {
	position?: [number, number, number];
};

export const Platform: FC<PlatformProps> = ({ position = [0, 0, 0] }) => {
	return (
		<group position={position}>
			<mesh
				geometry={boxGeometry}
				scale={[4, 0.2, 4]}
				position={[0, -0.1, 0]}
				receiveShadow
			>
				<meshStandardMaterial color="limegreen" />
			</mesh>
		</group>
	);
};
