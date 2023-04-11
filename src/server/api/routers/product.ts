import { Product, ProductPrice } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

const transformProductWithPrice = (
  product: Product & { prices?: ProductPrice[] }
) => ({
  ...product,
  prices: product.prices?.map(transformProductPrice) || [],
});

const transformProductPrice = (productPrice: ProductPrice) => ({
  ...productPrice,
  price: productPrice.price.toFixed(2),
});

export const productRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const product = await ctx.prisma.product.findUnique({
        where: { id: input.id },
        include: {
          prices: {
            orderBy: { price: "asc" },
          },
        },
      });

      if (!product) return null;

      return transformProductWithPrice(product);
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.prisma.product.findMany({
      include: {
        prices: {
          orderBy: { price: "asc" },
          take: 1,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    if (!products) return null;
    return products.map(transformProductWithPrice);
  }),
});
