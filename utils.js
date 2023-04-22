const readline = require("readline");
module.exports = { 
    errorHandler({code, message}) {
        return new Error(`An error occurred during execution.\nSTATUS: ${code}\n\nError Message:\n${message}`);
    }

    
}