import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Footer } from './components/Footer';
import { Header, SearchBar } from './components/Header';
import { useLoaderData } from 'react-router-dom';
import { getStudents, getTeachers } from '../assets/data/db';

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
	const students = await getStudents();
	const teachers = await getTeachers();
	const kelas = params.kelas.toUpperCase().replaceAll('-', ' ');
	// const studentsData = students.filter((student) => student.kelas == kelas);
	const studentsData = students
		.filter((student) => student.kelas == kelas)
		.sort((a, b) => a.nama.localeCompare(b.nama));
	const walkel = teachers.find(
		(teacher) => teacher.jabatan == `Wali Kelas ${kelas}`,
	);

	if (!walkel) {
		throw new Response('', {
			status: 404,
			statusText: `Data tidak ditemukan!`,
		});
	}

	return { kelas, studentsData, walkel };
}

export function Students() {
	const { kelas, studentsData, walkel } = useLoaderData();

	const imageSizes = [320, 640, 960, 1080];
	const imageSizesAttr =
		'(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw';
	const buildBaseName = (filename) => filename.replace(/\.[^.]+$/, '');
	const buildSrcSet = (filename, basePath) => {
		const baseName = buildBaseName(filename);
		return imageSizes
			.map((size) => `${basePath}/${baseName}-${size}.webp ${size}w`)
			.join(', ');
	};

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
		sectionRender = (
			<main
				id="main-content"
				className="pt-20">
				<h1 className="sr-only">Peserta Didik</h1>
				<Walkel
					walkel={walkel}
					handleMapel={handleMapel}
					buildSrcSet={buildSrcSet}
					imageSizesAttr={imageSizesAttr}
				/>
				<Pesdik
					studentsData={studentsData}
					kelas={kelas}
					buildSrcSet={buildSrcSet}
					imageSizesAttr={imageSizesAttr}
				/>
			</main>
		);
	} else {
		sectionRender = (
			<main
				id="main-content"
				className="pt-20">
				<h1 className="sr-only">Hasil Pencarian Peserta Didik</h1>
				<ResultSearch
					query={query}
					studentsData={studentsData}
					buildSrcSet={buildSrcSet}
					imageSizesAttr={imageSizesAttr}
				/>
			</main>
		);
	}

	return (
		<>
			<Header
				classColor={`text-primary bg-secondary lg:bg-primary lg:text-secondary`}>
				<SearchBar
					placeholderText={`Cari pesdik...`}
					handleSeacrh={handleSeacrh}
				/>
			</Header>
			{sectionRender}
			{/* <Modal /> */}
			<Footer />
		</>
	);
}

function Walkel({ walkel, handleMapel, buildSrcSet, imageSizesAttr }) {
	return (
		<section className="px-16 py-24 cv-auto">
			<div className="container mx-auto">
				<div className="w-full text-center">
					<h2 className="text-2xl lg:text-3xl font-bold uppercase">
						{walkel.jabatan}
					</h2>
					<div className="w-full lg:w-1/3 md:w-1/2 sm:w-2/3 mx-auto mt-7 rounded-md overflow-hidden shadow-lg bg-primary text-secondary">
						<img
							src={`/img/guru/${walkel.image}`}
							srcSet={buildSrcSet(walkel.image, '/img/guru')}
							sizes={imageSizesAttr}
							loading="eager"
							fetchPriority="high"
							decoding="async"
							width={1080}
							height={1920}
							alt={walkel.jabatan}
							className="w-full shadow"
						/>
						<div className="p-4">
							<h4 className="text-lg font-semibold">
								{walkel.nama}
							</h4>
							<h5 className="text-sm font-light py-3 border-b border-secondary">
								{walkel.jabatan}
							</h5>
							<div className="font-light flex flex-wrap text-sm">
								{handleMapel(walkel.mapel, 'border-primary')}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function Pesdik({ kelas, studentsData, buildSrcSet, imageSizesAttr }) {
	let studentsList = studentsData.map((student) => {
		return (
			<div
				key={student.nama}
				className="w-full xl:w-1/4 lg:w-1/3 sm:w-1/2 p-3">
				<div className="rounded-md overflow-hidden shadow-lg bg-secondary text-primary">
					<img
						src={`/img/pesdik/${student.image}`}
						srcSet={buildSrcSet(student.image, '/img/pesdik')}
						sizes={imageSizesAttr}
						alt={student.nama}
						loading="lazy"
						decoding="async"
						width={1080}
						height={1920}
						className="w-full shadow"
					/>
					<div className="p-4">
						<h4 className="text-lg font-semibold">
							{student.nama}
						</h4>
						<h5 className="text-sm font-light py-3 border-b">
							{student.jabatan}
						</h5>
						<div className="flex flex-wrap text-sm font-light"></div>
					</div>
				</div>
			</div>
		);
	});

	return (
		<section className="px-16 py-24 bg-primary text-secondary cv-auto">
			<div className="container mx-auto">
				<div className="w-full text-center">
					<h2 className="text-2xl lg:text-3xl font-bold uppercase mb-7">
						{`Peserta Didik Kelas ${kelas}`}
					</h2>
					<div className="flex flex-wrap justify-center">
						{studentsList}
					</div>
				</div>
			</div>
		</section>
	);
}

function ResultSearch({ query, studentsData, buildSrcSet, imageSizesAttr }) {
	const results = studentsData.filter((student) =>
		student.nama.toLowerCase().includes(query.toLowerCase()),
	);

	let studentsList = results.map((student) => {
		return (
			<div
				key={student.nama}
				className="w-full xl:w-1/4 lg:w-1/3 sm:w-1/2 p-3">
				<div className="rounded-md overflow-hidden shadow-lg ">
					<img
						src={`/img/pesdik/${student.image}`}
						srcSet={buildSrcSet(student.image, '/img/pesdik')}
						sizes={imageSizesAttr}
						width={1080}
						height={1920}
						loading="lazy"
						decoding="async"
						alt={student.nama}
						className="w-full shadow"
					/>
					<div className="p-4">
						<h4 className="text-lg font-semibold">
							{student.nama}
						</h4>
						<h5 className="text-sm font-light py-3 border-b">
							{student.jabatan}
						</h5>
						<div className="flex flex-wrap text-sm font-light"></div>
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
						Hasil Pencarian
					</h2>
					<div className="flex flex-wrap justify-center">
						{studentsList}
					</div>
				</div>
			</div>
		</section>
	);
}

Walkel.propTypes = {
	walkel: PropTypes.shape({
		jabatan: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		nama: PropTypes.string.isRequired,
		mapel: PropTypes.oneOfType([
			PropTypes.arrayOf(PropTypes.string),
			PropTypes.string,
		]),
	}).isRequired,
	handleMapel: PropTypes.func.isRequired,
	buildSrcSet: PropTypes.func.isRequired,
	imageSizesAttr: PropTypes.string.isRequired,
};

Pesdik.propTypes = {
	kelas: PropTypes.string.isRequired,
	studentsData: PropTypes.arrayOf(
		PropTypes.shape({
			nama: PropTypes.string.isRequired,
			image: PropTypes.string.isRequired,
		}),
	).isRequired,
	buildSrcSet: PropTypes.func.isRequired,
	imageSizesAttr: PropTypes.string.isRequired,
};

ResultSearch.propTypes = {
	query: PropTypes.string.isRequired,
	studentsData: PropTypes.arrayOf(
		PropTypes.shape({
			nama: PropTypes.string.isRequired,
			image: PropTypes.string.isRequired,
		}),
	).isRequired,
	buildSrcSet: PropTypes.func.isRequired,
	imageSizesAttr: PropTypes.string.isRequired,
};
