import * as itemsService from "../services/itemsServices.js";

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};

const addItem = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const formData = await request.formData();
  const nameItem = formData.get("item");
  console.log("url & name of addItem:", urlParts[2],nameItem)
  await itemsService.createItem(urlParts[2],nameItem);

  return redirectTo(`/lists/${urlParts[2]}`);
};
const collected = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  console.log("url collecter:",urlParts)
  await itemsService.collectedItems(urlParts[4]);

  return redirectTo(`/lists/${urlParts[2]}`);
};

/* const viewItems= async(request)=>{
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const data4 = {
    items: await itemsService.findItemsById(urlParts[2]),
}
return new Response(await renderFile("list.eta", data4), responseDetails);
}; */
/* const addItem = async (request) => {
  const formData = await request.formData();
  const nameItem = formData.get("item");
  console.log(item)

  await itemsService.create(nameItem);

  return redirectTo("/lists");
}; */

export { addItem, collected };
  