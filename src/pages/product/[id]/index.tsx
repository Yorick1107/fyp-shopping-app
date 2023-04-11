import { type NextPage } from "next";
import { useRouter } from "next/router";

import { api } from "~/utils/api";

const ProductDetails: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: product } = api.product.get.useQuery({ id: id as string });

  return (
    <>
      <code className="whitespace-pre">{JSON.stringify(product, undefined, 2)}</code>
    </>
  );
};

export default ProductDetails;
