import express from 'express'
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();
const app = express(); 

const PORT = process.env.PORT || 4000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = app.listen(PORT , ()=>{
    console.log(`Server running on ${PORT}`)
})

app.use(express.static(path.join(__dirname , 'public')))
