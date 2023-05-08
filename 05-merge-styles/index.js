const fs = require("fs");
const fsProm = require("fs/promises");
const path = require("path");

async function styleMerge(){
    const url = path.join(__dirname,".\\styles");
    const urlBundle = path.join(__dirname,".\\project-dist",".\\bundle.css")
    const combine = fs.createWriteStream(urlBundle);
    const styles = await fsProm.readdir(url,{withFileTypes:true});
    for (const style of styles){
        if (style.isFile() && (style.name).split(".")[1] === "css") {
            const url = path.join(__dirname,".\\styles",style.name);
            const read = fs.createReadStream(url,{encoding:"utf-8"});
            read.pipe(combine);
        }
        else continue
    }
}
styleMerge()