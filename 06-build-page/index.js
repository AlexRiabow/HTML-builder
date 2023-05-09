const fs = require("fs");
const fsProm = require("fs/promises");
const path = require("path");

async function folderCreate(){
    const folderUrl = path.join(__dirname,"project-dist");
    const directory = await fsProm.mkdir(folderUrl,{recursive:true});
}
async function indexBuild(){
    let tagsArr = [];
    const tempUrl = path.join(__dirname,"template.html");
    let template = await (await fsProm.open(tempUrl)).readFile({encoding:"utf-8"});
    tagsArr = template.match(/{{[a-z]\w+}}/gi);
    for await(const tag of tagsArr){
        const tagUrl = path.join(__dirname,"components",`${tag.slice(2,-2)}.html`);
        const tagReplacer = await (await fsProm.open(tagUrl)).readFile({encoding:"utf-8"});
        template = template.replace(tag,tagReplacer);
    }
    const indexUrl = path.join(__dirname,"project-dist","index.html");
    const stream = fs.createWriteStream(indexUrl);
    stream.write(template);
    stream.end("");
}
async function styleMerge(){
    const url = path.join(__dirname,"styles");
    const urlBundle = path.join(__dirname,"project-dist","style.css")
    const combine = fs.createWriteStream(urlBundle);
    const styles = await fsProm.readdir(url,{withFileTypes:true});
    for (const style of styles){
        if (style.isFile() && (style.name).split(".")[1] === "css") {
            const url = path.join(__dirname,"styles",style.name);
            const read = fs.createReadStream(url,{encoding:"utf-8"});
            read.pipe(combine);
        }
        else continue
    }
}
async function dirCopy() {
    try{ 
     const copyUrl = path.join(__dirname,"project-dist","assets");
     const directory = await fsProm.mkdir(copyUrl,{recursive:true});
     const files = await fsProm.readdir(path.join(__dirname,"assets"),{withFileTypes:true});
     for (const file of files){
        const copyUrl = path.join(__dirname,"project-dist","assets",file.name);
        const copiedUrl = path.join(__dirname,"assets",file.name);
        const directory = await fsProm.mkdir(copyUrl,{recursive:true});
        const files = await fsProm.readdir(copiedUrl,{withFileTypes:true});
        for (const file of files){
            let dest = path.join(copyUrl,file.name);
            let src = path.join(copiedUrl,file.name)
            const copy = fsProm.copyFile(src,dest);
        }
     }
    }
    catch(error){
     console.error(error);
    }
 }

folderCreate();
indexBuild();
dirCopy();
styleMerge()
