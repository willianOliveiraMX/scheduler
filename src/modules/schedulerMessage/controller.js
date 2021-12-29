'use strict';

const service = require("./service");

exports.createMessage = {
    description: "Create a new message",
    handler: async (request, reply) => {
        console.log(request.payload);
        const newMessage = {
            text: request.payload.text,
            timeToSend: request.payload.timeToSend,
        };
        return await service.messageService.createNewMessage(request, newMessage, reply);
    }
}

// exports.getAllAddressee = {
//     description: "Get all addressee",
//     handler: async (request, reply) => {
//         return await service.addresseeService.getAllAddresssees(request, reply);
//     }
// }
