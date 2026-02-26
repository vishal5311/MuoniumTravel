"use client"
import React from 'react'
import { motion } from 'framer-motion'

const experiences = [
    { title: "Private Jets", desc: "Seamless global transfers", icon: "✈️" },
    { title: "Michelin Dining", desc: "Culinary excellence anywhere", icon: "🍽️" },
    { title: "Elite Concierge", desc: "24/7 dedicated assistance", icon: "🎩" },
    { title: "Marine Charter", desc: "Luxury yacht excursions", icon: "🛥️" },
]

const Experiences = () => {
    return (
        <section id="experiences" className="bg-dark py-32 px-6 md:px-24 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-24">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.5 }}
                        className="text-primary text-xs tracking-[0.8em] uppercase mb-6 block"
                    >
                        The Muonium Standard
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-4xl md:text-7xl font-serif uppercase tracking-[0.2em]"
                    >
                        Curated <span className="text-primary">Life</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: i * 0.15 }}
                            viewport={{ once: true }}
                            className="group flex flex-col items-center text-center"
                        >
                            <div className="text-4xl mb-8 group-hover:scale-125 transition-transform duration-500 hover:rotate-12 cursor-default">
                                {exp.icon}
                            </div>
                            <h3 className="text-xl font-serif uppercase tracking-widest mb-4">{exp.title}</h3>
                            <p className="text-xs tracking-widest uppercase opacity-40 leading-loose">
                                {exp.desc}
                            </p>
                            <div className="mt-8 w-0 group-hover:w-12 h-[1px] bg-primary transition-all duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Experiences
