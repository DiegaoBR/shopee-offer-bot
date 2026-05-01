import { motion } from 'framer-motion';
import { Zap, Clock, Star, ShoppingBag } from 'lucide-react';

const App = () => {
  const alias = "diego-francisco-abreu-botelho";
  
  const menuItems = [
    { 
      name: "Calabresa Especial", 
      description: "Equilíbrio entre intensidade e crocância", 
      price: "34,90", 
      img: "/calabresa.png",
      token: "2C7H86DDPN"
    },
    { 
      name: "Frango com Catupiry", 
      description: "Cremoso, marcante e equilibrado", 
      price: "38,90", 
      img: "/frango.png",
      token: "RBH34R7LQQ"
    },
    { 
      name: "Margherita Premium", 
      description: "Leve, fresca e aromática", 
      price: "36,90", 
      img: "/margherita.png",
      token: "D81L8XYP68"
    },
    { 
      name: "Quatro Queijos", 
      description: "Intenso e cremoso", 
      price: "42,90", 
      img: "/quatro-queijos.png",
      token: "JKMJM6LZ89"
    }
  ];

  const handleBuy = (token: string) => {
    window.location.href = `https://checkout.yampi.com.br/d/${alias}/cart/add/${token}`;
  };

  return (
    <div className="flex flex-col min-h-screen selection:bg-primary selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-4 py-4 md:px-6 md:py-8">
        <div className="container mx-auto flex justify-between items-center glass px-6 py-3 md:px-8 md:py-4 rounded-full">
          <div className="flex items-center gap-3">
            <span className="text-xl md:text-2xl font-serif font-bold tracking-widest text-primary">RITO48</span>
          </div>
          <div className="hidden md:flex gap-12 text-[10px] uppercase tracking-[0.4em] font-bold text-white/50">
            <a href="#rito" className="hover:text-primary transition-colors">O Rito</a>
            <a href="#menu" className="hover:text-primary transition-colors">Cardápio</a>
            <a href="#contato" className="hover:text-primary transition-colors">Contato</a>
          </div>
          <button 
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-[10px] md:text-xs font-bold tracking-widest hover:text-primary transition-colors border-b border-primary/20 pb-1 uppercase"
          >
            EXPERIMENTAR
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 md:pt-32 pb-12 overflow-hidden">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="text-primary font-bold text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] mb-6 md:mb-8 max-w-sm md:max-w-none">
              Governador Valadares descobriu um novo jeito de comer bem em casa
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[100px] font-serif font-bold leading-[1.1] md:leading-[0.9] mb-8 md:mb-10">
              48 horas de processo. <br className="hidden md:block" />
              <span className="italic font-normal text-white/20 block md:inline mt-2 md:mt-0">Minutos para</span> acontecer.
            </h1>
            <p className="text-lg md:text-xl text-white/40 max-w-lg mb-10 md:mb-12 font-light leading-relaxed">
              Uma experiência gastronômica em casa. Você finaliza. O sabor faz o resto.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-stretch sm:items-center">
              <button 
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary text-black px-10 md:px-12 py-4 md:py-5 rounded-full font-bold text-xs md:text-sm uppercase tracking-widest hover:bg-white transition-all shadow-2xl shadow-primary/20"
              >
                Quero viver essa experiência
              </button>
              <button 
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 hover:text-primary transition-colors text-center"
              >
                Ver cardápio
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative flex justify-center mt-10 lg:mt-0"
          >
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-[100px] md:blur-[150px] -z-10 animate-pulse" />
            <img 
              src="/hero-pizza.png" 
              alt="Rito48 Pizza" 
              className="w-full max-w-[450px] md:max-w-[600px] drop-shadow-[0_0_100px_rgba(212,175,55,0.15)] grayscale-[0.2] contrast-[1.1]"
            />
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section id="rito" className="py-24 md:py-32 relative border-y border-white/5 scroll-mt-24">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-16 md:gap-20">
          {[
            { icon: Zap, title: "Ritual de preparo", desc: "Você não esquenta. Você finaliza." },
            { icon: Clock, title: "48h de maturação", desc: "Tempo real para desenvolver sabor e textura." },
            { icon: Star, title: "Pronto em minutos", desc: "Experiência de restaurante no seu forno." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              className="text-center group"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:bg-primary transition-colors duration-500">
                <item.icon className="text-primary group-hover:text-black h-5 w-5 md:h-6 md:w-6 transition-colors" />
              </div>
              <h3 className="text-xl md:text-2xl font-serif mb-3 md:mb-4 tracking-wide">{item.title}</h3>
              <p className="text-white/30 text-[10px] md:text-sm font-light uppercase tracking-widest">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 md:py-40 bg-[#070707]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-16 italic">O ritual é simples</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { num: "01", title: "Pré-aqueça", desc: "Prepare o ambiente" },
              { num: "02", title: "Finalize", desc: "Poucos minutos fazem tudo acontecer" },
              { num: "03", title: "Sirva", desc: "Crocante por fora, macio por dentro" },
              { num: "04", title: "Aproveite", desc: "O momento começa aqui" }
            ].map((step, i) => (
              <div key={i} className="relative p-6 md:p-8 rounded-3xl glass text-center group">
                <span className="absolute -top-4 md:-top-6 left-1/2 -translate-x-1/2 text-3xl md:text-4xl font-serif italic text-primary opacity-20">{step.num}</span>
                <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3 tracking-tighter uppercase">{step.title}</h4>
                <p className="text-white/30 text-[10px] uppercase tracking-widest">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="py-24 md:py-40 scroll-mt-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 md:mb-32">
            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-4 md:mb-6">Escolha seu rito</h2>
            <p className="text-white/20 tracking-[0.3em] md:tracking-[0.5em] uppercase text-[9px] md:text-[10px]">Pizzas de 30cm • Média</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {menuItems.map((item, i) => (
              <motion.div 
                key={i}
                className="group flex flex-col sm:flex-row gap-8 md:gap-10 items-center p-6 md:p-8 rounded-[30px] md:rounded-[40px] hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/5"
              >
                <div className="w-full sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shrink-0">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h4 className="text-2xl md:text-3xl font-serif mb-2 md:mb-3 tracking-wide">{item.name}</h4>
                  <p className="text-white/30 mb-6 md:mb-8 font-light italic leading-relaxed text-xs md:text-sm">"{item.description}"</p>
                  <div className="flex items-center justify-center sm:justify-start gap-6 md:gap-8">
                    <span className="text-2xl md:text-3xl font-bold text-primary">R$ {item.price}</span>
                    <button 
                      onClick={() => handleBuy(item.token)}
                      className="bg-white/5 p-3 md:p-4 rounded-full hover:bg-primary transition-all active:scale-90 group-hover:shadow-2xl shadow-primary/20 group/btn"
                    >
                      <ShoppingBag className="h-4 w-4 md:h-5 md:w-5 text-white group-hover/btn:text-black" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-40 relative overflow-hidden text-center bg-primary/5">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif font-bold mb-6 md:mb-8 italic">
            Seu próximo momento <br className="hidden md:block" /> começa agora
          </h2>
          <p className="text-base md:text-xl text-white/30 mb-12 md:mb-16 font-light italic">48 horas esperando por alguns minutos seus</p>
          <button 
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary text-black px-12 py-5 rounded-full font-black text-xs md:text-sm uppercase tracking-widest hover:bg-white transition-all shadow-3xl shadow-primary/10"
          >
            Escolher meu rito agora
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="py-16 border-t border-white/5 text-center md:text-left">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div>
            <span className="text-lg md:text-xl font-serif font-bold tracking-widest text-primary mb-4 block">RITO48</span>
            <p className="text-white/20 text-[10px] uppercase tracking-widest">Governador Valadares - MG</p>
          </div>
          <div className="flex gap-8 text-[9px] uppercase tracking-widest font-bold text-white/20">
            <a href="#" className="hover:text-primary transition-colors">Instagram</a>
            <a href="https://wa.me/5533999999999" className="hover:text-primary transition-colors">WhatsApp</a>
          </div>
          <div className="text-[9px] text-white/10 uppercase tracking-[0.2em]">© 2024 RITO48. O ritual é sagrado.</div>
        </div>
      </footer>
    </div>
  );
};

export default App;
