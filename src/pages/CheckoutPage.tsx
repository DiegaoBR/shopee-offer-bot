import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Lock, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const alias = "diego-francisco-abreu-botelho";

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white/50 text-sm tracking-widest uppercase">
        <div>
          <p className="mb-4 text-center">Nenhum rito selecionado.</p>
          <button 
            onClick={() => navigate('/')}
            className="text-primary hover:text-white transition-colors border-b border-primary/30 pb-1"
          >
            Voltar ao Cardápio
          </button>
        </div>
      </div>
    );
  }

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to Yampi with the specific product token
    window.location.href = `https://${alias}.pay.yampi.com.br/r/${product.token}`;
  };

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-primary selection:text-black font-sans pb-20 md:pb-0">
      
      {/* Checkout Header */}
      <header className="border-b border-white/5 py-6">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <button 
            onClick={() => navigate('/')}
            className="text-white/40 hover:text-primary transition-colors flex items-center gap-2 text-xs uppercase tracking-widest font-bold"
          >
            <ChevronLeft size={16} /> Voltar
          </button>
          <span className="text-xl md:text-2xl font-serif font-bold tracking-widest text-primary">RITO48</span>
          <div className="flex items-center gap-2 text-white/20 text-xs tracking-widest uppercase">
            <Lock size={12} className="text-primary/50" />
            <span className="hidden sm:inline">Checkout Seguro</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 pt-12 md:pt-20">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 max-w-6xl mx-auto">
          
          {/* Form Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Seus dados</h1>
              <p className="text-white/30 text-xs uppercase tracking-widest">Para onde enviaremos o seu rito?</p>
            </div>

            <form onSubmit={handleProceedToPayment} className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/50 border-b border-white/5 pb-2">Identificação</h3>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">Nome Completo</label>
                    <input 
                      type="text" 
                      required 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm"
                      placeholder="Ex: João da Silva"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">E-mail</label>
                      <input 
                        type="email" 
                        required 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm"
                        placeholder="seu@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">Telefone / WhatsApp</label>
                      <input 
                        type="tel" 
                        required 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm"
                        placeholder="(33) 90000-0000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  type="submit"
                  className="w-full bg-primary text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-white transition-colors flex items-center justify-center gap-3 shadow-2xl shadow-primary/20"
                >
                  Continuar para Pagamento <ArrowRight size={16} />
                </button>
                <p className="text-center text-white/20 text-[9px] uppercase tracking-widest mt-4">
                  Você será redirecionado para o ambiente seguro da Yampi
                </p>
              </div>
            </form>
          </motion.div>

          {/* Order Summary Column */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:pl-10 lg:border-l border-white/5"
          >
            <div className="bg-white/[0.02] border border-white/5 rounded-[30px] p-8 md:p-10 sticky top-32">
              <h3 className="text-lg font-serif font-bold mb-8 flex items-center gap-3">
                <ShoppingBag className="text-primary" size={20} />
                Resumo do Pedido
              </h3>
              
              <div className="flex gap-6 pb-8 border-b border-white/5 items-center">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-black shrink-0">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-1">{product.name}</h4>
                  <p className="text-white/30 text-[10px] uppercase tracking-widest mb-3">Tamanho Média • 30cm</p>
                  <p className="font-bold text-primary">R$ {product.price}</p>
                </div>
              </div>

              <div className="py-8 space-y-4 text-sm">
                <div className="flex justify-between text-white/50">
                  <span>Subtotal</span>
                  <span>R$ {product.price}</span>
                </div>
                <div className="flex justify-between text-white/50">
                  <span>Frete</span>
                  <span className="text-primary text-xs uppercase tracking-widest">Calculado na próxima etapa</span>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 flex justify-between items-end">
                <span className="text-sm uppercase tracking-widest text-white/40">Total</span>
                <span className="text-3xl font-serif font-bold text-white">R$ {product.price}</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
