"use client";
import { RigidBody } from "@react-three/rapier";
import { FC, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { CuboidCollider } from "@react-three/rapier";

// instantiated in the top for optimization
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const platform1Material = new THREE.MeshStandardMaterial({
	color: "limegreen",
});
const platform2Material = new THREE.MeshStandardMaterial({
	color: "red",
});

const obstacleMaterial = new THREE.MeshStandardMaterial({
	color: "purple",
});

const wallMaterial = new THREE.MeshStandardMaterial({
	color: "gray",
});

type PlatformProps = {
	position?: [number, number, number];
};

const Platform1: FC<PlatformProps> = ({ position = [0, 0, 0] }) => {
	return (
		<group position={position}>
			<mesh
				geometry={boxGeometry}
				material={platform1Material}
				scale={[4, 0.2, 4]}
				position={[0, -0.1, 0]}
				receiveShadow
			/>
		</group>
	);
};

const Platform2: FC<PlatformProps> = ({ position = [0, 0, 0] }) => {
	const obstacleRef = useRef() as any;
	// randomize speed of rotation and direction

	useFrame((state) => {
		const time = state.clock.getElapsedTime();
		const rotation = new THREE.Quaternion();
		rotation.setFromEuler(new THREE.Euler(0, time, 0));
		obstacleRef.current.setNextKinematicRotation(rotation);
	});
	return (
		<group position={position}>
			<mesh
				geometry={boxGeometry}
				material={platform2Material}
				scale={[4, 0.2, 4]}
				position={[0, -0.1, 0]}
				receiveShadow
			/>
			<RigidBody
				ref={obstacleRef}
				type="kinematicPosition"
				position={[0, 0.3, 0]}
				restitution={0.2}
				friction={0}
			>
				<mesh
					geometry={boxGeometry}
					material={obstacleMaterial}
					scale={[3.5, 0.3, 0.3]}
					castShadow
					receiveShadow
				/>
			</RigidBody>
		</group>
	);
};

const Platform3: FC<PlatformProps> = ({ position = [0, 0, 0] }) => {
	const obstacleRef = useRef() as any;
	const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

	useFrame((state) => {
		const time = state.clock.getElapsedTime();

		const y = Math.sin(time + timeOffset) + 1.15;
		obstacleRef.current.setNextKinematicTranslation({
			x: position[0],
			y: position[1] + y,
			z: position[2],
		});
	});

	return (
		<group position={position}>
			<mesh
				geometry={boxGeometry}
				material={platform2Material}
				position={[0, -0.1, 0]}
				scale={[4, 0.2, 4]}
				receiveShadow
			/>
			<RigidBody
				ref={obstacleRef}
				type="kinematicPosition"
				colliders="ball"
				position={[0, 0.3, 0]}
				restitution={0.2}
				friction={0}
			>
				<mesh material={obstacleMaterial}>
					<sphereGeometry />
				</mesh>
			</RigidBody>
		</group>
	);
};

const Platform4: FC<PlatformProps> = ({ position = [0, 0, 0] }) => {
	const obstacleRef = useRef() as any;
	// randomize speed of rotation and direction
	const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

	useFrame((state) => {
		const time = state.clock.getElapsedTime();
		const x = Math.sin(time + timeOffset) + 1.25;
		obstacleRef.current.setNextKinematicTranslation({
			x: position[0] + x,
			y: position[1] + 0.75,
			z: position[2],
		});
	});
	return (
		<group position={position}>
			<mesh
				geometry={boxGeometry}
				material={platform2Material}
				scale={[4, 0.2, 4]}
				position={[0, -0.1, 0]}
				receiveShadow
			/>
			<RigidBody
				ref={obstacleRef}
				type="kinematicPosition"
				position={[0, 0.3, 0]}
				restitution={0.2}
				friction={0}
			>
				<mesh
					geometry={boxGeometry}
					material={obstacleMaterial}
					scale={[1.5, 1.5, 0.3]}
					castShadow
					receiveShadow
				/>
			</RigidBody>
		</group>
	);
};

const PlatformEnd: FC<PlatformProps> = ({ position = [0, 0, 0] }) => {
	return (
		<group position={position}>
			<mesh
				geometry={boxGeometry}
				material={platform1Material}
				scale={[4, 0.2, 4]}
				position={[0, -0.1, 0]}
				receiveShadow
			/>
		</group>
	);
};

const Walls = ({ length = -5 }) => {
	return (
		<>
			<RigidBody type="fixed" restitution={0.2} friction={0}>
				{/* <mesh
					position={[2.15, 0.75, -length * 2 + -1.8]}
					geometry={boxGeometry}
					material={wallMaterial}
					scale={[0.3, 1.5, 4 * length]}
					castShadow
				/> */}
				<mesh
					position={[2.3, 0.4, -length * 2 + -1.8]}
					rotation-z={-Math.PI / 4}
					geometry={boxGeometry}
					material={wallMaterial}
					scale={[0.3, 5, 4 * length]}
					castShadow
				/>
				{/* <mesh
					position={[-2.15, 0.75, -(length * 2) + -1.8]}
					geometry={boxGeometry}
					material={wallMaterial}
					scale={[0.3, 1.5, 4 * length]}
					castShadow
				/> */}
				<mesh
					position={[-2.3, 0.4, -length * 2 + -1.8]}
					rotation-z={Math.PI / 4}
					geometry={boxGeometry}
					material={wallMaterial}
					scale={[0.3, 5, 4 * length]}
					castShadow
				/>
				<mesh
					position={[0, 0.8, -1]}
					geometry={boxGeometry}
					material={wallMaterial}
					scale={[8, 3, 0.3]}
					castShadow
				/>
				<CuboidCollider
					args={[2, 0.2, -(length * 3) + -1.8]}
					position={[0, -0.17, 5]}
					restitution={0.2}
					friction={1}
				/>
			</RigidBody>
		</>
	);
};

export const Platform = () => {
	return (
		<>
			<Platform1 position={[0, 0, 16]} />
			<Platform2 position={[0, 0, 12]} />
			<Platform3 position={[0, 0, 8]} />
			<Platform4 position={[0, 0, 4]} />
			<PlatformEnd position={[0, 0, 0]} />

			<Walls />
		</>
	);
};
