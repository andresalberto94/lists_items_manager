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
  console.log(urlParts[2])
  const name = formData.get("item");

  await itemsService.createItem(urlParts[2],name);

  return redirectTo(`/lists/${urlParts[2]}`);
};
const collected = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  await itemsService.collectedItems(urlParts[4]);

  return redirectTo(`/lists/${urlParts[2]}`);
};

export { addItem, collected };
  