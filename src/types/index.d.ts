import { ChatInputApplicationCommandData, CommandInteraction, GuildApplicationCommandPermissionData } from 'discord.js';
import Client from '~/structures/Client';

export interface CommandOptions extends ChatInputApplicationCommandData {
	permissions?: GuildApplicationCommandPermissionData[];
}
  
export type CommandFunction = (client?: Client, interaction: CommandInteraction) => void | Promise<void>

export type EventFunction = (client?: Client, ...args) => void | Promise<void>