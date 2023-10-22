
import { sql } from "../database/database.js";


const createItem = async (listId, name) => {
    await sql`INSERT INTO
      shopping_list_items (shopping_list_id, name)
      VALUES (${listId}, ${name})`;
  };

  const findItemsById = async (id) => {
    return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${ id } ORDER BY collected, name ASC `;
  
  };

  const collectedItems = async (id) => {
    return await sql`UPDATE shopping_list_items SET collected = true where id =${id}`;
  };

  
  export{createItem, findItemsById, collectedItems}