import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);

	return (
		<div className="flex w-[100vw] h-[100vh]">
			<div className="m-auto text-center">
				<h1 className="text-5xl font-bold">Alamak!</h1>
				<p className="text-xl text-slate-500 my-3">
					Sepertinya ada yang salah!
				</p>
				<p className="text-base text-slate-500">
					{error.statusText || error.message}
				</p>
			</div>
		</div>
	);
}
