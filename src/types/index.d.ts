import { ChatInputApplicationCommandData, CommandInteraction, ApplicationCommandPermissionData, MessageComponentInteraction } from 'discord.js';
import Client from '~/structures/Client';

export interface CommandOptions extends ChatInputApplicationCommandData {
	permissions?: ApplicationCommandPermissionData[];
}
  
export type CommandFunction = (client?: Client, interaction: CommandInteraction) => void | Promise<void>

export type EventFunction = (client?: Client, ...args) => void | Promise<void>

export type ComponentFunction = (client?: Client, interaction: MessageComponentInteraction) => void | Promise<void>