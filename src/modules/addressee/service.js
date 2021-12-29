'use strict';

exports.addresseeService = {
    getAllAddresssees: async (request, reply) => {
        try {
            const result = await request.database.select("*").where({ isValid: true }).from("addressee");
            console.log(result);
            return reply.response({ content: result})
        } catch (error) {
            console.log(error);
            return reply.response({ error: "some error has ocurrured." })
        }
    },
    createNewAddressee: async (request, addressee, reply) => {
        try {
            const result = await request.database.insert({ 
                name: addressee.name,
                lastName: addressee.lastName,
                email: addressee.email,
                phoneNumber: addressee.phoneNumber,
                pushUserId: addressee.pushUserId,
                created_at: new Date(),
            }).from("addressee");
            return reply.response({ content: "addressee created!" });
        } catch (error) {
            return reply.response({ error: "some error occurured." });
        }
    }
}
