import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDfw19suJIXq0fQM64R7P4Ag_8IaE_EH08',
	authDomain: 'aksana29-mankapuas.firebaseapp.com',
	projectId: 'aksana29-mankapuas',
	storageBucket: 'aksana29-mankapuas.appspot.com',
	messagingSenderId: '98427819667',
	appId: '1:98427819667:web:044173073b2bf3e2d55f66',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getStudents() {
	const querySnapshot = await getDocs(collection(db, 'students'));
	const data = querySnapshot.docs.map((doc) => {
		return {
			id: doc.id,
			...doc.data(),
		};
	});
	return data;
}

export async function getTeachers() {
	const querySnapshot = await getDocs(collection(db, 'teachers'));
	const data = querySnapshot.docs.map((doc) => {
		return {
			id: doc.id,
			...doc.data(),
		};
	});
	return data;
}
