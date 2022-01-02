'use strict'; 

exports.messageCommunicationType = {
    createMessageCommType: async (request, messageId, communicationTypeId) => {
            const result = await request.insert({
                messageId: parseInt(messageId), 
                communicationTypeId: parseInt(communicationTypeId),
            })
            .returning('*')
            .from("message_communication_type");
        return result;
    }
}
