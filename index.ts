import * as dotenv from 'dotenv';
dotenv.config();
import fbconfig from './src/database/firebaseconfig';
fbconfig();
import app from "./src/app";

var PORT = process.env.PORT || 3999;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
  
