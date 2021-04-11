const path = require("path")
const { Verifier } = require("@pact-foundation/pact")
const { server, importData } = require("../../../src/provider")

const SERVER_URL = "http://localhost:8081"

server.listen(8081, ()=> {
    importData();
    console.log(`Service listening on ${SERVER_URL}`)
})

describe("Service verification", () => {
    it("Validates the expectation of the client", () => {
        let opts = {
            provider: "Service",
            logLevel: "DEBUG",
            providerBaseUrl: SERVER_URL,
            pactUrls: [path.resolve(process.cwd(), "./__tests__/contract/pacts/client-service.json")],
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
