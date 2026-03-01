import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory, products } from "@/data/products";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const decodedCategory = decodeURIComponent(category || "all");
  const isAll = decodedCategory === "all" || decodedCategory === "All Categories";
  const filtered = isAll ? products : getProductsByCategory(decodedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 lg:py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft size={14} /> Back to Shop
        </Link>
        <div className="flex items-center gap-4 mb-8">
          <h1 className="font-serif text-2xl lg:text-3xl text-foreground">
            {isAll ? "All Products" : decodedCategory}
          </h1>
          <span className="text-xs font-sans text-muted-foreground">({filtered.length} products)</span>
        </div>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center font-sans text-sm text-muted-foreground py-12">No products found in this category.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
