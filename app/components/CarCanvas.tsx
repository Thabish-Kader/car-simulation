"use client";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { FC } from "react";
import * as Three from "three";
import { Platform } from "./Platform";
type CarModelProps = {};

const CarModel: FC<CarModelProps> = (props) => {
	const { nodes, materials } = useGLTF("/Car.glb") as any;

	return (
		<group {...props} dispose={null}>
			<group position={[0.079, 0.572, -0.311]} scale={[2.278, -0.33, 1]}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cube.geometry}
					material={materials.CarBodyPaintMaterial}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cube_1.geometry}
					material={materials.CarGlassMaterial}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cube_2.geometry}
					material={materials.CarIndicatorMaterial}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cube_3.geometry}
					material={materials.CarHeadLightMaterial}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cube_4.geometry}
					material={materials.CarBumperMaterial}
				/>
			</group>
			<group
				position={[-1.281, 0.235, -1.236]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={[0.163, 0.07, 0.163]}
			>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cylinder001.geometry}
					material={materials.CarTyreMaterial}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cylinder001_1.geometry}
					material={materials.CarTyreRimMaterial}
				/>
			</group>
			<group
				position={[1.503, 0.235, 0.676]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={[0.163, 0.07, 0.163]}
			>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cylinder002.geometry}
					material={materials.CarTyreRimMaterial}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cylinder002_1.geometry}
					material={materials.CarTyreMaterial}
				/>
			</group>
			<group
				position={[-1.278, 0.235, 0.626]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={[0.163, 0.07, 0.163]}
			>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cylinder004.geometry}
					material={materials.CarTyreMaterial}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cylinder004_1.geometry}
					material={materials.CarTyreRimMaterial}
				/>
			</group>
			<group
				position={[1.513, 0.247, -1.236]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={[0.163, 0.07, 0.163]}
			>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cylinder005.geometry}
					material={materials.CarTyreMaterial}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cylinder005_1.geometry}
					material={materials.CarTyreRimMaterial}
				/>
			</group>
		</group>
	);
};

export const CarCanvas = () => {
	return (
		<Canvas>
			<OrbitControls />
			<Environment preset="city" />
			<CarModel position-y={0} rotation-y={-Math.PI / 2} />
			<Platform position={[0, 0, 0]} />
		</Canvas>
	);
};
