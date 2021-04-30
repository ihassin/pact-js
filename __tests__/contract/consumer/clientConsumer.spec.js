"use strict"

const { getClients } = require("../../../src/consumer")

describe("Consumer tests", () => {
   const GET_EXPECTED_BODY = [
       {
           "firstName": "Lisa",
           "lastName": "Simpson",
           "age": 8
       },
       {
           "firstName": "Wonder",
           "lastName": "Woman",
           "age": 30
       },
       {
           "firstName": "Homer",
           "lastName": "Simpson",
           "age": 39
       }
   ]

    afterEach((() => provider.verify()))

    describe("GET Clients", () => {
        beforeEach(() => {
            const interaction = {
                state: "I have a list of clients",
                uponReceiving: "a request to get all clients",
                withRequest: {
                    method: "GET",
                    path: "/clients",
                    headers: {
                        Accept: "application/json, text/plain, */*"
                    }
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    body: GET_EXPECTED_BODY,
                },
            }
            return provider.addInteraction(interaction)
        })
        test("returns correct body, header, and status code", async () => {
            const response = await getClients()
            expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
            expect(response.data).toEqual(GET_EXPECTED_BODY)
            expect(response.status).toEqual(200)
        })

    })
})
