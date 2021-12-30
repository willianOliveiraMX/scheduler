'use strict';

exports.addreesseeMessage = {
    createAddreesseeMessage: async (request, addresseeIds = [], messageId) => {
        const recordsList = addresseeIds.map(id => {
            return { messageId: messageId, addresseeId: id}
        });
        console.log("addreesse messages: ", recordsList);
        try {
            const result = await request.database.insert(recordsList)
            .returning('*')
            .from("addressee_message");
        return result;
        } catch (error) {
            console.log(error);
        }
    }
}
