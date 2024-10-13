import * as productsService from "../../../services/productsService";
import fs from "fs";
// import { pipeline } from "stream";
import { pipeline } from "node:stream/promises";

module.exports = async function (fastify, _opts) {
  fastify.get("/", async function (_request, reply) {
    const products = await productsService.getProducts();
    reply.send(products);
  });

  fastify.get(
    "/:id",
    async function (request: { params: { id: string } }, reply: { send: any }) {
      const product = await productsService.getProduct(request.params.id);
      reply.send(product);
    }
  );

  fastify.post(
    "/",
    async function (
      request: { body: any; isMultipart: () => any; file: () => any },
      reply: any
    ) {
      const product = request.body;
      if (request.isMultipart()) {
        try {
          const imageData = await request.file();
          // save the image to the assets folder
          let picUrl = `src/assets/${imageData.filename}`;
          await pipeline(imageData.file, fs.createWriteStream(picUrl));
          product.image_url = imageData.filename;
        } catch (err) {
          console.error(err);
        }
      }
      const upsertedProduct = await productsService.upsertProduct(product);
      reply.send(upsertedProduct);
    }
  );
};
