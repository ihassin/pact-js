const path = require("path")
const { Verifier } = require("@pact-foundation/pact")
const { server, importData } = require("../../../src/provider")

const SERVER_URL = "http://localhost:8081"

server.listen(8081, ()=> {
    importData();
    console.log(`Service listening on ${SERVER_URL}`)
})

describe("Service verification", () => {
    it("validates the expectation of the client", () => {
        let opts = {
            provider: "Client service",
            logLevel: "DEBUG",
            providerBaseUrl: SERVER_URL,
            pactUrls: [path.resolve(process.cwd(), "./__tests__/contract/pacts/frontend-service.json")],
            consumerVersionTags: ["dev"],
            providerVersionTags: ["dev"],
            publishVerificationResult: false,
            providerVersion: "1.0.0"
        }
        return new Verifier(opts).verifyProvider().then(output => {
            console.log("Pact verification complete");
            console.log(output)
        })
    })
})
