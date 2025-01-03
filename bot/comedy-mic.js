// comedy-mic.js
const { Client, GatewayIntentBits } = require('discord.js');
const { ChatOpenAI } = require("@langchain/openai");
const { HumanMessage, SystemMessage } = require("@langchain/core/messages");

class ComedyMicExtension {
    constructor(client, openAIApiKey) {
        this.client = client;
        this.chatModel = new ChatOpenAI({
            openAIApiKey: openAIApiKey,
            modelName: 'gpt-4',
            temperature: 1,
        });
        
        // Track active performances
        this.activePerformances = new Map();
    }

    // Comedy club system prompt that maintains the savage style
    get COMEDY_PROMPT() {
        return `You are a savage comedy club host and heckler with the following traits:
- You maintain a brutal yet entertaining presence
- Your responses are short, witty, and cutting
- You stay in character as a comedy club host/heckler
- You provide brief but insightful feedback on performances
Current setting: You're hosting an open mic night at the Savage Comedy Club.`;
    }

    // Start a comedy set
    async startSet(interaction) {
        if (this.activePerformances.has(interaction.channelId)) {
            return interaction.reply("There's already someone bombing on stage. Wait your turn!");
        }

        const performance = {
            comedian: interaction.user.id,
            startTime: Date.now(),
            jokes: [],
            heckles: [],
            feedback: null
        };

        this.activePerformances.set(interaction.channelId, performance);
        
        const response = await this.chatModel.invoke([
            new SystemMessage(this.COMEDY_PROMPT),
            new HumanMessage("Introduce the next comedian in a savage way")
        ]);

        return interaction.reply(`🎤 ${response.content}`);
    }

    // Process a joke during the set
    async processJoke(interaction) {
        const performance = this.activePerformances.get(interaction.channelId);
        if (!performance || performance.comedian !== interaction.user.id) {
            return interaction.reply("You're not the one on stage, heckle them instead!");
        }

        const joke = interaction.options.getString('joke');
        performance.jokes.push(joke);

        // Generate a savage response/heckle
        const response = await this.chatModel.invoke([
            new SystemMessage(this.COMEDY_PROMPT),
            new HumanMessage(`Comedian's joke: "${joke}"\nRespond with a brutal heckle or savage commentary`)
        ]);

        performance.heckles.push(response.content);
        return interaction.reply(response.content);
    }

    // End the comedy set with feedback
    async endSet(interaction) {
        const performance = this.activePerformances.get(interaction.channelId);
        if (!performance || performance.comedian !== interaction.user.id) {
            return interaction.reply("You can't end a set you never started!");
        }

        const duration = (Date.now() - performance.startTime) / 1000 / 60;
        
        // Generate savage yet constructive feedback
        const feedback = await this.chatModel.invoke([
            new SystemMessage(this.COMEDY_PROMPT),
            new HumanMessage(`The comedian just finished their ${duration.toFixed(1)} minute set. 
                Jokes performed: ${performance.jokes.join(' | ')}
                Provide a brutal but slightly constructive wrap-up of their performance.`)
        ]);

        this.activePerformances.delete(interaction.channelId);
        
        return interaction.reply(`🎭 ${feedback.content}`);
    }

    // Register slash commands
    registerCommands() {
        return [
            {
                name: 'startset',
                description: 'Start your comedy set',
            },
            {
                name: 'joke',
                description: 'Tell a joke during your set',
                options: [{
                    name: 'joke',
                    type: 3, // STRING
                    description: 'Your joke/bit',
                    required: true
                }]
            },
            {
                name: 'endset',
                description: 'End your comedy set and get feedback',
            }
        ];
    }
}

module.exports = ComedyMicExtension;