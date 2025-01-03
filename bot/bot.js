const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
const { ChatOpenAI } = require("@langchain/openai");
const { HumanMessage, SystemMessage } = require("@langchain/core/messages");
const ComedyMicExtension = require('./comedy-mic');

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const comedyMic = new ComedyMicExtension(client, process.env.OPENAI_API_KEY);

// Register comedy mic commands
const commands = comedyMic.registerCommands();
client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    await client.application?.commands.set(commands);
});

// Handle slash commands
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    switch (interaction.commandName) {
        case 'startset':
            await comedyMic.startSet(interaction);
            break;
        case 'joke':
            await comedyMic.processJoke(interaction);
            break;
        case 'endset':
            await comedyMic.endSet(interaction);
            break;
    }
});

const chatModel = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: 'gpt-4',
  temperature: 1,
  maxTokens: 50, // Limit response length
});

// Define fixed responses for example questions
const FIXED_RESPONSES = {
  
};

const PLAYFUL_PROMPT = `You are a savage, sarcastic roast bot. STRICT RULES:
- Maximum 1 sentence response
- Brutally witty
- No filters
- Pure savage energy
- Destroy their ego instantly
- Make it sharp, short, and hilarious`;

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  
  try {
    message.channel.sendTyping();
    
    // Check if the message matches any of the fixed responses
    const normalizedMessage = message.content.toLowerCase().trim();
    if (FIXED_RESPONSES.hasOwnProperty(normalizedMessage)) {
      await message.reply(FIXED_RESPONSES[normalizedMessage]);
      return;
    }
    
    // If no fixed response matches, use AI
    const response = await chatModel.invoke([
      new SystemMessage(PLAYFUL_PROMPT),
      new HumanMessage(message.content)
    ]);
    
    // Ensure the response is truly savage and one-line
    const savageResponse = response.content.split('.')[0].trim();
    await message.reply(savageResponse);
  } catch (error) {
    console.error('Error:', error);
    await message.reply("Even my wit buffer is overloaded by this conversation!");
  }
});

client.login(process.env.DISCORD_TOKEN);