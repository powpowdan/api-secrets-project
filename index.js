import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/random";
 

app.use(bodyParser.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public'))); 
// Set the view engine to ejs
app.set('view engine', 'ejs'); 

app.get("/", async (req, res) => { 

    try {
        const result = await axios.get(API_URL); 
        res.render("index.ejs", {secret: result.data.secret, user: result.data.username  }); 
      } catch (error) {
        res.render("index.ejs", {  });
      }
    });


    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
      