export type User = {
	id: string;
	email: string;
	role: 'ADMIN' | 'USER';
	createdAt: string;
	updatedAt: string;
};
