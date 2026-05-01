import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Tag, ExternalLink, ChevronDown, Flame, Star, Zap } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import { useState, useMemo } from "react";

type Offer = Tables<"offers">;

function calcDiscount(original: number, promo: number) {
  if (original <= 0 || original <= promo) return 0;
  return Math.round(((original - promo) / original) * 100);
}

export default function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: offers = [], isLoading } = useQuery({
    queryKey: ["landing-offers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("offers")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const categories = useMemo(() => {
    const cats = [...new Set(offers.map((o) => o.category).filter(Boolean))] as string[];
    return cats.sort();
  }, [offers]);

  const filtered = selectedCategory
    ? offers.filter((o) => o.category === selectedCategory)
    : offers;

  const scrollToOffers = () => {
    document.getElementById("offers-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <span className="font-bold text-lg text-primary">Shopee Ofertas</span>
          </div>
          <Badge variant="secondary" className="gap-1">
            <Flame className="h-3 w-3" />
            {offers.length} ofertas ativas
          </Badge>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="container mx-auto px-4 py-16 md:py-24 text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <Zap className="h-4 w-4" />
            Ofertas atualizadas diariamente
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            As <span className="text-primary">melhores ofertas</span>
            <br />da Shoope reunidas Aqui!
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Curadoria das melhores promoções e preços baixos. Atualizamos todos os dias para você economizar.
          </p>
          <Button size="lg" onClick={scrollToOffers} className="gap-2 text-base px-8">
            Ver Ofertas <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </section>

      {/* Stats bar */}
      <section className="border-y bg-card">
        <div className="container mx-auto px-4 py-6 flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { icon: Tag, label: "Ofertas Ativas", value: offers.length },
            { icon: Star, label: "Categorias", value: categories.length },
            { icon: Flame, label: "Atualizado Hoje", value: "✓" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category Filter */}
      <section id="offers-section" className="container mx-auto px-4 pt-10 pb-4">
        <h2 className="text-2xl font-bold mb-4">🔥 Ofertas do Dia</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="shrink-0"
          >
            Todas
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="shrink-0"
            >
              {cat}
            </Button>
          ))}
        </div>
      </section>

      {/* Offers Grid */}
      <section className="container mx-auto px-4 pb-16">
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4 h-48" />
              </Card>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">Nenhuma oferta encontrada.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((offer) => (
              <OfferLandingCard key={offer.id} offer={offer} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>🛒 Shopee Ofertas — Links de afiliado. Preços sujeitos a alteração.</p>
        </div>
      </footer>
    </div>
  );
}

function OfferLandingCard({ offer }: { offer: Offer }) {
  const discount = calcDiscount(offer.original_price, offer.promo_price);

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg hover:shadow-primary/5">
      <CardContent className="p-4 flex flex-col gap-3 h-full">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm leading-snug line-clamp-2 flex-1">{offer.title}</h3>
          {discount > 0 && (
            <Badge className="bg-primary/10 text-primary border-0 shrink-0">-{discount}%</Badge>
          )}
        </div>

        {offer.category && (
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Tag className="h-3 w-3" />
            {offer.category}
          </span>
        )}

        <div className="mt-auto pt-2">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-xl font-bold text-primary">
              R$ {offer.promo_price.toFixed(2)}
            </span>
            {discount > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                R$ {offer.original_price.toFixed(2)}
              </span>
            )}
          </div>
          <Button asChild className="w-full gap-2" size="sm">
            <a href={offer.affiliate_link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3" />
              Ver na Shopee
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
