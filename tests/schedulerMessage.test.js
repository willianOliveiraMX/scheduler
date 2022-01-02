'use strict';

const Lab = require("@hapi/lab");
const { expect } = require("@hapi/code");
const faker = require('faker');
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init } = require("../src/server");

let currentMessageId = "";

describe("POST /", () => {
    let server;
    const addresseeListIds = [];


    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it("create a new scheduler message", async () => {
        const addresseeRes = await server.inject({
            method: "get",
            url: "/list/addressee/?page=1"
        });

        const { content = [] } = addresseeRes.result;
        content.forEach(element => {
            addresseeListIds.push(element.id);
        });
        const rasndomText = faker.lorem.words(14);
        const timeToSend = faker.date.future();

        const payloadBody = {
            "text": rasndomText,
            "timeToSend": timeToSend,
            "addresseeIds": addresseeListIds,
            "communicationTypeId": 1
        }

        const schedulerMessageRes = await server.inject({
            method: "post",
            url: "/create/schedulerMessage",
            payload: payloadBody,
        });

        const { content: schedulerMessageResContent  = {} } = schedulerMessageRes.result;
        currentMessageId = schedulerMessageResContent.id;

        expect(schedulerMessageRes.statusCode).to.equal(200);
        expect(schedulerMessageResContent).to.be.an.object();
        expect(schedulerMessageResContent).to.part.include({ 
            text: rasndomText,
            timeToSend: timeToSend,
            status: "waiting"
        });
    });

    it("try to create a new scheduler message with more then max value", async () => {
        const rasndomText = faker.lorem.words(250);
        const timeToSend = faker.date.future();

        const payloadBody = {
            "text": rasndomText,
            "timeToSend": timeToSend,
            "addresseeIds": addresseeListIds,
            "communicationTypeId": 1
        }

        const schedulerMessageRes = await server.inject({
            method: "post",
            url: "/create/schedulerMessage",
            payload: payloadBody,
        });

        const { error } = schedulerMessageRes.result;

        expect(schedulerMessageRes.statusCode).to.equal(400);
        expect(error).to.equal("Bad Request");
    });

    it("try to create a new scheduler message with any invalid timeToSend value", async () => {
        const rasndomText = faker.lorem.words(250);
        const timeToSend = faker.date.past();

        const payloadBody = {
            "text": rasndomText,
            "timeToSend": timeToSend,
            "addresseeIds": addresseeListIds,
            "communicationTypeId": 1
        }

        const schedulerMessageRes = await server.inject({
            method: "post",
            url: "/create/schedulerMessage",
            payload: payloadBody,
        });

        const { error } = schedulerMessageRes.result;
        expect(schedulerMessageRes.statusCode).to.equal(400);
        expect(error).to.equal("Bad Request");
    });

    it("try to create a new scheduler message with any invalid timeToSend value", async () => {
        const rasndomText = faker.lorem.words(250);
        const timeToSend = faker.date.past();

        const payloadBody = {
            "text": rasndomText,
            "timeToSend": timeToSend,
            "addresseeIds": addresseeListIds,
            "communicationTypeId": 1
        }

        const schedulerMessageRes = await server.inject({
            method: "post",
            url: "/create/schedulerMessage",
            payload: payloadBody,
        });

        const { error } = schedulerMessageRes.result;
        expect(schedulerMessageRes.statusCode).to.equal(400);
        expect(error).to.equal("Bad Request");
    });

    it("try to create a new scheduler message with any invalid list of addressees", async () => {
        const rasndomText = faker.lorem.words(250);
        const timeToSend = faker.date.future();

        const invalidListOfAddrressee = [1, 2, 3, 4, 5].map(el => {
            return faker.datatype.number()
        });

        const payloadBody = {
            "text": rasndomText,
            "timeToSend": timeToSend,
            "addresseeIds": invalidListOfAddrressee,
            "communicationTypeId": 1
        }

        const schedulerMessageRes = await server.inject({
            method: "post",
            url: "/create/schedulerMessage",
            payload: payloadBody,
        });

        const { error } = schedulerMessageRes.result;
        expect(schedulerMessageRes.statusCode).to.equal(400);
        expect(error).to.equal("Bad Request");
    });

    it("try to create a new scheduler message with any invalid communicationTypeId", async () => {
        const rasndomText = faker.lorem.words(250);
        const timeToSend = faker.date.future();

        const payloadBody = {
            "text": rasndomText,
            "timeToSend": timeToSend,
            "addresseeIds": addresseeListIds,
            "communicationTypeId": "x"
        }

        const schedulerMessageRes = await server.inject({
            method: "post",
            url: "/create/schedulerMessage",
            payload: payloadBody,
        });

        const { error } = schedulerMessageRes.result;
        expect(schedulerMessageRes.statusCode).to.equal(400);
        expect(error).to.equal("Bad Request");
    });
});

describe("PUT /", () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it("try to canceling a message", async () => {
        const res = await server.inject({
            method: "put",
            url: "/cancel/schedulerMessage", 
            payload: {
                messageId: currentMessageId
            }
        });

        const { content = [] } = res.result;
        const [ firstContent ] = content;

        expect(res.statusCode).to.equal(200);
        expect(firstContent).to.be.an.object();
        expect(firstContent).to.include([ "id", "text", "timeToSend", "status" ]);
    });

    it("try to cancel a message without a message id", async () => {
        const res = await server.inject({
            method: "put",
            url: "/cancel/schedulerMessage", 
            payload: {}
        });

        expect(res.statusCode).to.equal(400);
    });

    it("try to cancel a message with a invalid message id", async () => {
        const res = await server.inject({
            method: "put",
            url: "/cancel/schedulerMessage", 
            payload: {
                messageId: "teste"
            }
        });

        expect(res.statusCode).to.equal(400);
    });
});

describe("GET /", () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it("get a sheculer id", async () => {
        const res = await server.inject({
            method: "get",
            url: `/consulting/schedulerMessage/${currentMessageId}`
        });
       
        expect(res.statusCode).to.equal(200);
        expect(res.result.content.messageId).to.equal(currentMessageId);
    });

    it("try to get a scheduler message with a invalid id", async () => {
        const res = await server.inject({
            method: "get",
            url: "/consulting/schedulerMessage/teste"
        });

        expect(res.statusCode).to.equal(400);
    }); 
});