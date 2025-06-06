import React from "react";

// import logo from '../../logo.png'

export const Hero = () => {
	return (
		<div id="home" className="relative bg-white overflow-hidden">
			<div className="max-w-7xl mx-auto">
				<div className="z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
					<main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
						<div className="sm:text-center lg:text-left">
							<h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
								<span className="inline">RadioClash is the future of</span>{" "}
								<span className="inline text-blue-400">
									enhanced electroporation therapy
								</span>
							</h1>
							{/* Mobile image - centered and smaller */}
							<div className="mt-3 flex justify-center lg:hidden">
								<img
									className="h-44 w-auto object-contain"
									src="/assets/full-probe-side-view.png"
									alt="Probe"
								/>
							</div>
							<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
								A revolutionary new treatment for cancer of the liver, pancreas,
								and bones. Effective, more affordable, faster recovery,
								minimally invasive.
							</p>
							<div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
								<div className="rounded-md shadow">
									<a
										href="mailto:info@radioclash.co"
										className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 md:py-4 md:text-lg md:px-10"
									>
										Contact Us
									</a>
								</div>
							</div>
						</div>
					</main>
				</div>
				{/* Desktop image - positioned absolutely */}
				<div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-20 lg:w-5/12">
					<img
						className="h-full w-full object-cover hero"
						src="https://radioclash.co/assets/full-probe-cavalier.png"
						alt="Probe"
					/>
				</div>
			</div>
		</div>
	);
};
