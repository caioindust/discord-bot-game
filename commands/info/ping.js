module.exports = {
    name: "ping",
    description: "Returns latency and API ping",
    category: "info",
    run: async (client, message, _) => {
        const msg = await message.channel.send(`🏓 Pinging....`);

        msg.edit(`🏓 Pong!
        Latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms
        API Latency is ${Math.round(client.ping)}ms`);
    }
};
