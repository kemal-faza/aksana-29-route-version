import { useState } from 'react';
import PropTypes from 'prop-types';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export default function Gallery() {
	return (
		<>
			<Header classColor="text-primary bg-secondary/70 lg:bg-primary lg:text-secondary" />
			<main
				id="main-content"
				className="px-16 py-24">
				<h1 className="sr-only">Galeri</h1>
				<div className="w-full">
					<h2 className="text-4xl font-bold uppercase text-center">
						Video Angkatan
					</h2>
					<div className="py-16">
						<LazyVideo
							src="https://drive.google.com/file/d/1vJTo8jujciCuFsyKsdmBY2WqlSPpHK9i/preview"
							title="Video Angkatan"
						/>
					</div>
				</div>
				<div className="w-full cv-auto">
					<h2 className="text-4xl font-bold uppercase text-center">
						After Movie
					</h2>
					<div className="py-16">
						<LazyVideo
							src="https://drive.google.com/file/d/1vScWn_hF_GCe3wlnEcuKA9eITuLMqkNX/preview"
							title="After Movie"
						/>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}

function LazyVideo({ src, title }) {
	const [isActive, setIsActive] = useState(false);

	return (
		<div className="relative w-full aspect-video overflow-hidden rounded-md shadow-lg bg-dark/50">
			{isActive ? (
				<iframe
					src={src}
					title={title}
					loading="lazy"
					allow="autoplay; fullscreen"
					allowFullScreen
					className="absolute inset-0 h-full w-full"></iframe>
			) : (
				<button
					type="button"
					className="absolute inset-0 flex h-full w-full items-center justify-center bg-dark/60 text-secondary text-lg font-semibold"
					aria-label={`Play ${title}`}
					onClick={() => setIsActive(true)}>
					Play {title}
				</button>
			)}
		</div>
	);
}

LazyVideo.propTypes = {
	src: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};
