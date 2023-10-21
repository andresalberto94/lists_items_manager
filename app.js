import { serve } from "./deps.js";
import { configure } from "./deps.js";
import * as listsController from "./controllers/listsControllers.js";
import * as itemsController from "./controllers/itemsControllers.js";


configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);

/*   if (url.pathname === "/lists" && request.method === "GET") {
    return new Response(`Redirecting to /lists.`, {
      status: 303,
      headers: {
        "Location": "/lists",
      },
    }); 
  }*/
  if (url.pathname === "/lists" && request.method === "POST") {
    return await listsController.addList(request);
  } else if (url.pathname === "/lists" && request.method === "GET") {
    return await listsController.viewLists(request);
  }else if (url.pathname.match("/lists/[0-9]+") && request.method === "GET") {
    return await listsController.viewList(request);
  } else if (url.pathname.match("lists/[0-9]+/desactive") && request.method === "POST") {
    return await listsController.desactive(request);
  } else if (url.pathname === "/" && request.method === "GET") {
    return await listsController.main(request);
  } else if (url.pathname.match("/lists/[0-9]+/items/[0-9]+/collect") && request.method === "POST") {
    return await itemsController.collected(request);
  } else if (url.pathname.match("/lists/[0-9]+/items") && request.method === "POST") {
    return await itemsController.addItem(request);
  } else {
    return new Response("Not found", { status: 404 });
  }
};

serve(handleRequest, { port: 7777 });