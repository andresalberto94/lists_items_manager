import { renderFile } from "../deps.js"
import * as listService from "../services/listervices.js";
import * as itemsService from "../services/itemsServices.js";



const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
    return new Response(`Redirecting to ${path}.`, {
      status: 303,
      headers: {
        "Location": path,
      },
    });
  };

const addList = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");
    
  
    await listService.create(name);
  
    return redirectTo("/lists");
  };

  const viewLists = async (request) => {
    const data = {
      lists: await listService.findAllNonActiveList(),
    };
  
    return new Response(await renderFile("lists.eta", data), responseDetails);
  };
  const viewList= async(request)=>{
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    
    const data3 = {
      list: await listService.findById(urlParts[2]),
      items: await itemsService.findItemsById(urlParts[2]),
      
  
  };
  return new Response(await renderFile("list.eta", data3), responseDetails);
};

  const deactive = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    
    await listService.deactivateList(urlParts[2]);
  
    return redirectTo("/lists");
  };

  const findList= async(request)=>{
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const data2 = {
      list: await listService.findById(urlParts[2]),
  }
  return new Response(await renderFile("lists.eta", data2), responseDetails);
};

  

  export{addList,viewLists, deactive,findList, viewList}
