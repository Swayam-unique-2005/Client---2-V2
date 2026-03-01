import { Link } from "react-router-dom";
import { Heart, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/contexts/WishlistContext";
import { products } from "@/data/products";

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const wishlisted = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 lg:py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft size={14} /> Back to Shop
        </Link>
        <h1 className="font-serif text-2xl lg:text-3xl text-foreground mb-8">Your Wishlist</h1>

        {wishlisted.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8">
            {wishlisted.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart size={40} className="mx-auto text-muted-foreground mb-3" />
            <p className="font-sans text-sm text-muted-foreground mb-4">Your wishlist is empty</p>
            <Link to="/" className="text-primary font-sans text-sm underline">Explore products</Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
