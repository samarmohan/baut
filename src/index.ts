import Client from './structures/Client';
import { token, clientOptions } from './config';

new Client(clientOptions)
	.login(token)
	.catch(console.error);