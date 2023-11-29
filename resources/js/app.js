import {
    Livewire,
    Alpine,
} from '../../vendor/livewire/livewire/dist/livewire.esm'
import './fonts'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away-subtle.css'
import autoAnimate from '@formkit/auto-animate'
import Tooltip from '@ryangjchandler/alpine-tooltip'
import dayjs from 'dayjs'
import NProgress from 'nprogress'

// Day.js
window.dayjs = dayjs

// AutoAnimate
window.autoAnimate = autoAnimate

// Asset loading
import.meta.glob(['../images/**', '../svg/**'])

// GSAP
gsap.registerPlugin(ScrollTrigger)
window.ScrollTrigger = ScrollTrigger
window.gsap = gsap
window.reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
).matches

Alpine.plugin(Tooltip)

Livewire.start()

// Nprogress
NProgress.configure({
    showSpinner: false,
    minimum: 0.2,
    trickleSpeed: 200
})

Livewire.hook('commit', ({ component, commit, respond, succeed, fail }) => {
    NProgress.start()

    succeed(({ snapshot, effect }) => {
        queueMicrotask(() => {
            NProgress.done(true)
            NProgress.remove()
        })
    })
})