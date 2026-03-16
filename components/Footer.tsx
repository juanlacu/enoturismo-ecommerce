import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <p className="text-amber-400 font-bold text-lg mb-1">Enoturismo Carmelo</p>
          <p className="text-sm leading-relaxed">
            Viví la experiencia del vino uruguayo en el corazón de Carmelo. Bodega, viñedos y sabores únicos te esperan.
          </p>
        </div>

        <div>
          <p className="text-stone-200 font-semibold mb-3">Navegación</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products?category=experiencias" className="hover:text-amber-400 transition-colors">Experiencias</Link></li>
            <li><Link href="/products?category=vinos" className="hover:text-amber-400 transition-colors">Vinos</Link></li>
            <li><Link href="/products?category=paquetes" className="hover:text-amber-400 transition-colors">Paquetes</Link></li>
            <li><Link href="/cart" className="hover:text-amber-400 transition-colors">Mi carrito</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-stone-200 font-semibold mb-3">Contacto</p>
          <ul className="space-y-2 text-sm">
            <li>📍 Ruta 21, Carmelo, Colonia — Uruguay</li>
            <li>📞 +598 4542 0000</li>
            <li>✉️ info@enoturismocarmelo.com.uy</li>
            <li className="pt-1">
              <span className="text-stone-500 text-xs">Horario de atención:</span>
              <br />
              Lun–Vie 9:00–18:00 | Sáb–Dom 10:00–17:00
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-800 px-4 py-4 text-center text-xs text-stone-600">
        © {new Date().getFullYear()} Enoturismo Carmelo. Todos los derechos reservados.
      </div>
    </footer>
  );
}
