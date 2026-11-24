// Conteúdo do site concentrado em um só lugar para facilitar ajustes

const WA_NUMBER = '5511900000000';

export const wa = (msg = 'Olá! Quero agendar um horário na Navalha & Carvalho.') =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

export const img = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=72&auto=format&fit=crop`;

export const nav = [
  { id: 'casa', label: 'A Casa' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'ritual', label: 'O Ritual' },
  { id: 'galeria', label: 'Galeria' },
  { id: 'barbeiros', label: 'Barbeiros' },
  { id: 'clube', label: 'Clube' },
  { id: 'contato', label: 'Contato' }
];

export const tickerItems = ['Corte clássico', 'Barba na navalha', 'Toalha quente', 'Whisky da casa', 'Hora marcada'];

export const stats = [
  { value: 17, label: 'anos de casa' },
  { value: 40, suffix: ' mil', label: 'cortes feitos' },
  { value: 3, label: 'mestres barbeiros' },
  { value: 4.9, decimals: 1, label: 'nota no Google' }
];

export const services = [
  { name: 'Corte Clássico', price: 70, time: '45 min', desc: 'Tesoura e máquina, lavagem com água quente e finalização com pomada da casa.' },
  { name: 'Barba Tradicional', price: 60, time: '40 min', desc: 'Navalha, toalha quente, espuma batida no pincel e óleo de cedro para fechar.' },
  { name: 'Corte + Barba', price: 120, time: '80 min', desc: 'O serviço completo da casa. O que a maioria dos nossos clientes pede.' },
  { name: 'Barboterapia', price: 90, time: '50 min', desc: 'Esfoliação, vapor, massagem facial e hidratação profunda dos fios da barba.' },
  { name: 'Grisalho Natural', price: 85, time: '40 min', desc: 'Tonalização discreta para fios brancos. Disfarça sem esconder, e sem cara de tinta.' },
  { name: 'Acabamento', price: 35, time: '20 min', desc: 'Contorno, pezinho e sobrancelha para manter o corte em dia entre uma visita e outra.' }
];

export const steps = [
  { title: 'Recepção', photo: '1599351431202-1e0f0137899a', alt: 'Barbeiro com mãos tatuadas fazendo contorno com navalha', text: 'Café passado na hora ou uma dose de whisky. Celular no silencioso é opcional, mas recomendado.' },
  { title: 'Conversa', photo: '1590540179852-2110a54f813a', alt: 'Barbeiro penteando o cabelo de um cliente antes do corte', text: 'Antes da tesoura, a conversa. Sua rotina, seu estilo e o que realmente funciona no seu cabelo.' },
  { title: 'Execução', photo: '1596728325488-58c87691e9af', alt: 'Cliente recebendo acabamento de barba com tesoura e pente', text: 'Tesoura, navalha e toalha quente. Sem pressa e sem ninguém esperando em pé atrás de você.' },
  { title: 'Acabamento', photo: '1621605815971-fbc98d665033', alt: 'Ferramentas de barbearia sobre bancada de madeira', text: 'Finalização com produtos da casa e a dica certa para o corte durar até a próxima visita.' }
];

export const gallery = [
  { photo: '1622286342621-4bd786c2447c', w: 1000, alt: 'Corte masculino sendo finalizado na tesoura' },
  { photo: '1532710093739-9470acff878f', w: 800, alt: 'Barba com espuma sendo preparada com pincel' },
  { photo: '1593702275687-f8b402bf1fb5', w: 800, alt: 'Degradê lateral feito na máquina' },
  { photo: '1517832606299-7ae9b720a186', w: 800, alt: 'Acabamento de barba com tesoura em preto e branco' },
  { photo: '1493256338651-d82f7acb2b38', w: 1000, alt: 'Barbeiro tatuado usando máquina no acabamento da nuca' }
];

export const barbers = [
  { name: 'Antônio Ferraz', role: 'Fundador · 28 anos de navalha', photo: '1622287162716-f311baa1a2b8', bio: 'Aprendeu com o avô em Minas. Especialista em barba clássica e no famoso "corte de sempre".' },
  { name: 'Rafael Moura', role: 'Cortes clássicos · 12 anos de casa', photo: '1534297635766-a262cdcb8ee4', bio: 'Detalhista ao extremo. Social, risca lateral e degradê baixo que não sai de moda.' },
  { name: 'Thiago Belém', role: 'Barboterapia e grisalho · 9 anos', photo: '1567894340315-735d7c361db0', bio: 'O cara que faz o grisalho parecer escolha, não descuido. Mãos leves e papo bom.' }
];

export const plans = [
  {
    name: 'Essencial',
    price: 129,
    items: ['2 cortes por mês', 'Prioridade na agenda', 'Café ou chope por conta da casa', '10% de desconto em produtos'],
    cta: 'Quero o Essencial'
  },
  {
    name: 'Completo',
    price: 219,
    featured: true,
    items: ['2 cortes e 2 barbas por mês', '1 barboterapia por mês', 'Horário fixo reservado no seu dia', 'Dose de whisky por conta da casa', '15% de desconto em produtos'],
    cta: 'Quero o Completo'
  }
];

export const reviews = [
  { quote: 'Corto aqui há seis anos. Chego, o café já está vindo e ninguém precisa perguntar como eu gosto.', name: 'Marcelo A.', info: '42 anos, engenheiro' },
  { quote: 'Finalmente um lugar que entende barba grisalha. Ficou natural. Minha esposa só achou que eu estava mais descansado.', name: 'Ricardo T.', info: '51 anos, advogado' },
  { quote: 'Horário marcado é horário cumprido. Para quem tem agenda cheia, isso vale mais do que qualquer desconto.', name: 'Fábio L.', info: '37 anos, empresário' }
];

export const hours = [
  ['Terça a sexta', '9h às 21h'],
  ['Sábado', '8h às 18h'],
  ['Domingo e segunda', 'Fechado']
];
