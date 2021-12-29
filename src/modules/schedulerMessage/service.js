'use strict';

exports.messageService = {
    // getAllAddresssees: async (request, reply) => {
    //     try {
    //         const result = await request.database.select("*").where({ isValid: true }).from("addressee");
    //         console.log(result);
    //         return reply.response({ content: result})
    //     } catch (error) {
    //         console.log(error);
    //         return reply.response({ error: "some error has ocurrured." })
    //     }
    // },
    createNewMessage: async (request, newMessage, reply) => {
        console.log(newMessage);
        try {
            const result = await request.database.insert({ 
                text: newMessage.text,
                timeToSend: newMessage.timeToSend,
            }).from("message");
            console.log(result);
            return reply.response({ content: "message created!" });
        } catch (error) {
            console.log(error);
            return reply.response({ error: "some error occurured." });
        }
    }
}
