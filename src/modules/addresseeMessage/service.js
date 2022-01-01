'use strict';

exports.addreesseeMessage = {
    createAddreesseeMessage: async (request, addresseeIds = [], messageId) => {
        const recordsList = addresseeIds.map(id => {
            return { messageId: messageId, addresseeId: id}
        });
        const result = await request.insert(recordsList)
            .returning('*')
            .from("addressee_message");
        return result;
    }
}
