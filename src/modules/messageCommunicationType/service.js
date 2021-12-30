'use strict';

exports.messageCommunicationType = {
    createMessageCommType: async (request, messageId, communicationTypeId) => {
        try {
            const result = await request.database.insert({
                messageId: parseInt(messageId), 
                communicationTypeId: parseInt(communicationTypeId),
            })
            .returning('*')
            .from("message_communication_type");
        return result;
        } catch (error) {
            console.log(error);
        }
    }
}
