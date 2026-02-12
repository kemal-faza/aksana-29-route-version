import { useLoaderData } from 'react-router-dom';
import { getTeachers } from '../assets/data/db';
import { Footer } from './components/Footer';
import { Header, SearchBar } from './components/Header';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
	const teachers = await getTeachers();

	return { teachers };
}

export default function Teachers() {
	useEffect(() => {
		const handleScroll = () => {
			const header = document.querySelector('header');
			if (!header) {
				return;
			}
			if (window.scrollY > 0) {
				header.classList.replace('lg:bg-primary', 'lg:bg-primary/80');
			} else {
				header.classList.replace('lg:bg-primary/80', 'lg:bg-primary');
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const [query, setQuery] = useState('');

	const handleSeacrh = (keyword) => {
		setQuery(keyword);
	};

	let sectionRender;
	if (query.length == 0) {
		const sections = [
			{ jabatan: 'Kepala Madrasah', darkMode: false },
			{ jabatan: 'Kepala Tata Usaha', darkMode: true },
			{ jabatan: 'Wakamad', darkMode: false },
			{ jabatan: 'Wali Kelas', darkMode: true },
			{ jabatan: 'Dewan Guru', darkMode: false },
		];

		sectionRender = (
			<main
				id="main-content"
				className="pt-20">
				<h1 className="sr-only">Daftar Guru</h1>
				{sections.map((section, index) => (
					<LazySection
						key={section.jabatan}
						minHeight={900}
						rootMargin="300px">
						<Cards
							jabatan={section.jabatan}
							darkMode={section.darkMode}
							shouldPreload={index == 0}
						/>
					</LazySection>
				))}
			</main>
		);
	} else {
		sectionRender = (
			<main
				id="main-content"
				className="pt-20">
				<h1 className="sr-only">Hasil Pencarian Guru</h1>
				<ResultSearch query={query} />
			</main>
		);
	}

	return (
		<>
			<Header classColor="text-primary bg-secondary/70 lg:bg-primary lg:text-secondary">
				<SearchBar
					handleSeacrh={handleSeacrh}
					placeholderText="Cari guru..."
				/>
			</Header>
			{sectionRender}
			<Footer />
		</>
	);
}

const IMAGE_SIZES = [320, 640, 960, 1080];
const IMAGE_SIZES_ATTR =
	'(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw';

const buildBaseName = (filename) => filename.replace(/\.[^.]+$/, '');

const buildSrcSet = (filename, basePath) => {
	const baseName = buildBaseName(filename);
	return IMAGE_SIZES.map(
		(size) => `${basePath}/${baseName}-${size}.webp ${size}w`,
	).join(', ');
};

function LazySection({ children, rootMargin = '200px', minHeight = 800 }) {
	const [isVisible, setIsVisible] = useState(false);
	const containerRef = useRef(null);

	useEffect(() => {
		if (!containerRef.current || isVisible) {
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ rootMargin },
		);

		observer.observe(containerRef.current);
		return () => observer.disconnect();
	}, [isVisible, rootMargin]);

	return (
		<div
			ref={containerRef}
			style={!isVisible ? { minHeight } : undefined}>
			{isVisible ? children : null}
		</div>
	);
}

function Cards({ jabatan = '', query = '', darkMode = false, shouldPreload }) {
	const { teachers } = useLoaderData();
	let teachersData = teachers.filter((teacher) =>
		query.length > 0
			? teacher.nama.includes(query.toLowerCase())
			: teacher.jabatan.includes(jabatan),
	);

	const handleMapel = (subjects, borderColor = '') => {
		subjects = Array.isArray(subjects) ? [...subjects] : [subjects];
		const subjectsList = subjects.map((subject, index) => {
			const words = subject.split(' ');
			const wordsPrev = subjects[index - 1]
				? subjects[index - 1].split(' ')
				: [];
			const wordsNext = subjects[index + 1]
				? subjects[index + 1].split(' ')
				: [];

			let classes = '';
			if (words.length > 2 || subjects.length == 1) {
				classes = 'w-full';
			} else {
				if (
					(wordsPrev.length > 2 && wordsNext > 2) ||
					(wordsPrev.length > 2 && wordsNext == 0)
				) {
					classes = 'w-full';
				} else {
					classes = 'w-1/2';
					if (index % 2 == 0) {
						classes += ' border-r';
					}
				}
			}

			return (
				<p
					key={subject}
					className={`py-3 ${borderColor} ${classes}`}>
					{subject}
				</p>
			);
		});
		return subjectsList;
	};

	let teachersList = teachersData.map((teacher, index) => {
		const isPriority = shouldPreload && index == 0;
		return (
			<div
				key={teacher.nama}
				className="w-full xl:w-1/4 lg:w-1/3 sm:w-1/2 p-3">
				<div
					className={`rounded-md overflow-hidden shadow-lg ${
						!darkMode
							? 'bg-primary text-secondary'
							: 'bg-secondary text-primary'
					}`}>
					<img
						src={`/img/guru/${teacher.image}`}
						srcSet={buildSrcSet(teacher.image, '/img/guru')}
						sizes={IMAGE_SIZES_ATTR}
						loading={isPriority ? 'eager' : 'lazy'}
						fetchPriority={isPriority ? 'high' : 'auto'}
						decoding="async"
						width={1080}
						height={1920}
						alt={teacher.nama}
						className="w-full shadow"
					/>
					<div className="p-4">
						<h4 className="text-lg font-semibold">
							{teacher.nama}
						</h4>
						<h5 className="text-sm font-light py-3 border-b">
							{teacher.jabatan}
						</h5>
						<div className="flex flex-wrap text-sm font-light">
							{teacher.mapel && handleMapel(teacher.mapel)}
						</div>
					</div>
				</div>
			</div>
		);
	});

	return (
		<section
			className={`px-16 py-24 ${
				darkMode
					? 'bg-primary text-secondary'
					: 'bg-secondary text-primary'
			} cv-auto`}>
			<div className="container mx-auto">
				<div className="w-full text-center">
					<h2 className="text-2xl lg:text-3xl font-bold uppercase mb-7">
						{jabatan == 'Wakamad'
							? 'Wakil Kepala Madrasah'
							: jabatan}
					</h2>
					<div className="flex flex-wrap justify-center">
						{teachersList}
					</div>
				</div>
			</div>
		</section>
	);
}

function ResultSearch({ query }) {
	const { teachers } = useLoaderData();
	const results = teachers.filter((teacher) =>
		teacher.nama.toLowerCase().includes(query.toLowerCase()),
	);

	const handleMapel = (subjects, borderColor = '') => {
		subjects = Array.isArray(subjects) ? [...subjects] : [subjects];
		const subjectsList = subjects.map((subject, index) => {
			const words = subject.split(' ');
			const wordsPrev = subjects[index - 1]
				? subjects[index - 1].split(' ')
				: [];
			const wordsNext = subjects[index + 1]
				? subjects[index + 1].split(' ')
				: [];

			let classes = '';
			if (words.length > 2 || subjects.length == 1) {
				classes = 'w-full';
			} else {
				if (
					(wordsPrev.length > 2 && wordsNext > 2) ||
					(wordsPrev.length > 2 && wordsNext == 0)
				) {
					classes = 'w-full';
				} else {
					classes = 'w-1/2';
					if (index % 2 == 0) {
						classes += ' border-r';
					}
				}
			}

			return (
				<p
					key={subject}
					className={`py-3 ${borderColor} ${classes}`}>
					{subject}
				</p>
			);
		});
		return subjectsList;
	};

	let resultsList = results.map((teacher) => {
		return (
			<div
				key={teacher.nama}
				className="w-full xl:w-1/4 lg:w-1/3 sm:w-1/2 p-3">
				<div className="rounded-md overflow-hidden shadow-lg bg-primary text-secondary">
					<img
						src={`/img/guru/${teacher.image}`}
						srcSet={buildSrcSet(teacher.image, '/img/guru')}
						sizes={IMAGE_SIZES_ATTR}
						alt={teacher.jabatan}
						loading="lazy"
						decoding="async"
						width={1080}
						height={1920}
						className="w-full shadow"
					/>
					<div className="p-4">
						<h4 className="text-lg font-semibold">
							{teacher.nama}
						</h4>
						<h5 className="text-sm font-light py-3 border-b">
							{teacher.jabatan}
						</h5>
						<div className="flex flex-wrap text-sm font-light">
							{handleMapel(teacher.mapel ? teacher.mapel : [])}
						</div>
					</div>
				</div>
			</div>
		);
	});

	return (
		<section className="px-16 py-24 cv-auto">
			<div className="container mx-auto">
				<div className="w-full text-center">
					<h2 className="text-2xl lg:text-3xl font-bold uppercase mb-7">
						Dewan Guru
					</h2>
					<div className="flex flex-wrap justify-center">
						{resultsList}
					</div>
				</div>
			</div>
		</section>
	);
}

Cards.propTypes = {
	jabatan: PropTypes.string,
	query: PropTypes.string,
	darkMode: PropTypes.bool,
	shouldPreload: PropTypes.bool,
};

ResultSearch.propTypes = {
	query: PropTypes.string.isRequired,
};

LazySection.propTypes = {
	children: PropTypes.node,
	rootMargin: PropTypes.string,
	minHeight: PropTypes.number,
};
