'use strict';

const service = require("./service");
const messageCommService = require("../messageCommunicationType/service");
const addresseMessageService = require("../addresseeMessage/service");

exports.createMessage = {
    description: "Create a new message",
    handler: async (request, reply) => {
        console.log(request.payload);
        const newMessage = {
            text: request.payload.text,
            timeToSend: request.payload.timeToSend,
        };

        const messageResult = await service.messageService.createNewMessage(request, newMessage, reply);
      
        if (messageResult.length) {

            if (request.payload.addresseeIds) {
                const addresseMessageResult = addresseMessageService.addreesseeMessage.createAddreesseeMessage(request, request.payload.addresseeIds, messageResult[0]);
                console.log(addresseMessageResult);
            }

            const commServiceResult = await messageCommService.messageCommunicationType.createMessageCommType(request, messageResult[0], request.payload.communicationTypeId);
            if (commServiceResult.length) {
                return reply.response({ content: "message created!" });
            }
        }
    }
}

exports.consultingMessage = {
    description: "Consulting message status.",
    handler: async (request, reply) => {
        console.log("consulting message here: ", request.params.messageId);

        const messageConsult = await service.messageService.consultingMessage(request, request.params.messageId, reply);
        return reply.response({ content: messageConsult });
    }
}
