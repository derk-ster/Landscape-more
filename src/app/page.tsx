import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { ProjectFinderQuiz } from "@/components/ProjectFinderQuiz";
import { MaterialCalculator } from "@/components/MaterialCalculator";
import { ReviewsSection } from "@/components/ReviewsSection";
import { ContactSection } from "@/components/ContactSection";
import { StoreGallery } from "@/components/StoreGallery";
import { Footer } from "@/components/Footer";
import { QuoteListDrawer } from "@/components/QuoteListDrawer";
import { QuoteFab } from "@/components/QuoteFab";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CategoryGrid />
        <FeaturedProducts />
        <section
          id="project-finder"
          className="section-tight scroll-mt-20 bg-sage-50/60"
          aria-labelledby="quiz-heading"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-8 xl:gap-12">
              <ProjectFinderQuiz sideBySide />
              <MaterialCalculator sideBySide />
            </div>
          </div>
        </section>
        <ReviewsSection />
        <ContactSection />
        <StoreGallery />
      </main>
      <Footer />
      <QuoteListDrawer />
      <QuoteFab />
    </>
  );
}
