export type Category = 'experiencias' | 'vinos' | 'paquetes';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  longDescription: string;
  image: string;
  duration?: string;
  includes?: string[];
  stock: number;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: 'tour-bodega',
    name: 'Tour por la Bodega',
    category: 'experiencias',
    price: 45,
    description: 'Recorrido guiado por nuestra bodega con degustación de 3 vinos.',
    longDescription:
      'Sumérgete en el mundo del vino con nuestro tour guiado por la bodega. Conocerás el proceso de elaboración del vino desde la viña hasta la botella, y terminarás con una degustación de 3 de nuestros mejores vinos acompañados de tabla de quesos y embutidos.',
    image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=800&q=80',
    duration: '2 horas',
    includes: ['Guía experto', 'Degustación de 3 vinos', 'Tabla de quesos y embutidos'],
    stock: 20,
    featured: true,
  },
  {
    id: 'degustacion-premium',
    name: 'Degustación Premium',
    category: 'experiencias',
    price: 75,
    description: 'Cata de 6 vinos premium con maridaje y guía especializado.',
    longDescription:
      'Una experiencia sensorial única donde explorarás 6 de nuestros vinos más selectos, guiados por un sommelier profesional. Cada vino viene acompañado de un maridaje especialmente diseñado para realzar sus características únicas.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80',
    duration: '3 horas',
    includes: ['Sommelier profesional', 'Cata de 6 vinos', 'Maridaje completo', 'Ficha técnica de cada vino'],
    stock: 12,
    featured: true,
  },
  {
    id: 'picnic-vinedo',
    name: 'Picnic en el Viñedo',
    category: 'experiencias',
    price: 55,
    description: 'Almuerzo entre las vides con vino de la casa incluido.',
    longDescription:
      'Disfruta de un almuerzo artesanal en medio de nuestros viñedos con una vista panorámica espectacular. La canasta incluye productos locales de temporada, quesos artesanales, embutidos y una botella de vino de la casa para compartir.',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80',
    duration: '2.5 horas',
    includes: ['Canasta artesanal', 'Botella de vino', 'Mantel y vajilla', 'Reserva de espacio privado'],
    stock: 8,
    featured: true,
  },
  {
    id: 'atardecer-vinedo',
    name: 'Atardecer en el Viñedo',
    category: 'experiencias',
    price: 65,
    description: 'Cata al atardecer con vistas panorámicas del viñedo.',
    longDescription:
      'Una experiencia mágica al caer el sol sobre nuestros viñedos. Disfruta de una cata de 4 vinos con aperitivos mientras el sol se pone sobre el Río Uruguay. Un momento que no olvidarás.',
    image: 'https://images.unsplash.com/photo-1528823872057-9c018a7a7553?w=800&q=80',
    duration: '2 horas',
    includes: ['Cata de 4 vinos', 'Aperitivos', 'Fotografía del momento', 'Copa de bienvenida'],
    stock: 15,
  },
  {
    id: 'tannat-reserva',
    name: 'Tannat Reserva',
    category: 'vinos',
    price: 28,
    description: 'Nuestro Tannat Reserva, robusto y elegante. Añada 2021.',
    longDescription:
      'El Tannat es el vino insignia de Uruguay. Nuestra versión Reserva pasa 12 meses en barrica de roble francés, desarrollando aromas complejos de frutos rojos, especias y tabaco. De cuerpo pleno y taninos sedosos.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    includes: ['Botella 750ml', 'Ficha técnica', 'Caja de regalo disponible'],
    stock: 50,
    featured: true,
  },
  {
    id: 'merlot-gran',
    name: 'Merlot Gran Selección',
    category: 'vinos',
    price: 22,
    description: 'Merlot suave y afrutado, perfecto para compartir. Añada 2022.',
    longDescription:
      'Un Merlot de carácter mediterráneo, con aromas de ciruela madura, cerezas y notas florales. En boca es suave, redondo y de final largo y persistente. Ideal para acompañar carnes rojas y pastas.',
    image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=800&q=80',
    includes: ['Botella 750ml', 'Ficha técnica'],
    stock: 60,
  },
  {
    id: 'chardonnay-barrica',
    name: 'Chardonnay Barrica',
    category: 'vinos',
    price: 20,
    description: 'Chardonnay cremoso con paso por barrica de roble. Añada 2022.',
    longDescription:
      'Un Chardonnay que combina la frescura de la fruta tropical con la complejidad que aporta el roble. Aromas a mantequilla, vainilla y frutas blancas. En boca es amplio, untuoso y elegante. Perfecto con mariscos y quesos.',
    image: 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=800&q=80',
    includes: ['Botella 750ml', 'Ficha técnica'],
    stock: 45,
  },
  {
    id: 'caja-regalo-3',
    name: 'Caja Regalo 3 Vinos',
    category: 'paquetes',
    price: 75,
    description: 'Selección de 3 vinos en caja de madera artesanal. El regalo perfecto.',
    longDescription:
      'Una caja de madera artesanal con 3 botellas seleccionadas por nuestro enólogo: Tannat Reserva, Merlot Gran Selección y Chardonnay Barrica. Incluye tarjeta personalizada y notas de cata. El regalo ideal para amantes del vino.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80',
    includes: ['3 botellas 750ml', 'Caja de madera artesanal', 'Tarjeta personalizada', 'Notas de cata'],
    stock: 25,
    featured: true,
  },
  {
    id: 'paquete-escapada',
    name: 'Escapada Enoturística',
    category: 'paquetes',
    price: 220,
    description: '1 noche + tour bodega + desayuno + degustación. Para 2 personas.',
    longDescription:
      'El paquete completo para disfrutar Carmelo al máximo. Incluye una noche en nuestra cabaña del viñedo, desayuno con productos locales, tour guiado por la bodega y una degustación de 4 vinos al atardecer. Una experiencia que no olvidarás.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    duration: '2 días / 1 noche',
    includes: ['1 noche en cabaña del viñedo', 'Desayuno artesanal', 'Tour guiado por bodega', 'Degustación de 4 vinos', 'Botella de recuerdo'],
    stock: 5,
    featured: true,
  },
  {
    id: 'caja-regalo-6',
    name: 'Caja Regalo 6 Vinos',
    category: 'paquetes',
    price: 140,
    description: 'Selección premium de 6 vinos en caja de madera. Para los más entusiastas.',
    longDescription:
      'Nuestra caja de regalo más completa: 6 botellas seleccionadas que incluyen nuestras etiquetas más premiadas. Presentadas en una elegante caja de madera con cierre metálico, fichas de cata y una guía de maridaje.',
    image: 'https://images.unsplash.com/photo-1567529684892-09290a1b2d05?w=800&q=80',
    includes: ['6 botellas 750ml', 'Caja de madera premium', 'Fichas de cata', 'Guía de maridaje', 'Tarjeta personalizada'],
    stock: 15,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export const categoryLabels: Record<Category, string> = {
  experiencias: 'Experiencias',
  vinos: 'Vinos',
  paquetes: 'Paquetes',
};
