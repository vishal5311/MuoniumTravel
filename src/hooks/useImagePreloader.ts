"use client"
import { useState, useEffect } from 'react'

export const useImagePreloader = (frames: string[]) => {
    const [progress, setProgress] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        let loaded = 0
        if (frames.length === 0) {
            setIsLoaded(true)
            return
        }

        frames.forEach((src) => {
            const img = new Image()
            img.src = src
            img.onload = () => {
                loaded++
                const currentProgress = loaded / frames.length
                setProgress(currentProgress)
                if (loaded === frames.length) {
                    setIsLoaded(true)
                }
            }
            img.onerror = () => {
                loaded++
                if (loaded === frames.length) {
                    setIsLoaded(true)
                }
            }
        });

    }, [frames])

    return { progress, isLoaded }
}
