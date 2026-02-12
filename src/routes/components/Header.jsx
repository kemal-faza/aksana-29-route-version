import PropTypes from 'prop-types';
import { ChevronDown } from 'react-feather';
import { NavLink } from 'react-router-dom';

export function Header({ classColor, children }) {
	const handleNavbarClick = () => {
		const navMenu = document.querySelector('#nav-menu');
		const navButton = document.querySelector('#hamburger');
		const isExpanded = navButton.getAttribute('aria-expanded') === 'true';

		navButton.classList.toggle('active');
		navMenu.classList.toggle('active');
		navButton.setAttribute('aria-expanded', String(!isExpanded));
	};

	const hamburgerLine = ['origin-top-right', '', 'origin-bottom-right'];
	const htmlHamburgerLine = hamburgerLine.map((className) => (
		<span
			key={className}
			className={`w-[30px] h-[2px] my-[8.5px] block bg-primary transition duration-300 toggle ${className}`}></span>
	));

	const handleDropdownCLick = (dropdownToggle) => {
		const dropdownMenu = dropdownToggle.nextSibling;
		dropdownMenu.classList.toggle('active');
	};

	let classStudents = [
		'XII IPA 1',
		'XII IPA 2',
		'XII IPA 3',
		'XII IPA 4',
		'XII IPS 1',
		'XII IPS 2',
		'XII IPS 3',
		'XII PAI',
	].map((kelas) => {
		return (
			<ClassListItem
				key={kelas}
				kelas={kelas}
			/>
		);
	});

	return (
		<header
			className={`fixed top-0 left-0 right-0 ${classColor} backdrop-blur-sm z-10 transition duration-300`}>
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between relative">
					<a
						href="/"
						className="text-lg font-bold block py-4 px-4 lg:bg-inherit hover:bg-primary/20 lg:hover:bg-secondary/20 rounded-md transition duration-300">
						AKSANA 29
					</a>
					<div className="flex items-center px-4">
						<button
							id="hamburger"
							name="hamburger"
							type="button"
							aria-label="Toggle navigation"
							aria-controls="nav-menu"
							aria-expanded="false"
							className="block absolute right-4 lg:hidden"
							onClick={handleNavbarClick}>
							{htmlHamburgerLine}
						</button>
						<nav
							id="nav-menu"
							className="absolute py-3 bg-secondary lg:bg-transparent rounded-b-lg w-full right-0 top-full transition duration-300 -z-10 lg:z-0 lg:static lg:max-w-full">
							<ul className="text-base block font-bold lg:flex lg:items-center">
								<li>
									<NavLink
										to="/guru"
										className="py-3 px-4 block w-full hover:bg-primary/20 lg:hover:bg-secondary/20 transition duration-300 lg:rounded-md">
										Guru
									</NavLink>
								</li>
								<li className="relative">
									<NavLink
										to="/pesdik"
										className="py-3 px-4 w-full
				hover:bg-primary/20 lg:hover:bg-secondary/20 transition duration-300 flex items-center lg:rounded-md dropdown-toggle"
										onClick={(e) => {
											e.preventDefault();
											handleDropdownCLick(
												e.currentTarget,
											);
										}}
										id="navbarDropdown">
										Kelas
										<ChevronDown
											size="16px"
											className="ml-1"
										/>
									</NavLink>
									<ul
										className="lg:my-1 rounded-md text-secondary bg-primary lg:text-primary lg:bg-secondary transition delay-100 lg:delay-0 duration-300 lg:duration-150 ease-in-out lg:absolute lg:w-40 overflow-hidden lg:overflow-visible origin-top-left dropdown-navbar"
										id="navbarDropdown">
										{classStudents}
									</ul>
								</li>
								<li>
									<NavLink
										to="/galeri"
										className="py-3 px-4 block w-full hover:bg-primary/20 lg:hover:bg-secondary/20 lg:rounded-md transition duration-300">
										Galeri
									</NavLink>
								</li>
								<li className="px-3">{children}</li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</header>
	);
}

Header.propTypes = {
	classColor: PropTypes.string,
	children: PropTypes.node,
};

export function SearchBar({ handleSeacrh, placeholderText }) {
	return (
		<input
			type="text"
			placeholder={placeholderText}
			autoFocus
			onChange={(e) => {
				window.scrollTo({
					top: 0,
				});
				handleSeacrh(e.target.value);
			}}
			className=" w-full text-sm text-dark font-normal px-4 py-2 border border-slate-400 rounded-full focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 placeholder:text-slate-400 placeholder:italic"
		/>
	);
}

SearchBar.propTypes = {
	handleSeacrh: PropTypes.func.isRequired,
	placeholderText: PropTypes.string.isRequired,
};

function ClassListItem({ kelas }) {
	return (
		<li>
			<a
				href={`/pesdik/${kelas.toLowerCase().replaceAll(' ', '-')}`}
				onClick={(e) => {
					if (document.location.hash) {
						e.preventDefault();
						document.location.href = e.currentTarget.href;
						window.location.reload();
					}
				}}
				className="block py-3 px-4 w-full
hover:bg-secondary/20 lg:hover:bg-primary/20 transition">
				{kelas}
			</a>
		</li>
	);
}

ClassListItem.propTypes = {
	kelas: PropTypes.string.isRequired,
};
