"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    interest: z.string().min(1, "Please select an interest"),
    message: z.string().min(10, "Message must be at least 10 characters")
})

type FormData = z.infer<typeof schema>

const ContactForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const onSubmit = (data: FormData) => {
        console.log(data)
        alert("Inquiry Sent. Our concierge will contact you shortly.")
    }

    return (
        <section id="contact" className="py-32 px-6 md:px-24 bg-white">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24">
                <div className="lg:w-1/2">
                    <span className="text-primary text-xs tracking-[0.5em] uppercase mb-4 block">Get In Touch</span>
                    <h2 className="text-4xl md:text-6xl font-serif uppercase tracking-tight mb-8">
                        Let us craft your next <span className="italic text-primary">escape</span>.
                    </h2>
                    <p className="text-dark/60 text-sm leading-relaxed max-w-md mb-12">
                        Our private concierge team is ready to design a bespoke journey tailored to your exact specifications.
                    </p>

                    <div className="space-y-6">
                        <div>
                            <p className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-1">Global HQ</p>
                            <p className="text-sm tracking-widest uppercase">Mumbai • London • Dubai</p>
                        </div>
                        <div>
                            <p className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-1">Email</p>
                            <p className="text-sm tracking-widest uppercase">concierge@muonium.travel</p>
                        </div>
                    </div>
                </div>

                <div className="lg:w-1/2 bg-dark p-8 md:p-12 text-white">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="relative">
                                <input
                                    {...register("name")}
                                    placeholder="Name"
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-xs tracking-[0.3em] uppercase focus:border-primary outline-none transition-colors placeholder:text-white/20"
                                />
                                {errors.name && <p className="text-[8px] text-red-500 mt-2 uppercase tracking-widest">{errors.name.message}</p>}
                            </div>
                            <div className="relative">
                                <input
                                    {...register("email")}
                                    placeholder="Email"
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-xs tracking-[0.3em] uppercase focus:border-primary outline-none transition-colors placeholder:text-white/20"
                                />
                                {errors.email && <p className="text-[8px] text-red-500 mt-2 uppercase tracking-widest">{errors.email.message}</p>}
                            </div>
                        </div>

                        <div className="relative">
                            <select
                                {...register("interest")}
                                className="w-full bg-transparent border-b border-white/20 py-4 text-xs tracking-[0.3em] uppercase focus:border-primary outline-none transition-colors appearance-none"
                            >
                                <option value="" className="bg-dark">Interested In</option>
                                <option value="villas" className="bg-dark">Private Villas</option>
                                <option value="aviation" className="bg-dark">Private Aviation</option>
                                <option value="yachts" className="bg-dark">Yacht Charters</option>
                                <option value="all" className="bg-dark">Full Bespoke Package</option>
                            </select>
                            {errors.interest && <p className="text-[8px] text-red-500 mt-2 uppercase tracking-widest">{errors.interest.message}</p>}
                        </div>

                        <div className="relative">
                            <textarea
                                {...register("message")}
                                rows={4}
                                placeholder="Your Message / Preferences"
                                className="w-full bg-transparent border-b border-white/20 py-4 text-xs tracking-[0.3em] uppercase focus:border-primary outline-none transition-colors placeholder:text-white/20 resize-none"
                            />
                            {errors.message && <p className="text-[8px] text-red-500 mt-2 uppercase tracking-widest">{errors.message.message}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-5 border border-primary text-primary text-xs tracking-[0.5em] uppercase hover:bg-primary hover:text-white transition-all duration-500"
                        >
                            Send Inquiry
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ContactForm
