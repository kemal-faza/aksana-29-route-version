import { useEffect } from 'react';
import { User, Users } from 'react-feather';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { CountUp } from 'countup.js';

export function App() {
	useEffect(() => {
		const header = document.querySelector('header');
		const banyakPesdikLakiLaki = new CountUp(
			'jumlah-pesdik-laki-laki',
			115,
			{
				enableScrollSpy: true,
				separator: '.',
				decimal: ',',
				duration: 3,
				suffix: ' Orang',
			},
		);
		const banyakSemuaPesdik = new CountUp('jumlah-semua-pesdik', 279, {
			enableScrollSpy: true,
			separator: '.',
			decimal: ',',
			duration: 3,
			suffix: ' Orang',
		});
		const banyakPesdikPerempuan = new CountUp(
			'jumlah-pesdik-perempuan',
			164,
			{
				enableScrollSpy: true,
				separator: '.',
				decimal: ',',
				duration: 3,
				suffix: ' Orang',
			},
		);

		let ticking = false;
		const handleScroll = () => {
			if (ticking) {
				return;
			}
			ticking = true;
			window.requestAnimationFrame(() => {
				if (header) {
					if (window.scrollY > 0) {
						header.classList.add('navbar-fixed');
						header.classList.remove('lg:bg-transparent');
					} else {
						header.classList.remove('navbar-fixed');
						header.classList.add('lg:bg-transparent');
					}
				}

				banyakPesdikLakiLaki.handleScroll();
				banyakSemuaPesdik.handleScroll();
				banyakPesdikPerempuan.handleScroll();
				ticking = false;
			});
		};

		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<>
			<Header classColor="text-primary bg-secondary lg:bg-transparent lg:text-secondary" />
			<main
				id="main-content"
				className="pt-14 md:pt-0">
				<Home />
				<About />
			</main>
			<Footer />
		</>
	);
}

function Home() {
	const imageSizesAttr = '100vw';
	const heroSrcSet =
		'/img/homepage/home-640.webp 640w, /img/homepage/home-960.webp 960w, /img/homepage/home-1080.webp 1080w, /img/homepage/home-1920.webp 1920w';
	return (
		<section
			className="relative w-full mt-14 md:mt-0"
			id="home">
			<img
				src="/img/homepage/home.webp"
				srcSet={heroSrcSet}
				sizes={imageSizesAttr}
				fetchPriority="high"
				decoding="async"
				width={1920}
				height={1080}
				alt="Home Page"
				className="w-full brightness-50"
			/>
			<div className="w-full absolute top-0 right-1/2 h-full translate-x-1/2 flex items-center">
				<div className="flex flex-wrap justify-center text-center self-center my-auto">
					<h1 className="text-white text-[18vw] font-extrabold font-bebas tracking-[2vw] mx-auto drop-shadow-lg leading-none">
						AKSANA 29
					</h1>
					<h3 className="text-white text-[3vw] tracking-[1.3vw] font-extrabold lg:mb-28">
						MAN KAPUAS ANGKATAN KE - 29
					</h3>
				</div>
			</div>
		</section>
	);
}

function About() {
	const imageSizesAttr = '(max-width: 1024px) 100vw, 50vw';
	const aksanaSrcSet =
		'/img/homepage/about/aksana-320.webp 320w, /img/homepage/about/aksana-480.webp 480w, /img/homepage/about/aksana-640.webp 640w, /img/homepage/about/aksana-960.webp 960w';
	const webSrcSet =
		'/img/homepage/about/web-320.webp 320w, /img/homepage/about/web-480.webp 480w, /img/homepage/about/web-640.webp 640w, /img/homepage/about/web-960.webp 960w';
	return (
		<section
			id="about"
			className="pb-16 pt-6 cv-auto">
			<div className="container mx-auto text-dark">
				<div className="lg:w-1/2 md:w-2/3 w-full px-4 text-center mb-6 mx-auto">
					<h3 className="text-2xl my-3 lg:text-3xl font-bold uppercase">
						Tentang
					</h3>
					<hr />
				</div>
				<div className="w-full px-4 grid grid-cols-1 lg:grid-cols-2 gap-6 justify-center">
					<div className="h-fit shadow-lg rounded-md overflow-hidden">
						<img
							src="/img/homepage/about/aksana.webp"
							srcSet={aksanaSrcSet}
							sizes={imageSizesAttr}
							loading="lazy"
							decoding="async"
							width={480}
							height={270}
							alt="Aksana 29 MAN Kapuas"
							className="w-full"
						/>
						<div className="px-6 py-4 text-center">
							<h4 className="text-lg font-bold uppercase mb-2">
								Aksana 29
							</h4>
							<p className="text-base text-justify">
								AKSANA 29 adalah sebutan untuk para peserta
								didik kelas 12 angkatan ke-29 MAN Kapuas
							</p>
							<ul className="mt-3 text-left text-base">
								<li className="border-b-2 border-secondary/80 px-4 py-2">
									Ketua Angkatan :{' '}
									<span className="font-bold">
										Akhmad Rezky Utama
									</span>
								</li>
								<li className="px-4 py-2 text-center">
									Jumlah Peserta Didik
									<div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 mt-2 w-full">
										<div className="flex items-center justify-center sm:justify-start">
											<User
												className="mr-2"
												color="#0c4a6e"
											/>
											<span
												id="jumlah-pesdik-laki-laki"
												className="font-semibold"></span>
										</div>
										<div className="flex items-center justify-center">
											<Users
												className="mr-2"
												color="#171717"
											/>
											<span
												id="jumlah-semua-pesdik"
												className="font-semibold"></span>
										</div>
										<div className="flex items-center sm:justify-end justify-center">
											<User
												className="mr-2"
												color="#be185d"
											/>
											<span
												id="jumlah-pesdik-perempuan"
												className="font-semibold"></span>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div className="h-fit shadow-lg rounded-md mt-5 lg:mt-0 overflow-hidden">
						<img
							src="/img/homepage/about/web.webp"
							alt="Aksana 29 MAN Kapuas"
							srcSet={webSrcSet}
							sizes={imageSizesAttr}
							loading="lazy"
							decoding="async"
							width={480}
							height={270}
							className="w-full"
						/>
						<div className="px-6 py-4 text-center">
							<h4 className="text-lg font-bold uppercase mb-2">
								Website Buku Angkatan
							</h4>
							<p className="text-base text-justify">
								Website Aksana 29 merupakan website yang
								dijadikan tempat bagaimana Angkatan 29 MAN
								Kapuas bercerita, bernostalgia, dan bertukar
								informasi satu sama lain nya dalam rangka
								mempererat tali ukhuwah silaturahmi antar sesama
								alumni MAN Kapuas tahun ajaran 2023/2024. <br />
								<br />
								Website ini juga menjadi bukti kemajuan
								tekonlogi yang menggantikan buku angkatan
								(fisik) yang sekarang bisa diakses dengan
								mudahnya secara digital (online)
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
