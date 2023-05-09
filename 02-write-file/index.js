const fs = require("fs");
const path = require("path");
const readLine = require("readline");

const stream = fs.createWriteStream(path.join(__dirname,"text.txt"));
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

function addText() {    
    rl.question("Дополните новый файл текстом:",(answer) => {
        if (answer === "exit") {
            stream.end("");
            rl.close();
        }
        else{
            stream.write(answer + "\n");
            addText();
        }
    });
}
addText();

process.on("beforeExit",()=>{
    console.log("\nРедактирование файла завершено");
})