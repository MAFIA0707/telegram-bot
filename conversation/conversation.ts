import { Conversation } from "@grammyjs/conversations";
import { MyContext } from "../session/session";

export type MyConversation = Conversation<MyContext>

export async function greetingConversation(
    conversation: MyConversation,
    ctx: MyContext
){
    await ctx.reply('Hello from conversation')
}