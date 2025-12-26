/* ========================================
   PERFORMANCE OPTIMIZATIONS
   Add this to your HTML files before </body>
   ======================================== */

// Lazy Loading Images
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
});

// Smooth Scroll Polyfill for older browsers
if (!("scrollBehavior" in document.documentElement.style)) {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId !== "#") {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
}

// Performance Monitoring
if ("PerformanceObserver" in window) {
  // Monitor Largest Contentful Paint (LCP)
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log("LCP:", lastEntry.renderTime || lastEntry.loadTime);
  });
  lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

  // Monitor First Input Delay (FID)
  const fidObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      console.log("FID:", entry.processingStart - entry.startTime);
    });
  });
  fidObserver.observe({ entryTypes: ["first-input"] });

  // Monitor Cumulative Layout Shift (CLS)
  let clsScore = 0;
  const clsObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (!entry.hadRecentInput) {
        clsScore += entry.value;
        console.log("CLS:", clsScore);
      }
    });
  });
  clsObserver.observe({ entryTypes: ["layout-shift"] });
}

// Defer non-critical CSS
function loadCSS(href) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.media = "print";
  link.onload = function () {
    this.media = "all";
  };
  document.head.appendChild(link);
}

// Load external fonts with font-display: swap
if ("fonts" in document) {
  document.fonts.ready.then(() => {
    console.log("Fonts loaded");
  });
}

// Service Worker for offline support (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('/sw.js')
    //     .then(registration => console.log('SW registered:', registration))
    //     .catch(err => console.log('SW registration failed:', err));
  });
}

// Reduce motion for users who prefer it
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);
if (prefersReducedMotion.matches) {
  document.documentElement.style.setProperty("--transition-fast", "0.01s");
  document.documentElement.style.setProperty("--transition-normal", "0.01s");
  document.documentElement.style.setProperty("--transition-slow", "0.01s");
}

// Prefetch links on hover for faster navigation
const links = document.querySelectorAll('a[href^="/"], a[href^="./"]');
links.forEach((link) => {
  link.addEventListener(
    "mouseenter",
    () => {
      const prefetchLink = document.createElement("link");
      prefetchLink.rel = "prefetch";
      prefetchLink.href = link.href;
      document.head.appendChild(prefetchLink);
    },
    { once: true }
  );
});

// Critical Web Vitals reporting (Google Analytics integration)
function sendToAnalytics(metric) {
  // Send to your analytics service
  console.log("Metric:", metric);

  // Example: Google Analytics
  // gtag('event', metric.name, {
  //     value: Math.round(metric.value),
  //     metric_id: metric.id,
  //     metric_value: metric.value,
  //     metric_delta: metric.delta,
  // });
}

// Web Vitals library integration (add web-vitals library first)
// <script src="https://unpkg.com/web-vitals@3/dist/web-vitals.iife.js"></script>
if (typeof webVitals !== "undefined") {
  webVitals.getCLS(sendToAnalytics);
  webVitals.getFID(sendToAnalytics);
  webVitals.getLCP(sendToAnalytics);
  webVitals.getFCP(sendToAnalytics);
  webVitals.getTTFB(sendToAnalytics);
}

// Optimize animations with requestAnimationFrame
function optimizedAnimation(callback) {
  let ticking = false;

  return function () {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        callback.apply(this, arguments);
        ticking = false;
      });
      ticking = true;
    }
  };
}

// Example: Optimize scroll event
let lastScrollY = window.scrollY;
const optimizedScroll = optimizedAnimation(() => {
  // Your scroll logic here
  lastScrollY = window.scrollY;
});
window.addEventListener("scroll", optimizedScroll, { passive: true });

// Resource Hints
function addResourceHints() {
  // DNS Prefetch
  const dnsPrefetch = [
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
    "https://www.google-analytics.com",
  ];

  dnsPrefetch.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "dns-prefetch";
    link.href = url;
    document.head.appendChild(link);
  });

  // Preconnect
  const preconnect = [
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
  ];

  preconnect.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = url;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  });
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", addResourceHints);

console.log("Performance optimizations loaded ✅");
