import { User, Users } from 'react-feather';

export function Modal() {
	return (
		<div
			className=" bg-secondary/50 fixed z-50 top-0 right-0 flex overflow-hidden"
			aria-hidden="true">
			<div className="h-fit shadow-lg rounded-md overflow-hidden max-w-lg m-auto">
				<img
					src="/img/homepage/about/aksana.png"
					alt="Aksana 29 MAN Kapuas"
					className="w-full"
				/>
				<div className="px-6 py-4 text-center">
					<h4 className="text-lg font-bold uppercase mb-2">
						Aksana 29
					</h4>
					<p className="text-base text-justify">
						AKSANA 29 adalah sebutan untuk para peserta didik kelas
						12 angkatan ke-29 MAN Kapuas
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
		</div>
	);
}
