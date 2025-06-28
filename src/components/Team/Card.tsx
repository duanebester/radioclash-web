import React from "react";

export const Card = ({
	photo,
	name,
	title,
	desc,
}: { photo: string; name: string; title: string; desc: string }) => {
	return (
		<div className="grid grid-flow-row auto-rows-max mx-auto">
			<div className="flex flex-col items-center font-extrabold text-gray-600">
				<img className="rounded-full w-32 md:w-40" alt="Logo" src={photo} />
				<span className="text-center text-sm py-3">{name}</span>
				<span className="text-center text-xs">{title}</span>
				<p className="text-center font-thin mt-1">{desc}</p>
			</div>
		</div>
	);
}
