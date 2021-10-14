const DocumentBuilder = require("../lib/DocumentBuilder");

const document = new DocumentBuilder()
    .title("Tested Swagger")
    .description("Description of my application")
    .version("1.0.1")
    .addServer("http://localhost:8080", "Test server")
    .addServer("http://localhost:3000")
    .addTag("Test", "Test Tag")
    .addTag("Test 2", "Test 2 Tag", { url: "http://google.com", description: "doc" })
    .addSecurity('Authorization', {
        type: 'http', 
        description: 'Authorization',
        scheme: 'bearer',
        bearerFormat: 'JWT'
    })
    .build();

console.log(JSON.stringify(document));