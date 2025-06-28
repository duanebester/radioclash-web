import React from "react";

import { Card } from "./Card";
import damir from "./damir.jpeg";
import duane from "./duane.jpeg";
import john from "./john.jpeg";
import samantha from "./samantha.jpeg";

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
						title={`Director R&D Engineering`}
						desc="Electrical Engineer
          Software & Product Developer"
					/>
					<Card
						photo={damir}
						name="Damir Ljuboja, MD, MBA"
						title="Director of Business Development"
						desc="Interventional Radiology
          UTHealth / MD Anderson Cancer Center"
					/>
					<Card
						photo={samantha}
						name="Samantha Jayawickrama"
						title="Director of Operations"
						desc="Information Science & Technology
          Product Engineering Leader"
					/>
				</div>
			</div>
		</div>
	);
};
