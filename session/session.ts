import { freeStorage } from "@grammyjs/storage-free"
import { Context, session, SessionFlavor } from "grammy"
import { ConversationFlavor} from "@grammyjs/conversations"

export interface SessionData {
    firstName: string
}


export type MyContext =  Context & SessionFlavor<SessionData> & ConversationFlavor

  
export const sessionSetup = (token: string) => {
    return session({
        initial: () => ({
            firstName: 'Pulat'
        }),
        storage: freeStorage<SessionData>(token),
    })
}