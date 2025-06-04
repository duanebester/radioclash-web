import React from "react";

import ashok from "./ashok.jpeg";
import damir from "./damir.jpeg";
import duane from "./duane.jpeg";
import john from "./john.jpeg";

function Card({
	photo,
	name,
	title,
	desc,
}: { photo: string; name: string; title: string; desc: string }) {
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

export const Team = () => {
	return (
		<div id="home" className="relative bg-white overflow-hidden">
			<div className="max-w-7xl mx-auto py-10">
				<h1 className="text-2xl text-center py-8 font-extrabold text-gray-900">
					Our Team
				</h1>
				{/* Responsive grid: 1 column on mobile, 2 on tablet, 4 on desktop */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto px-4">
					<Card
						photo={john}
						name="John Qiao, MD"
						title="Founder & Chief Executive Officer"
						desc="Interventional Radiology
          UTHealth / MD Anderson Cancer Center"
					/>
					<Card
						photo={duane}
						name="Duane Bester, BS EE"
						title="Chief Technology Officer"
						desc="Electrical Engineer
          Software & Product Developer"
					/>
					<Card
						photo={damir}
						name="Damir Ljuboja, MD, MBA"
						title="Chief Financial Officer"
						desc="Interventional Radiology
          UTHealth / MD Anderson Cancer Center"
					/>
					<Card
						photo={ashok}
						name="Ashok Gowda, PhD"
						title="Board of Directors"
						desc="President BioTex, Inc.
          Partner, MedTex Ventures"
					/>
				</div>
			</div>
		</div>
	);
};
