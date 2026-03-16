import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts } from '@/lib/products';

export default function Home() {
  const featured = getFeaturedProducts();

  return (
    <>
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[560px] flex items-center justify-center text-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1566995541428-f2246c17cda1?w=1920&q=80"
          alt="Viñedo en Carmelo"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 px-6 max-w-3xl mx-auto">
          <p className="text-amber-400 text-sm uppercase tracking-widest font-semibold mb-4">
            Carmelo, Uruguay
          </p>
          <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight mb-6">
            Descubrí el vino<br />en su lugar de origen
          </h1>
          <p className="text-stone-200 text-xl mb-10 leading-relaxed">
            Tours por bodega, degustaciones únicas y los mejores vinos uruguayos,
            directamente desde nuestros viñedos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products?category=experiencias"
              className="bg-amber-700 hover:bg-amber-600 text-white px-8 py-3.5 rounded-full font-semibold text-base transition-colors"
            >
              Ver experiencias
            </Link>
            <Link
              href="/products"
              className="border border-white/60 hover:border-white text-white px-8 py-3.5 rounded-full font-semibold text-base transition-colors hover:bg-white/10"
            >
              Explorar todo
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-stone-900 text-stone-100 py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-amber-400 mb-1">+15 años</p>
            <p className="text-stone-400">de experiencia en enoturismo</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-amber-400 mb-1">+200 ha</p>
            <p className="text-stone-400">de viñedos propios</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-amber-400 mb-1">+10.000</p>
            <p className="text-stone-400">visitantes por año</p>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <p className="text-amber-700 text-sm uppercase tracking-widest font-semibold mb-2">
            Lo más destacado
          </p>
          <h2 className="text-stone-800 text-3xl md:text-4xl font-bold">
            Experiencias & Vinos
          </h2>
          <p className="text-stone-500 mt-3 text-lg max-w-xl mx-auto">
            Elegí tu experiencia favorita o llevate una botella de nuestros mejores vinos a casa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-block border-2 border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            Ver catálogo completo
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="bg-stone-100 py-20">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&q=80"
              alt="Nuestra bodega"
              className="rounded-2xl w-full h-80 object-cover shadow-lg"
            />
          </div>
          <div>
            <p className="text-amber-700 text-sm uppercase tracking-widest font-semibold mb-3">
              Nuestra historia
            </p>
            <h2 className="text-stone-800 text-3xl font-bold mb-5">
              Pasión por el vino uruguayo
            </h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Ubicados en Carmelo, en el corazón del departamento de Colonia, cultivamos nuestras vides con el
              amor y dedicación que solo una bodega familiar puede ofrecer. El río Uruguay, el clima templado
              y nuestro terroir único dan vida a vinos de carácter inconfundible.
            </p>
            <p className="text-stone-600 leading-relaxed mb-6">
              Nuestro varietal estrella es el Tannat, cepa bandera de Uruguay, que en nuestras tierras
              alcanza una expresión única: robusto, elegante y con un potencial de guarda excepcional.
            </p>
            <Link
              href="/products?category=experiencias"
              className="inline-block bg-amber-700 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              Reservar una visita
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-stone-800 text-3xl font-bold">Lo que dicen nuestros visitantes</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'María López',
              location: 'Montevideo',
              text: 'Una experiencia increíble. El tour por la bodega fue fascinante y los vinos son excelentes. Definitivamente vuelvo.',
            },
            {
              name: 'Carlos Rodríguez',
              location: 'Buenos Aires',
              text: 'El picnic en el viñedo fue mágico. Un entorno hermoso, vino de primera y una atención personalizada que se agradece mucho.',
            },
            {
              name: 'Sofía Martínez',
              location: 'Punta del Este',
              text: 'Compramos la caja regalo para un cumpleaños y fue un éxito total. Los vinos llegaron perfectamente presentados.',
            },
          ].map((t) => (
            <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-500 text-lg">★</span>
                ))}
              </div>
              <p className="text-stone-600 leading-relaxed mb-4 italic">"{t.text}"</p>
              <p className="font-semibold text-stone-800">{t.name}</p>
              <p className="text-sm text-stone-400">{t.location}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="relative py-24 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1528823872057-9c018a7a7553?w=1920&q=80"
          alt="Atardecer en el viñedo"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-900/70" />
        <div className="relative z-10 text-center px-4">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para vivir la experiencia?
          </h2>
          <p className="text-stone-300 text-lg mb-8 max-w-lg mx-auto">
            Reservá tu lugar en alguna de nuestras experiencias o llevate los mejores vinos de Carmelo a tu mesa.
          </p>
          <Link
            href="/products"
            className="bg-amber-700 hover:bg-amber-600 text-white px-10 py-4 rounded-full font-semibold text-lg transition-colors inline-block"
          >
            Ver todo el catálogo
          </Link>
        </div>
      </section>
    </>
  );
}
