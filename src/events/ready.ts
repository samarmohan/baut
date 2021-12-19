import Event from '../structures/Event';

export default new Event({
	name: 'ready',
	once: true,
}, async (client) => {
	console.log(`[INFO] ${client.user.tag} is online!`);
});