import { Authority } from './authority';
export class Usuario {
	email: string;
	username: string;
	password: string;
	passwordrp: string;
	tempPassword: string;
	accountLocked: boolean;
	enabled: boolean;
	authorities: Authority[];
}
