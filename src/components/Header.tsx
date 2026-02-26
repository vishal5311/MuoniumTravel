import React from 'react'

const Header = () => {
    return (
        <header
            className="absolute top-0 left-0 w-full z-50 px-6 md:px-12 py-10 flex justify-between items-center bg-transparent"
        >
            <div className="text-2xl font-serif tracking-widest uppercase text-white">
                Muonium
            </div>

            <nav className="hidden md:flex gap-8 text-[10px] tracking-[0.4em] uppercase font-sans">
                {['Destinations', 'Experiences', 'Fleet', 'About', 'Contact'].map((item) => (
                    <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="transition-colors duration-500 hover:text-primary text-white"
                    >
                        {item}
                    </a>
                ))}
            </nav>

            <button className="px-6 py-2 border border-white text-white hover:bg-white hover:text-dark transition-all duration-500 text-[10px] tracking-[0.3em] uppercase">
                Book Now
            </button>
        </header>
    )
}

export default Header
