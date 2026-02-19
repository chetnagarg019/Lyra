import dotenv from "dotenv";
dotenv.config();
import {ImageKit} from '@imagekit/nodejs';


const ImagekitClient = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(file) {
    const result = await ImagekitClient.files.upload({
        file,
        fileName : "music_" + Date.now(),
        folder : "yt-complete-backend/music"
    })

    return result;
}

export default { uploadFile }

//jb me server.js me ek baar dotenv ko rkh deti hu to mujje dubara ku rkhni pdti hai ye chiz service file me na rkhu to mujje ye error milti hai 
// [nodemon] restarting due to changes...
// [nodemon] starting `node server.js`
// file:///C:/Users/in/Lyra/node_modules/@imagekit/nodejs/client.mjs:62
//             throw new Errors.ImageKitError("The IMAGEKIT_PRIVATE_KEY environment variable is missing or empty; either provide it, or instantiate the ImageKit client with an privateKey option, like new ImageKit({ privateKey: 'My Private Key' }).");
//                   ^

// ImageKitError: The IMAGEKIT_PRIVATE_KEY environment variable is missing or empty; either provide it, or instantiate the ImageKit client with an privateKey option, like new ImageKit({ privateKey: 'My Private Key' }).
//     at new ImageKit (file:///C:/Users/in/Lyra/node_modules/@imagekit/nodejs/client.mjs:62:19)
//     at file:///C:/Users/in/Lyra/services/storageServices.js:6:24
//     at ModuleJob.run (node:internal/modules/esm/module_job:343:25)
//     at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
//     at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:647:26)
//     at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)

// Node.js v22.18.0
// [nodemon] app crashed - waiting for file changes before starting...
