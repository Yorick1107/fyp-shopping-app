import { type NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import { api } from "~/utils/api";

const ProductDetails: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: product } = api.product.get.useQuery({ id: id as string });

  return (
    <>
      <main className="flex min-h-screen flex-col gap-4 items-center justify-center bg-gradient-to-b from-[#eed991] to-[#ccf7f4] bg-fixed">
        {product ? (
          <>
            <div className="relative h-48 w-48 overflow-hidden">
              {product.image ? (
                <Image src={product.image} fill alt="product image" />
              ) : (
                <></>
              )}
            </div>

            <h1 className="text-xl font-bold">{product.name}</h1>
            <p className="text-lg font-bold">
              ${product.prices[0]?.price || "-"}
            </p>

            {product.prices.map((price) => (
              <>
                <a
                  key={product.id}
                  className="flex items-center max-w-xs flex-row gap-4 rounded-xl bg-white/10 p-4 text-slate-800 hover:bg-white/20"
                  href={price.url || ""}
                  target="_blank"
                  rel="noopener"
                >
                  <div className="text-sm font-bold">{price.name}</div>
                  <div className="text-lg font-bold">
                    ${price.price}
                  </div>
                  <div>→</div>
                </a>
              </>
            ))}
          </>
        ) : (
          <>Loading</>
        )}
      </main>
    </>
  );
};

export default ProductDetails;
