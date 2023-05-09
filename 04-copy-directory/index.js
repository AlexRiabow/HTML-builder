const fs = require ("fs");
const fsProm = require ("fs/promises");
const path = require ("path");

async function folderCopy() {
   try{ 
    const copyUrl = path.join(__dirname,"files-copy");
    const directory = await fsProm.mkdir(copyUrl,{recursive:true});
    const files = await fsProm.readdir(path.join(__dirname,"files"),{withFileTypes:true});
    for (const file of files){
        let dest = path.join(copyUrl,`${file.name}`);
        let src = path.join(__dirname,"files",`${file.name}`)
        const copy = fsProm.copyFile(src,dest);
    }
   }
   catch(error){
    console.error(error);
   }
}
folderCopy();