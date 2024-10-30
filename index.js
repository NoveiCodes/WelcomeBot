require('dotenv').config();
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Event listener for new guild members joining
client.on('guildMemberAdd', async (member) => {
  // Get the "Welcome" channel by its name or ID
  const welcomeChannel = member.guild.channels.cache.find(
    (channel) => channel.name === 'welcome');

  // Check if the welcome channel exists
  if (welcomeChannel) {
    try {
      // Send a personalized welcome message
      await welcomeChannel.send(
        `Welcome to the community, ${member.user}! 🎉\nWe’re excited to have you join us.\nTo get started, check out our Onboarding Document here: https://coding-bootcamps.notion.site/Test-Assignment-for-Automations-Specialist-4597030bc13943fe9c243460484d6c78 \nFeel free to ask any questions you may have. Let’s have fun! 😄`
      );
    } catch (error) {
      console.error('Error sending welcome message:', error);
    }
  } else {
    console.log('Welcome channel not found.');
  }
});

client.login(process.env.TOKEN);