import { notFound } from "next/navigation";
import { getProductById, getProductsByCategory } from "@/lib/products";
import ProductPageContent from "@/components/ProductPageContent";

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) notFound();

  const related = getProductsByCategory(product.category)
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  return <ProductPageContent product={product} related={related} />;
}
