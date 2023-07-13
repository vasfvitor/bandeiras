import * as fs from 'fs';
import { db } from "~/supa";

fs.writeFile('C:/Users/Vit/Documents/GitHub/bandeiras/test.json', db, err => {
  if (err) {
    console.error(err);
  }