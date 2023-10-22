import { renderFile } from "../deps.js"
import * as mainService from "../services/mainService.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  };
  

const main = async (request) => {
    const data5={
      itemNUM:await mainService.itemNumber(),
      listsNUM:await mainService.listNumber()
    }
    return new Response(await renderFile("main.eta", data5), responseDetails);
  };

export{main}