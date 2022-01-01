'use strict';

const service = require("./service");
const messageCommService = require("../messageCommunicationType/service");
const addresseMessageService = require("../addresseeMessage/service");
const { errors } = require("../../helpers/messageErrors");

const { schedulerSchema, cancelSchedulerSchema, consultingSchedulerSchema } = require("./schedulerSchema");

exports.createMessage = {
    description: "Create a new message.",
    validate: {
        payload: schedulerSchema
    },
    handler: async (request, reply) => {
        const newMessage = {
            text: request.payload.text,
            timeToSend: request.payload.timeToSend,
        };

        try {
            return await request.database.transaction(async trx => {
                const messageResult = await service.messageService.createNewMessage(trx, newMessage, reply);
                if (messageResult.length) {
                    await addresseMessageService.addreesseeMessage.createAddreesseeMessage(trx, request.payload.addresseeIds, messageResult[0].id);
           
                    await messageCommService.messageCommunicationType.createMessageCommType(trx, messageResult[0].id, request.payload.communicationTypeId, reply);
                    
                    return reply.response({ content: {...messageResult[0] } });
                }
                return reply.response({ content: messageResult });
            })
        } catch (error) {
            if (error.constraint === "addressee_message_addresseeid_foreign") {
                return reply.response({ error: errors.someOfaddresseeIdsIsFailed }).code(409);
            }
            if (error.constraint === "message_communication_type_communicationtypeid_foreign") {
                return reply.response({ error: errors.validCommunicationTypeId }).code(409);
            }
            return reply.response({ error: errors.generalServerError }).code(500);
        }
    }
}

exports.consultingMessage = {
    description: "Consulting message status.",
    validate: {
        params: consultingSchedulerSchema
    },
    handler: async (request, reply) => {
        const messageConsult = await service.messageService.consultingMessage(request, request.params.messageId, reply);
        console.log(request.params.messageId);
        if (!messageConsult.messageId) {
            return reply.response({ error: errors.contentNotFind }).code(404);
        }

        return reply.response({ content: messageConsult });
    }
}

exports.cancelMessage = {
    description: "Cancelling message.", 
    validate: {
        payload: cancelSchedulerSchema
    },
    handler: async (request, reply) => {
        const messageCancel = await service.messageService.cancelMessage(request, request.payload.messageId, reply);
        if (!messageCancel.length) {
            return reply.response({ error: errors.validMessageId }).code(404);
        }
        return reply.response({ content: messageCancel });
    }
} 
