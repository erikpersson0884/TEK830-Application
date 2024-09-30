import React from 'react';

import './Footer.css'

const Footer: React.FC = () => {
	let peopleList = [
		{ name: "Erik Persson", email: "erperss@chalmers.se"},
		{ name: "Frida Sundelin", email: "frisunde@chalmers.se"},
		{ name: "Adam Hellgård", email: "hellgard@chalmers.se"},
		{ name: "Pontus Wikström", email: "ponwik@chalemrs.se"},
		{ name: "Adrian Wirthgen", email: "adrwirt@chalmers.se"},
		{ name: "David Lewis", email: "davidlew@chalmers.se"}
	];
	return (
		<footer>
			<img src="images/chalmers-logo.png" alt="Chalmers logo" />

			<div className="listOfPeople">
				<ul className="listFooter">
					{peopleList.map((item) => 
						<li className="listOfPeopleItem">
							{item.name}: {item.email}
						</li>
					)}
				</ul>
			</div>
		</footer>
	);
}

export default Footer;