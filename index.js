const errCh = ''; // اي دي القناة


async function sendErrorToChannel(error) {
    const channel = client.channels.cache.get(errCh);
    if (!channel) {
        console.error('الروم مش موجوده');
        return;
    }

  
    await channel.send({
        content: '**ايرور جديد في البوت**',
        embeds: [
            {
                title: 'ايرور',
                description: `\`\`\`${error.stack || error}\`\`\``,
                color: 0xFF0000, 
                timestamp: new Date(),
            },
        ],
    });
}


process.on('uncaughtException', async (error) => {
    console.error('Uncaught Exception:', error);

    
    await sendErrorToChannel(error);
});


process.on('unhandledRejection', async (error) => {
    console.error('Unhandled Rejection:', error);

    
    await sendErrorToChannel(error);
});


client.on('messageCreate', async (message) => {
    try {
        if (message.content === '!err') {
            
            throw new Error('ده مش خطا ده تجربه');
        }
    } catch (error) {
        console.error('حدث ايرور عند ارسال الرساله:', error);

        
        await sendErrorToChannel(error);
    }
});
