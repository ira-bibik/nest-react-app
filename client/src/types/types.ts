export interface IUser {
	id: number;
	email: string;
	token: string;
}

export interface IUserData {
	email: string;
	password: string;
}

export interface IResponseUser {
	email: string | undefined;
	password: string | undefined;
	createdAt: string | undefined;
	updatedAt: string | undefined;
	id: number;
}

export interface IResponseUserData {
	token: string;
	user: IResponseUser;
}

export interface ICategory {
	title: string;
	id: number;
	createdAt: string | undefined;
	updatedAt: string | undefined;
	transaction?: [];
}

export interface ITransaction {
	amount: number;
	createAt: string;
	id: number;
	title: string;
	type: string;
	updateAt: string;
	category: ICategory;
}

export interface IResponseTransactioLoader {
	categories: ICategory[];
	transactions: ITransaction[];
	totalExpense: number;
	totalIncome: number;
}
