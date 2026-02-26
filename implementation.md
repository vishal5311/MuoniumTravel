# implementation_plan.md

## Muonium Travel Company — Luxury Cinematic Website

**Architecture Blueprint (Next.js 14 · TypeScript · Canvas Scroll · Razorpay)**
Design System inspired by high-end aviation minimalism (Jesko Jets pattern) merged with ultra-luxury travel aesthetics (Aman / Four Seasons tone).

---

# 1. PROJECT OVERVIEW

Muonium Travel Company is a cinematic luxury travel website built using:

* **Next.js 14 (App Router)**
* **TypeScript**
* **Tailwind CSS**
* **Framer Motion**
* **Lenis Smooth Scroll**
* **React Hook Form + Zod**
* **Razorpay Payments**

Core Experience:

* Scroll-driven cinematic storytelling using **JPEG sequences on canvas**
* Seamless interior → pier → villa transitions
* Global luxury travel positioning
* Fully functional booking + payment flow

---

# 2. PROJECT FILE STRUCTURE

```
/app
  /layout.tsx
  /page.tsx
  /globals.css

  /booking
    /page.tsx

/components
  Header.tsx
  HeroScroll.tsx
  VillaTransition.tsx
  DestinationGlobe.tsx
  DestinationsGrid.tsx
  Experiences.tsx
  Testimonials.tsx
  ContactForm.tsx
  Footer.tsx
  Loader.tsx

/hooks
  useImagePreloader.ts
  useScrollFrame.ts

/lib
  razorpay.ts
  packages.ts
  utils.ts

/types
  index.ts

/public
  /sequence-1/
  /sequence-2/
  globe-loop.mp4
```

---

# 3. GLOBAL STYLING SYSTEM

## Tailwind Configuration

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      primary: "#1FB4B4",
      dark: "#1A1A1A",
      light: "#FFFFFF",
    },
    letterSpacing: {
      luxury: "0.2em",
      wideLuxury: "0.3em",
    },
    fontFamily: {
      serif: ["Cormorant Garamond"],
      sans: ["Inter"],
    },
  },
}
```

---

# 4. GLOBAL LAYOUT (App Router)

## layout.tsx

* Inject Google Fonts
* Initialize Lenis
* Wrap in smooth scroll provider

```tsx
"use client"
import Lenis from '@studio-freight/lenis'
import { useEffect } from 'react'

export default function RootLayout({ children }) {
  useEffect(() => {
    const lenis = new Lenis({ smooth: true })
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  return (
    <html lang="en">
      <body className="bg-white text-dark font-sans">
        {children}
      </body>
    </html>
  )
}
```

---

# 5. HERO SCROLL SECTION (Sequence 1)

## HeroScroll.tsx

Height: `h-[400vh]`
Sticky Canvas
Frame-driven via scroll progress

### Core Logic

```tsx
const frameCount = 180
const currentFrame = (index: number) =>
  `/sequence-1/frame_${index.toString().padStart(4, "0")}.jpg`
```

### Scroll → Frame Mapping

```tsx
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end end"]
})

const springProgress = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30
})

springProgress.on("change", (v) => {
  const frameIndex = Math.floor(v * frameCount)
  renderFrame(frameIndex)
})
```

### Canvas Rendering

* DPR scaling
* requestAnimationFrame
* Image draw

```tsx
canvas.width = window.innerWidth * dpr
canvas.height = window.innerHeight * dpr
ctx.scale(dpr, dpr)
ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
```

---

## Overlay UI

**Headline**

```
WHAT ARE YOU WAITING FOR?
```

Letter spacing: `tracking-wideLuxury`

CTA Button:

```
SCHEDULE
```

Turquoise border hover fill animation using Framer Motion.

Dark gradient overlay:

```css
bg-gradient-to-b from-black/40 to-black/70
```

---

# 6. VILLA TRANSITION (Sequence 2)

Identical logic to HeroScroll.

Height: `h-[300vh]`

Text:

```
YOU DESERVE IT
```

Minimal typography, centered.

---

# 7. DESTINATION GLOBE SECTION

## DestinationGlobe.tsx

```tsx
<video
  src="/globe-loop.mp4"
  autoPlay
  loop
  muted
  playsInline
  className="absolute inset-0 object-cover w-full h-full"
/>
```

Overlay text:

```
THE WORLD IS YOURS
```

Z-index layering:

* Video (z-0)
* Gradient overlay (z-10)
* Text (z-20)

---

# 8. IMAGE PRELOADER HOOK

## useImagePreloader.ts

```tsx
export const useImagePreloader = (frames: string[]) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let loaded = 0
    frames.forEach((src) => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        loaded++
        setProgress(loaded / frames.length)
      }
    })
  }, [])
  
  return progress
}
```

---

# 9. HEADER COMPONENT

Behavior:

* Fixed top
* Transparent initially
* On scroll > 50px:

  * bg-white/80
  * backdrop-blur-lg
  * subtle shadow

Navigation:

* About
* Destinations
* Packages
* Gallery
* Contact
* BOOK NOW (primary CTA)

---

# 10. DESTINATION PACKAGES

## packages.ts

```ts
export const packages = [
  {
    title: "Maldives Private Atoll",
    price: 420000,
    duration: "5 Nights",
    description: "Overwater villas, private yacht, curated dining.",
  },
  {
    title: "Amalfi Coast Escape",
    price: 380000,
    duration: "6 Nights",
    description: "Cliffside villas and Mediterranean cruising.",
  },
  {
    title: "Santorini Sky Retreat",
    price: 350000,
    duration: "4 Nights",
    description: "Caldera views with private infinity pool.",
  },
  {
    title: "Swiss Alpine Chalet",
    price: 460000,
    duration: "7 Nights",
    description: "Heli-ski and private chef.",
  },
  {
    title: "Dubai Desert Royal Camp",
    price: 300000,
    duration: "3 Nights",
    description: "VIP desert safari and starlit dining.",
  },
]
```

Grid:

* 3 columns desktop
* Hover image scale
* Minimal white cards
* Turquoise accent underline animation

---

# 11. EXPERIENCES SECTION

Headline:

```
CURATED EXPERIENCES
```

Content:

* Private Jet Transfers
* Michelin Dining
* Personal Concierge
* Cultural Immersion
* Yacht & Marine Excursions

Subtle fade-in stagger animation using Framer Motion.

---

# 12. TESTIMONIALS

Carousel using Framer Motion + drag.

Sample Copy:

> "Muonium redefined what luxury means to us."
> — Arjun Mehta, Mumbai

> "Every moment felt orchestrated to perfection."
> — Sofia Laurent, Paris

---

# 13. CONTACT FORM

## Validation

```ts
const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})
```

React Hook Form + Zod Resolver.

Fields:

* Name
* Email
* Destination Interest
* Travel Dates
* Message

Luxury micro-interactions:

* Focus underline animation
* Turquoise accent on submit

---

# 14. BOOKING FLOW + RAZORPAY

## Flow

1. Select Package
2. Choose Dates
3. Enter Details
4. Razorpay Checkout
5. Success page

---

## razorpay.ts

```ts
export const initiatePayment = async (amount: number) => {
  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
    amount: amount * 100,
    currency: "INR",
    name: "Muonium Travel Company",
    description: "Luxury Travel Booking",
    handler: function (response: any) {
      console.log(response)
    },
  }

  const rzp = new (window as any).Razorpay(options)
  rzp.open()
}
```

---

# 15. PERFORMANCE STRATEGY

* Lazy load heavy components
* Dynamic imports for canvas sections
* Preload first 20 frames immediately
* Defer remaining frames
* Compress sequences to <200kb per frame
* Use WebP if possible

---

# 16. MOBILE STRATEGY

* Replace 400vh scroll with 200vh
* Reduce frame count
* Disable heavy DPR scaling on low devices
* Touch-optimized interactions

---

# 17. SEO STRATEGY

* Metadata API in Next 14
* OpenGraph tags
* JSON-LD structured data for travel packages

---

# 18. FINAL USER EXPERIENCE FLOW

1. Cinematic hero scroll
2. Emotional villa transition
3. Global luxury positioning
4. Destination showcase
5. Experiences
6. Testimonials
7. Booking CTA
8. Contact

---

# 19. LUXURY COPYWRITING (Ready to Use)

Hero:

> What are you waiting for?

Sub:

> The world’s most exclusive destinations, curated for the few who expect more.

Packages Headline:

> PRIVATE JOURNEYS, TAILORED FOR YOU

Experiences:

> Every moment designed. Every detail considered.

Contact:

> Let us craft your next unforgettable escape.

---

# 20. BUILD SEQUENCE FOR CODING AGENT

1. Setup Next.js 14 + Tailwind
2. Implement Layout + Header
3. Build useImagePreloader
4. Build HeroScroll canvas
5. Build VillaTransition
6. Add Globe video section
7. Build Destinations grid
8. Build Booking + Razorpay
9. Add Contact Form
10. Optimize performance
11. Final polish animations

---

# RESULT

A cinematic, scroll-driven, ultra-luxury travel website combining:

* Aviation-inspired minimalism
* Aman-level sophistication
* Smooth immersive storytelling
* Fully functional booking engine
