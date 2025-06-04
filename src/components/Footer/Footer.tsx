import React from "react";

import logoFull from "../../logo-full.png";

export const Footer = () => {
	return (
		<div
			id="contact"
			className="relative bg-blue-700 text-white overflow-hidden"
		>
			<div className="max-w-7xl mx-auto h-auto">
				{/* Responsive grid: 1 column on mobile, 3 columns on larger screens */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-20 px-4">
					{/* Headquarters - order 1 on mobile, order 1 on desktop */}
					<div className="grid grid-flow-row auto-rows-max mx-auto text-center md:text-left order-1">
						<h4>Headquarters</h4>
						<span className="font-thin">5813 Fulton St</span>
						<span className="font-thin">Houston, TX 77009</span>
					</div>

					{/* Logo - order 3 on mobile (bottom), order 2 on desktop (center) */}
					<div className="grid grid-flow-row auto-rows-max mx-auto order-3 md:order-2">
						<img
							src={logoFull}
							width="250px"
							alt="RadioClash Logo"
							className="mx-auto"
						/>
					</div>

					{/* Contact info - order 2 on mobile, order 3 on desktop */}
					<div className="grid grid-flow-row auto-rows-max mx-auto text-center md:text-left order-2 md:order-3">
						<h4>Email</h4>
						<a href="mailto:info@radioclash.co" className="font-thin">
							info@radioclash.co
						</a>
						<h4 className="mt-1">Social</h4>
						<a
							href="https://www.linkedin.com/company/radioclash-inc/posts"
							className="font-thin"
						>
							LinkedIn
						</a>
					</div>
				</div>
				<div className="w-max mx-auto py-4">
					<span className="font-thin">&copy; 2025 RadioClash, Inc.</span>
				</div>
			</div>
		</div>
	);
};
