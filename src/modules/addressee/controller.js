'use strict';

const service = require("./service");

exports.createAddressee = {
    description: "Create a new addressee",
    handler: async (request, reply) => {
        const newAddressee = {
            name: request.payload.name,
            lastName: request.payload.lastName,
            email: request.payload.email,
            phoneNumber: request.payload.phoneNumber,
            pushUserId: request.payload.pushUserId
        };
        return await service.addresseeService.createNewAddressee(request, newAddressee, reply);
    }
}

exports.getAllAddressee = {
    description: "Get all addressee",
    handler: async (request, reply) => {
        return await service.addresseeService.getAllAddresssees(request, reply);
    }
}
