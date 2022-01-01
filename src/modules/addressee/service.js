'use strict';

const { errors } = require("../../helpers/messageErrors");


exports.addresseeService = {
    getAllAddresssees: async (request, reply) => {
        try {
            const pageNumber = request.query.page ? parseInt(request.query.page) : 1;

            const limitPerPage = 10; 
            const offset = (pageNumber * limitPerPage) - limitPerPage;

            const result = await request.database.select("*").where({ isValid: true }).limit(10).offset(offset).from("addressee");
            return reply.response({ content: result})
        } catch (error) {
            return reply.response({ error: error.generalServerError }).code(500)
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
            })
            .returning('*')
            .from("addressee");
            return reply.response({ message: "Addressee success created!", content: result });
        } catch (error) {
            if (error.constraint === "addressee_email_unique") {
                return reply.response({
                    error: errors.emailAlreadyExist
                }).code(409);
            }
            if (error.constraint === "addressee_pushuserid_unique") {
                return reply.response({
                    error: errors.pushUserIdAlreadyExist
                }).code(409);
            }
            return reply.response({ error: error.generalServerError }).code(500);
        }
    }
}
