/**
 * Official SVG logos for each framework — optimised inline SVGs.
 * Each returns a self-contained <svg> string to be used with unsafeHTML.
 */
export const FRAMEWORK_LOGOS: Record<string, string> = {

  lit: `<svg viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="20">
    <path d="M80 0L40 80l40-20 40 20L80 0z" fill="#324FFF"/>
    <path d="M40 80L0 160l40-20 40 20L40 80z" fill="#7B95FF"/>
    <path d="M120 80L80 160l40-20 40 20L120 80z" fill="#324FFF"/>
    <path d="M40 80l40-20v80L40 80z" fill="#1A36E8"/>
    <path d="M120 80l-40-20v80l40-20z" fill="#7B95FF"/>
  </svg>`,

  react: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
    <circle cx="12" cy="12" r="2.2" fill="#61DAFB"/>
    <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" stroke-width="1.2" fill="none"/>
    <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" stroke-width="1.2" fill="none" transform="rotate(60 12 12)"/>
    <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" stroke-width="1.2" fill="none" transform="rotate(120 12 12)"/>
  </svg>`,

  vue: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
    <path d="M2 3h4l6 10.5L18 3h4L12 21 2 3z" fill="#42B883"/>
    <path d="M6 3h4l2 3.5L14 3h4l-6 10.5L6 3z" fill="#35495E"/>
  </svg>`,

  angular: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="17" height="17">
    <path d="M12 2.5L2.5 6l1.6 12.5L12 22l7.9-3.5L21.5 6 12 2.5z" fill="#DD0031"/>
    <path d="M12 2.5V22l7.9-3.5L21.5 6 12 2.5z" fill="#C3002F"/>
    <path d="M12 6L7.5 16.5h1.8l.9-2.3h3.6l.9 2.3h1.8L12 6zm1.2 6.8H10.8l1.2-3 1.2 3z" fill="white"/>
  </svg>`,
};
