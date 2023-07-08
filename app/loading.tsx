import React from "react";

const ControlsBox = () => {
	return (
		<div className="flex flex-wrap text-black justify-center items-center p-4 bg-gray-200 rounded-lg">
			<div className="flex justify-center items-center border border-gray-400 rounded-lg p-2 m-1">
				<span className="font-bold">W/&uarr;</span>
				<p className="ml-2">Front</p>
			</div>
			<div className="flex justify-center items-center border border-gray-400 rounded-lg p-2 m-1">
				<span className="font-bold">S/&darr;</span>
				<p className="ml-2">Back</p>
			</div>
			<div className="flex justify-center items-center border border-gray-400 rounded-lg p-2 m-1">
				<span className="font-bold">D/&rarr;</span>
				<p className="ml-2">Right</p>
			</div>
			<div className="flex justify-center items-center border border-gray-400 rounded-lg p-2 m-1">
				<span className="font-bold">A/&larr;</span>
				<p className="ml-2">Left</p>
			</div>
			<div className="flex justify-center items-center border border-gray-400 rounded-lg p-2 m-1">
				<span className="font-bold">Space</span>
				<p className="ml-2">Nitros</p>
			</div>
		</div>
	);
};

const Loading = () => {
	return (
		<div className="bg-black/90 h-screen text-white flex flex-col items-center justify-center">
			<div
				className="inline-block h-24 w-24 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
				role="status"
			>
				<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
					Loading...
				</span>
			</div>
			<div className="mt-12 space-y-4">
				<h1 className="text-white text-5xl">Contols</h1>
				<ControlsBox />
			</div>
		</div>
	);
};

export default Loading;
