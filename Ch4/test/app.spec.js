const sayHello = require("../app").sayHello;

if (sayHello) {
    console.log('sayHello should return "hello"');
    if (sayHello() === "hello") {
        console.log("Success");
    } else {
        console.log("Fail");
    }
}