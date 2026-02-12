import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './routes/error.jsx';

const router = createBrowserRouter([
	{
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				lazy: async () => {
					const module = await import('./routes/index.jsx');
					return { Component: module.App };
				},
			},
			{
				path: '/guru',
				lazy: async () => {
					const module = await import('./routes/teachers.jsx');
					return {
						Component: module.default,
						loader: module.loader,
					};
				},
			},
			{
				path: '/pesdik/:kelas',
				lazy: async () => {
					const module = await import('./routes/students.jsx');
					return {
						Component: module.Students,
						loader: module.loader,
					};
				},
			},
			{
				path: '/galeri',
				lazy: async () => {
					const module = await import('./routes/gallery.jsx');
					return { Component: module.default };
				},
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
