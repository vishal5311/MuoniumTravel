"use client"
import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useImagePreloader } from '@/hooks/useImagePreloader'

const frameCount = 242
const getFramePath = (index: number) =>
    `/frames/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`

const HeroScroll = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [images, setImages] = useState<HTMLImageElement[]>([])
    const frames = Array.from({ length: frameCount }, (_, i) => getFramePath(i))
    const { isLoaded, progress } = useImagePreloader(frames)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    useEffect(() => {
        // Pre-load images into memory for smooth canvas drawing
        const loadImages = () => {
            const loadedImages: HTMLImageElement[] = []
            let count = 0

            frames.forEach((src, i) => {
                const img = new Image()
                img.src = src
                img.onload = () => {
                    loadedImages[i] = img
                    count++
                    if (count === frameCount) {
                        setImages(loadedImages)
                    }
                }
            })
        }

        if (isLoaded) {
            loadImages()
        }
    }, [isLoaded])

    useEffect(() => {
        const render = () => {
            if (!canvasRef.current || images.length < frameCount) return

            const ctx = canvasRef.current.getContext('2d')
            if (!ctx) return

            const frameIndex = Math.min(
                frameCount - 1,
                Math.floor(scrollYProgress.get() * frameCount)
            )

            const img = images[frameIndex]
            if (!img) return

            // Handle resize and drawing
            const canvas = canvasRef.current
            const hRatio = canvas.width / img.width
            const vRatio = canvas.height / img.height
            const ratio = Math.max(hRatio, vRatio)
            const centerShift_x = (canvas.width - img.width * ratio) / 2
            const centerShift_y = (canvas.height - img.height * ratio) / 2

            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(
                img,
                0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
            )
        }

        const unsubscribe = scrollYProgress.on("change", render)

        // Initial render
        window.addEventListener('resize', handleResize)
        handleResize()
        render()

        return () => {
            unsubscribe()
            window.removeEventListener('resize', handleResize)
        }
    }, [images])

    const handleResize = () => {
        if (canvasRef.current) {
            const canvas = canvasRef.current
            canvas.width = window.innerWidth * window.devicePixelRatio
            canvas.height = window.innerHeight * window.devicePixelRatio
            // Clear and re-render would happen on next progress change or manual call
        }
    }

    // Text Animations
    const titleOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0])
    const titleScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

    const midTextOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0])
    const endTextOpacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1])

    return (
        <div ref={containerRef} className="relative h-[600vh] bg-dark">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {!isLoaded ? (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-dark text-white font-serif">
                        <div className="text-center">
                            <h2 className="text-4xl mb-4 tracking-widest uppercase">Muonium</h2>
                            <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress * 100}%` }}
                                />
                            </div>
                            <p className="mt-4 text-xs tracking-[0.5em] opacity-50 uppercase">Loading Experience</p>
                        </div>
                    </div>
                ) : null}

                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover"
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                />

                {/* Overlays */}
                <motion.div
                    style={{ opacity: titleOpacity, scale: titleScale }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4"
                >
                    <h1 className="text-6xl md:text-9xl font-serif tracking-widest uppercase mb-4">
                        Muonium
                    </h1>
                    <p className="text-sm md:text-lg tracking-[0.8em] uppercase opacity-80">
                        Journey Beyond Limits
                    </p>
                </motion.div>

                <motion.div
                    style={{ opacity: midTextOpacity }}
                    className="absolute inset-0 flex items-center justify-center text-white text-center px-4"
                >
                    <h2 className="text-4xl md:text-6xl font-serif tracking-widest uppercase max-w-4xl">
                        Redefining Ultra-Luxury
                    </h2>
                </motion.div>

                <motion.div
                    style={{ opacity: endTextOpacity }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4"
                >
                    <h2 className="text-4xl md:text-6xl font-serif tracking-widest uppercase mb-8">
                        Your Private Escape Awaits
                    </h2>
                    <button className="px-12 py-4 border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-500 tracking-[0.3em] uppercase text-sm">
                        Schedule a Consultation
                    </button>
                </motion.div>

                {/* Gradient shadow at bottom */}
                <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
            </div>
        </div>
    )
}

export default HeroScroll
