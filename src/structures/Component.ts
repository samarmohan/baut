import { ComponentFunction } from '../types';

export default class {
	constructor(
		public id: string,
		public update: boolean = false,
		public run: ComponentFunction,
		public ephermal: boolean = true
	) {}
}
