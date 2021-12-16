import { EventFunction } from '../types';

export default class {
	public name: string;
	public once?: boolean;

	constructor (
		private options: { name: string, once?: boolean },
		public execute: EventFunction
	) {
		this.name = options.name;
		this.once = options.once;
	}
}