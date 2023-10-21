
import { sql } from "../database/database.js";

const create = async (name) => {
    await sql`INSERT INTO shopping_lists (name) VALUES (${ name })`;
  };

  const findAllNonActiveList = async () => {
    return await sql`SELECT * FROM shopping_lists WHERE active = true`;
  };

  const desactivateList =async(id) =>{
    return await sql`UPDATE shopping_lists SET active = false WHERE id = ${ id }`;
    
  };
  
  const findById = async (id) => {
    const rows = await sql`SELECT * FROM shopping_lists WHERE id = ${ id }`;
  
    if (rows && rows.length > 0) {
      return rows[0];
    }
  
    return { id: 0, name: "Unknown" };
  };
  

  
  export{create, findAllNonActiveList, findById, desactivateList}