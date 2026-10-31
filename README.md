# Prathvi S Jathan — Portfolio

A high-performance "Signal HUD" developer portfolio built with React 19, Vite, and technical motion graphics.

**Live site:** https://prathvi-s-jathan-portfolio.vercel.app/

Built during the placement training program at [TAP Academy](https://thetapacademy.com/) (full-stack development, AI and augmented reality training).

---

## Tech Stack

- **React 19** — Component architecture & state management
- **Vite** — High-speed build tooling and native ESM bundling
- **Tailwind CSS 4** — Modern utility styling with `@theme` token customization
- **GSAP & ScrollTrigger** — High-fidelity scroll animations, pin-scrubbing, and decode transitions
- **Lenis** — Hardware-accelerated smooth scrolling coordinated with GSAP's shared animation ticker
- **Three.js** — Interactive 3D signal core centerpiece with cursor-drag rotation and dynamic geometry
- **EmailJS** — Direct client-side message dispatching with seamless fallback capabilities

---

## Run Locally

Clone the repository and install dependencies:

```bash
git clone https://github.com/Prathvi-Jathan/portfolio.git
cd portfolio
npm install
```

Start the local development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run code quality lint checks:

```bash
npm run lint
```

---

## Environment Variables

To enable contact form submissions via EmailJS, create a `.env.local` file in the project root:

```bash
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

*(If these variables are omitted, the form automatically falls back to native mail client delivery.)*
