import Header from "@/components/Header";
import HeroScroll from "@/components/HeroScroll";
import DestinationsGrid from "@/components/DestinationsGrid";
import Experiences from "@/components/Experiences";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main className="relative bg-white min-h-screen">
      <Header />

      <section id="hero">
        <HeroScroll />
      </section>

      <DestinationsGrid />

      <Experiences />

      <ContactForm />

      <footer className="py-20 px-6 md:px-24 bg-white border-t border-dark/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-dark">
          <div className="text-3xl font-serif tracking-[0.5em] uppercase">Muonium</div>
          <div className="flex gap-12 text-[10px] tracking-[0.3em] uppercase opacity-60">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Instagram</a>
          </div>
          <p className="text-[10px] tracking-[0.2em] uppercase opacity-40">© 2026 Muonium Global</p>
        </div>
      </footer>
    </main>
  );
}
