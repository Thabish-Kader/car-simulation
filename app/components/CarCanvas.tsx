"use client";
import {
	Environment,
	OrbitControls,
	useGLTF,
	useKeyboardControls,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { FC, useRef } from "react";
import { KeyboardControls } from "@react-three/drei";
import { Platform } from "./Platform";
import { Physics, RigidBody } from "@react-three/rapier";

type CarModelProps = {
	scale: number;
};

const CarModel: FC<CarModelProps> = (props) => {
	const { nodes, materials } = useGLTF("/Car.glb") as any;
	const carBodyRef = useRef(null) as any;
	const [subscribeKeys, getKeys] = useKeyboardControls();

	useFrame((state, delta) => {
		const { forward, back, left, right } = getKeys();
		const impulse = { x: 0, y: 0, z: 0 };
		const torque = { x: 0, y: 0, z: 0 };

		const impulseStrength = delta * 10;
		const torqueStrength = 1 * delta;

		if (forward) {
			impulse.z -= impulseStrength;
			if (right) {
				torque.y -= 0.01;
				impulse.x += impulseStrength * 0.5;
				impulse.z -= 0;
			}
			if (left) {
				torque.y += 0.01;
				impulse.x -= impulseStrength * 0.5;
				impulse.z -= 0;
			}
		} else if (back) {
			impulse.z = impulseStrength;
			if (right) {
				torque.y += 0.01;
				impulse.x += impulseStrength * 0.5;
				impulse.z = 0;
			}
			if (left) {
				torque.y -= torqueStrength;
				impulse.x -= impulseStrength * 0.5;
				impulse.z = 0;
			}
		}
		carBodyRef.current.applyImpulse(impulse);
		carBodyRef.current.applyTorqueImpulse(torque);
	});

	return (
		// TODO: May have to change colliders shape to optimize
		<RigidBody
			ref={carBodyRef}
			canSleep={false}
			colliders="hull"
			friction={1}
			restitution={0.4}
		>
			<group {...props} dispose={null}>
				<group
					position={[0.079, 0.572, -0.311]}
					scale={[2.278, -0.33, 1]}
				>
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
		</RigidBody>
	);
};

export const CarCanvas = () => {
	return (
		<KeyboardControls
			map={[
				{ name: "forward", keys: ["ArrowUp", "KeyW"] },
				{ name: "back", keys: ["ArrowDown", "KeyS"] },
				{ name: "left", keys: ["ArrowLeft", "KeyA"] },
				{ name: "right", keys: ["ArrowRight", "KeyD"] },
			]}
		>
			<Canvas
				shadows
				camera={{
					fov: 50,
					near: 0.1,
					far: 200,
					position: [
						3.520412193565621, 3.0406603027452204,
						29.855758283418634,
					],
				}}
			>
				<OrbitControls />
				<Environment preset="city" />
				<Physics debug={true}>
					<CarModel
						position-y={1}
						position-z={16}
						rotation-y={-Math.PI / 2}
						scale={0.3}
					/>

					<Platform />
				</Physics>
			</Canvas>
		</KeyboardControls>
	);
};
