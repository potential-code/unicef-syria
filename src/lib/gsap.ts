import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// The only place ScrollTrigger is registered. Import gsap and ScrollTrigger from here.
gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
