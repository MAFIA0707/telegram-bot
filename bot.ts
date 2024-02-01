import { Bot, Context, InlineKeyboard, Keyboard, session, SessionFlavor } from 'grammy'
import { freeStorage } from '@grammyjs/storage-free'
import { MyContext, sessionSetup } from './session/session'
import { conversations, createConversation } from '@grammyjs/conversations/out/conversation'
import { greetingConversation } from './conversation/conversation'
import { instaRequest } from './axios/instagram'
import dotenv from 'dotenv'

dotenv.config()
const token = process.env.TOKEN as string

const bot = new Bot<MyContext>(token)    
bot.use(sessionSetup(token))

bot.use(conversations())
bot.use(createConversation(greetingConversation))

setCommands()
async function setCommands() {
    await bot.api.setMyCommands([
        {
            command:'start',
            description: 'start bot'
        },
        {
            command:'help',
            description: 'To get a help click this',
        },
        {
            command:'location',
            description: 'To location a help click this'
        }
    ])
}



bot.command('start', async (ctx) => {
    const keyboard = new Keyboard()
    .text("Добро пожаловать").row()
    
    .resized();
    
    await ctx.reply(`Привет`,
    {reply_markup: keyboard})
    // ${ctx.from?.first_name} ${ctx.from?.last_name}, 
    // await ctx.conversation.enter("greetingConversation")  
})

bot.hears("Добро пожаловать", (ctx) => {
    const keyboard = new Keyboard()
    .webApp("Instagram", 'https://instagram.com')
    .webApp("YouTobe", 'https://youtube.com').row()
    .resized()
    ctx.reply(`Добро пожаловать ${ctx.from?.first_name} ${ctx.from?.last_name}`, {reply_markup: keyboard})
})

bot.on('message::url', async (ctx) => {
    const url = ctx.message.text;

    const instaData = await instaRequest(url)

    await ctx.replyWithVideo(instaData[0].url, {
        caption: `${instaData[0].title}\n\n@pulat_lesson_bot`,
    })    
})



// bot.on('message', async (ctx) => {
//     ctx.reply('hello men'),
//     // ctx.session.firstName = "pi"
//     console.log(ctx.session.firstName);
// })  


bot.command('location', (ctx) => {
    ctx.api.sendLocation(ctx.chat.id, 41.56010457491055, 60.60765991609149)

})
// bot.on('message', (ctx) => ctx.reply('got another message!'))

bot.on(":location", ctx => {
    console.log(ctx.message?.location);
})

bot.start(
    {
        onStart(botInfo) {
            console.log(`${botInfo.first_name} is started`);
            
        }
    }
    
    // bot.command('start', (ctx) => {
    //     console.log(ctx.from);
        
    //     ctx.reply(`Привет ${ctx.from?.first_name} ${ctx.from?.last_name}`)
    // })
    
                    
                    
    // bot.on('message', async (ctx) => {
        //     const chatId = ctx.from.id
        //     await bot.api.sendMessage(chatId, '__||*_Привет_*||__',{
    //     parse_mode: 'MarkdownV2'
    //     })
    
    //     await bot.api.sendMessage(chatId)
    // })
    
    
    
    
    // bot.on("message", async (ctx) => {
    //     console.log(ctx.from);
    //     let userId = ctx.from.id
    //     await bot.api.sendMessage(userId, 'Hello man!')
        
    // })
    
    
    
    // bot.hears('ping', (ctx) => {
    //     ctx.reply('pong')
    // })
    
    
    
    // bot.on("message", (ctx) => {
    //     console.log('Привет')
        
    // })
    




    // bot.on("message", (ctx) => {
    //     console.log(ctx.message);
    //     console.log(ctx.from);
        
        
    // })
    
)