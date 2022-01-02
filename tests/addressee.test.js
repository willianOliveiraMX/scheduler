'use strict';

const Lab = require("@hapi/lab");
const { expect } = require("@hapi/code");
const faker = require('faker');
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init } = require("../src/server");

describe("GET /", () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it("responds with 200", async () => {
        const res = await server.inject({
            method: "get",
            url: "/list/addressee/?page=1"
        });
        expect(res.statusCode).to.equal(200);
    });

    it("content is array of addressees", async () => {
        const res = await server.inject({
            method: "get",
            url: "/list/addressee/?page=1"
        });
        expect(res.result.content).to.be.an.array();
    });

    it("responds with 400", async () => {
        const res = await server.inject({
            method: "get",
            url: "/list/addressee/?page=string"
        });
        expect(res.statusCode).to.equal(400);
        expect(res.result.error).to.equal("Bad Request")
    });
});

describe("POST /", () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it("create a new addressee", async () => {
        const randomName = faker.name.firstName();
        const randomLastName = faker.name.lastName();
        const randomEmail = faker.internet.email();
        const randomPhoneNumber = faker.phone.phoneNumber('###########');
        const randomAlphanumeric = faker.random.alphaNumeric(8);

        const payloadBody = {
            "name": randomName,
            "lastName": randomLastName,
            "email": randomEmail,
            "phoneNumber": randomPhoneNumber,
            "pushUserId": randomAlphanumeric
        }

        const res = await server.inject({
            method: "post",
            url: "/create/addressee",
            payload: payloadBody,
        });

        const { message = "", content = [] } = res.result;
        const [ firstContent ] = content;

        expect(res.statusCode).to.equal(200);
        expect(message).to.equal("Addressee success created!");
        expect(firstContent).to.be.an.object();
        expect(firstContent).to.part.include({ 
            name: randomName,
            lastName: randomLastName,
            email: randomEmail,
            phoneNumber: randomPhoneNumber,
            pushUserId: randomAlphanumeric,
            isValid: true,
        });

    });

    it("try to create a new addressee with a incorrect email" , async () => {
        const randomName = faker.name.firstName();
        const randomLastName = faker.name.lastName();
        const randomEmail = "mary.teste.com";
        const randomPhoneNumber = faker.phone.phoneNumber('###########');
        const randomAlphanumeric = faker.random.alphaNumeric(8);

        const payloadBody = {
            "name": randomName,
            "lastName": randomLastName,
            "email": randomEmail,
            "phoneNumber": randomPhoneNumber,
            "pushUserId": randomAlphanumeric
        }

        const res = await server.inject({
            method: "post",
            url: "/create/addressee",
            payload: payloadBody,
        });

        expect(res.statusCode).to.equal(400);
        expect(res.result.error).to.equal("Bad Request");
    });

    it("try to create a new addressee with a incorrect phoneNumber" , async () => {
        const randomName = faker.name.firstName();
        const randomLastName = faker.name.lastName();
        const randomEmail = faker.internet.email();
        const randomPhoneNumber = faker.phone.phoneNumber('2055###########');
        const randomAlphanumeric = faker.random.alphaNumeric(8);

        const payloadBody = {
            "name": randomName,
            "lastName": randomLastName,
            "email": randomEmail,
            "phoneNumber": randomPhoneNumber,
            "pushUserId": randomAlphanumeric
        }

        const res = await server.inject({
            method: "post",
            url: "/create/addressee",
            payload: payloadBody,
        });

        expect(res.statusCode).to.equal(400);
        expect(res.result.error).to.equal("Bad Request");
    });

});

