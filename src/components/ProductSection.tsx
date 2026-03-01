import ProductCard from "./ProductCard";
import type { Product } from "@/data/products";

interface ProductSectionProps {
  title: string;
  products: Product[];
}

export default function ProductSection({ title, products }: ProductSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-10 lg:py-14">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-border" />
        <h2 className="font-serif text-xl lg:text-2xl text-foreground text-center whitespace-nowrap">
          {title}
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
