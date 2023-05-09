const fs = require("fs");
const fsProm = require("fs/promises");
const path = require("path");

async function readFiles(){
    try{
        const files = await fsProm.readdir(path.join(__dirname,"secret-folder"),{withFileTypes:true});
        for (const file of files){
            if (file.isDirectory()) continue
            else {
                let size = await fsProm.stat(path.join(__dirname, "secret-folder", file.name));
                console.log(`${(file.name).split(".")[0]} - ${(file.name).split(".")[1]} - ${Math.floor(size.size/1024)}kb`);
            }
        }
    }
    catch(error){
        console.error(error);
    }
}
readFiles();
