import { memberRemoveLogging } from '../../functions/memberAddRemoveLogging';
import Event from '../../structures/Event';

export default new Event(
	{
		name: 'guildMemberRemove',
	},
	async (_, member) => {
		console.log(`[User Leave] ${member.user.tag}`);

		try {
			memberRemoveLogging(member);
		} catch (e) {
			console.error(e);
		}
	}
);
