'use strict';

exports.messageService = {
    createNewMessage: async (request, newMessage, reply) => {
        try {
            const result = await request.database.insert({ 
                text: newMessage.text,
                timeToSend: newMessage.timeToSend,
            })
            .returning('id')
            .from("message");
            return result;
        } catch (error) {
            return reply.response({ error: "some error occurured." });
        }
    },
    consultingMessage: async (request, messageId, reply) => {
        try {
            const result = await request.database.select("messageId", "text", "timeToSend", "status", "description as messageType")
                .where({ messageId: parseInt(messageId) })
                .from("message_communication_type")
                .innerJoin("message", "message.id", parseInt(messageId))
                .innerJoin("communication_type", "communication_type.id", "message_communication_type.communicationTypeId")
        
            const [ firstResult = {} ] = result;

            return firstResult;
        } catch (error) {
            return reply.response({ error: "some error occurured." });
        }
    }
}
