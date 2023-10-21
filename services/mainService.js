
import { sql } from "../database/database.js";

const itemNumber = async ()=>{
   return await sql`SELECT COUNT (*) from shopping_list_items`;
}

const listNumber = async ()=>{
    return await sql`SELECT COUNT (*) from shopping_lists`;
 }
 

export{itemNumber, listNumber}