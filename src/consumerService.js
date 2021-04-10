const { server } = require("./consumer")

server.listen(8080, () => {
  console.log("Consumer running on http://localhost:8080")
})
