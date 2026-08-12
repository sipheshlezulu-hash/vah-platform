const products = [
  { name: "Creation Is Sacred", category: "First Drop", price: "R—" },
  { name: "Build In Silence", category: "First Drop", price: "R—" },
  { name: "Become The Tree", category: "First Drop", price: "R—" },
  { name: "Let The Fruit Speak", category: "First Drop", price: "R—" },
];

export default function StoreHome() {
  return (
    <main className="min-h-screen bg-[#f4f0e8] text-[#171715]">
      <nav className="flex items-center justify-between px-6 py-6 md:px-12">
        <div className="text-sm font-semibold tracking-[0.25em]">VAH AFRIKA</div>
        <div className="hidden gap-8 text-sm md:flex">
          <a href="#shop">Shop</a>
          <a href="#digital">Digital</a>
          <a href="#story">Story</a>
          <a href="#movement">Fuel the Movement</a>
          <a href="#homecoming">Homecoming</a>
        </div>
        <button className="rounded-full border border-black px-4 py-2 text-sm">Cart</button>
      </nav>

      <section className="flex min-h-[75vh] items-center px-6 py-24 md:px-16">
        <div className="max-w-5xl">
          <p className="mb-8 text-xs uppercase tracking-[0.35em]">VAH AFRIKA · FIRST DROP</p>
          <h1 className="max-w-4xl font-serif text-6xl leading-[0.92] tracking-tight md:text-9xl">
            Creation is sacred.
          </h1>
          <p className="mt-10 max-w-xl text-lg leading-8 text-black/65 md:text-xl">
            A movement for African creators, builders, thinkers and dreamers.
            Build the idea. Document the journey. Let the work speak.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#shop" className="rounded-full bg-black px-7 py-4 text-sm text-white">Explore the First Drop</a>
            <a href="#story" className="rounded-full border border-black px-7 py-4 text-sm">Enter VAH</a>
          </div>
        </div>
      </section>

      <section id="story" className="border-y border-black/10 px-6 py-28 md:px-16">
        <div className="grid gap-16 md:grid-cols-2">
          <h2 className="font-serif text-5xl md:text-7xl">Creation happens in silence.</h2>
          <div className="space-y-6 text-lg leading-8 text-black/65">
            <p>Every creation begins invisibly: a feeling, a question, a problem, a dream, a possibility.</p>
            <p>VAH exists for the people doing the work before anyone is watching.</p>
            <p>Plant the seed. Protect it. Water it. Document it. Let it grow.</p>
          </div>
        </div>
      </section>

      <section id="shop" className="px-6 py-28 md:px-16">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em]">The First Drop</p>
            <h2 className="mt-3 font-serif text-5xl md:text-7xl">Wear the philosophy.</h2>
          </div>
          <span className="hidden text-sm text-black/50 md:block">Commerce powered by Shopify</span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <article key={product.name} className="group">
              <div className="aspect-[4/5] bg-[#ded8cb] transition-transform duration-500 group-hover:scale-[0.98]" />
              <div className="flex justify-between gap-4 py-5">
                <div>
                  <p className="text-sm">{product.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-black/45">{product.category}</p>
                </div>
                <span className="text-sm">{product.price}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="digital" className="bg-[#171715] px-6 py-28 text-[#f4f0e8] md:px-16">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Digital</p>
          <h2 className="mt-4 font-serif text-6xl md:text-8xl">VAH Mantra</h2>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/65">
            Creation Is Sacred — a premium digital philosophy and practical creator workbook for your next season of creation.
          </p>
          <button className="mt-10 rounded-full bg-[#f4f0e8] px-7 py-4 text-sm text-black">Explore the Mantra</button>
        </div>
      </section>

      <section id="movement" className="px-6 py-28 md:px-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.3em]">Fuel the Movement</p>
          <h2 className="mt-5 font-serif text-5xl md:text-7xl">Buy the movement. Build what comes next.</h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-black/60">
            Every purchase helps build the foundation for a wider ecosystem where African creators can learn, build, collaborate, document and grow.
          </p>
        </div>
      </section>

      <section id="homecoming" className="border-t border-black/10 px-6 py-28 md:px-16">
        <div className="grid gap-10 md:grid-cols-2">
          <h2 className="font-serif text-5xl md:text-7xl">Homecoming is coming.</h2>
          <div>
            <p className="text-lg leading-8 text-black/65">Build. Document. Mentor. Vote. Showcase. Festival.</p>
            <p className="mt-6 text-lg leading-8 text-black/65">A year-long innovation journey and doorway into the future VAH ecosystem.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/10 px-6 py-10 md:px-16">
        <div className="flex flex-col justify-between gap-4 text-sm md:flex-row">
          <span>VAH AFRIKA</span>
          <span>CREATE. BUILD. BECOME.</span>
          <span>© 2026 VAH Afrika</span>
        </div>
      </footer>
    </main>
  );
}
