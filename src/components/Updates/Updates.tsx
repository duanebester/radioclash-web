import React from "react";

import biotex from "./biotext-svg.svg";
import hbs from "./hbs-logo.jpg";
import medtech from "./medtech-logo.png";
import resi from "./resi-logo.png";

function Update({
	time,
	name,
	desc,
	image,
}: { time: string; name: string; desc: string; image: string }) {
	return (
		<div className="grid grid-cols-6 gap-10 m-4">
			<div className="flex justify-center">
				<img className="w-28 max-h-20 object-contain" alt="Logo" src={image} />
			</div>
			<div className="col-span-5">
				<div className="flex flex-col">
					<span className="text-sm text-gray-400">{time}</span>
					<span className="text-sm">{name}</span>
					<p className="font-thin mt-1">{desc}</p>
				</div>
			</div>
		</div>
	);
}

export const Updates = () => {
	return (
		<div id="home" className="relative bg-gray-100 overflow-hidden">
			<div className="max-w-7xl mx-auto py-10">
				<h1 className="text-2xl text-center py-8 font-extrabold text-gray-900">
					News and Updates
				</h1>
				<Update
					time="Jul 2024"
					name="Biotex Partnership"
					image={biotex}
					desc="RadioClash has partnered with Houston based Biotex. With over 20 years of MedTech expertise, Biotex delivers strategic guidance and a proven track record of success. From development to commercialization, [they] help turn innovative ideas into market-ready medical devices."
				/>
				<Update
					time="Sep 2024"
					name="RESI Boston BioTech Week"
					image={resi}
					desc="RadioClash was the winning company in our medical device pitch cohort. We also won 3rd place in the
        competition overall, and were the only company developing a medical device that placed in the Top 3."
				/>
				<Update
					time="Jan 2025"
					name="RESI JPM in San Francisco"
					image={resi}
					desc="A premier international medtech and biotech event. RadioClash was the winning company in our medical device pitch cohort for the Innovator's Pitch Competition."
				/>
				<Update
					time="Jan 2025"
					name="HBS New Ventures Competition"
					image={hbs}
					desc="Harvard Business School - Advanced to Semifinals in Atlanta, GA"
				/>
				<Update
					time="Mar 2025"
					name="MedTech Innovator"
					image={medtech}
					desc="Advanced to West Coast RoadTour pitch cohort with a successful pitch at UCLA in early March '25. We will receive news if we have made it to the Finals in June."
				/>
			</div>
		</div>
	);
};
