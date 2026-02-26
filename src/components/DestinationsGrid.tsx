"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { packages } from '@/lib/packages'

const DestinationsGrid = () => {
    return (
        <section id="destinations" className="py-32 px-6 md:px-24 bg-white">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
                >
                    <div className="max-w-2xl">
                        <span className="text-primary text-xs tracking-[0.5em] uppercase mb-4 block">Our Portfolio</span>
                        <h2 className="text-4xl md:text-6xl font-serif uppercase tracking-tight leading-tight">
                            Curated Destinations <br /> For The Extraordinary
                        </h2>
                    </div>
                    <p className="text-dark/60 max-w-sm text-sm leading-relaxed mb-2">
                        From private atolls in the Maldives to secluded chalets in the Swiss Alps, we provide access to the world's most exclusive properties.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {packages.map((pkg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden mb-6">
                                <img
                                    src={pkg.img}
                                    alt={pkg.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />

                                {/* Overlay with details on hover */}
                                <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <button className="w-full py-3 bg-white text-dark text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-primary hover:text-white transition-colors duration-300">
                                        Explore Details
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-serif uppercase tracking-widest mb-1">{pkg.title}</h3>
                                    <p className="text-[10px] tracking-[0.2em] uppercase text-dark/40">{pkg.duration}</p>
                                </div>
                                <p className="text-[10px] tracking-[0.1em] uppercase text-primary font-bold">INR {(pkg.price / 1000).toFixed(0)}K</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default DestinationsGrid
