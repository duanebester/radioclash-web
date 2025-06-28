import React from "react";
import ashok from "./ashok.jpeg";
import biotex from "./biotex.png";
import { Card } from "./Card";
import manish from "./manish.png";

export const Biotex = () => {
	return (
		<div id="home" className="relative bg-gray-100 overflow-hidden">
			<div className="max-w-7xl mx-auto py-10">
				<h1 className="text-2xl text-center py-8 font-extrabold text-gray-900">
					Our Partner
				</h1>
				{/* Responsive grid: 1 column on mobile, 2 on tablet, 3 on desktop */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto px-4">
					<div className="flex flex-col items-center font-extrabold text-gray-600">
						<img className="w-32 md:w-36" alt="Biotex Logo" src={biotex} />
						<span className="text-center text-sm py-3">Biotex, Inc</span>
						<span className="text-center text-xs">
							<a href="https://biotexmedical.com">https://biotexmedical.com</a>
						</span>
						<p className="text-center font-thin mt-1">
							Premier medtech product development accelerator
						</p>
					</div>
					<Card
						photo={ashok}
						name="Ashok Gowda, PhD"
						title="Board of Directors"
						desc="President BioTex, Inc.
          Partner, MedTex Ventures"
					/>
					<Card
						photo={manish}
						name="Manish Ahuja"
						title="Board of Directors Observer"
						desc="CEO BioTex, Inc."
					/>
				</div>
			</div>
		</div>
	);
};
