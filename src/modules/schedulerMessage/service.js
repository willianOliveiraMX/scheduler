'use strict';

const { errors } = require("../../helpers/messageErrors");

exports.messageService = {
    createNewMessage: async (request, newMessage, reply) => {
        const result = await request.insert({ 
            text: newMessage.text,
            timeToSend: newMessage.timeToSend,
        })
        .returning('*')
        .from("message");
        return result;
    },
    consultingMessage: async (request, messageId, reply) => {
        try {
            const result = await request.database.select("messageId", "text", "timeToSend", "status", "description as messageType")
                .where({ messageId: parseInt(messageId) })
                .from("message_communication_type")
                .innerJoin("message", "message.id", parseInt(messageId))
                .innerJoin("communication_type", "communication_type.id", "message_communication_type.communicationTypeId")

            const addresseeRelatedList = await request.database.select("*")
                .where({ messageId: parseInt(messageId)})
                .from("addressee_message")
                .innerJoin("addressee", "addressee.id", "addressee_message.addresseeId")
        
            const [ firstResult = {} ] = result;
            return { ...firstResult, addressees: addresseeRelatedList};
        } catch (error) {
            return reply.response({ error: errors.generalServerError }.code(500));
        }
    }, 
    cancelMessage: async (request, messageId, reply) => {
        try {
            const result = request.database.update({ status: "canceled" })
            .where({ id:  parseInt(messageId)})
            .returning("*")
            .from("message")

            return result;
        } catch (error) {
            return reply.response({ error: errors.generalServerError });
        }
    }
}
