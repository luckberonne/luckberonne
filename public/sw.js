const CACHE_NAME = 'lucas-beronne-portfolio-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Recursos estáticos para cachear
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/index.css',
  '/favicon.svg',
  '/manifest.json',
  // Añadir más recursos estáticos según necesidad
];

// Recursos que se cachean dinámicamente
const DYNAMIC_ASSETS_PATTERNS = [
  /^https:\/\/fonts\.googleapis\.com/,
  /^https:\/\/fonts\.gstatic\.com/,
  /^https:\/\/images\.unsplash\.com/,
  /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Installed');
        return self.skipWaiting();
      })
  );
});

// Activar Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Interceptar requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome-extension and other protocols
  if (!url.protocol.startsWith('http')) return;

  event.respondWith(
    handleRequest(request)
  );
});

async function handleRequest(request) {
  const url = new URL(request.url);
  
  // Strategy: Cache First para assets estáticos
  if (STATIC_ASSETS.some(asset => url.pathname === asset) || 
      url.pathname.match(/\.(js|css|woff2?|ttf|eot)$/)) {
    return cacheFirst(request, STATIC_CACHE);
  }

  // Strategy: Stale While Revalidate para imágenes
  if (DYNAMIC_ASSETS_PATTERNS.some(pattern => pattern.test(request.url))) {
    return staleWhileRevalidate(request, DYNAMIC_CACHE);
  }

  // Strategy: Network First para HTML y API calls
  if (url.pathname === '/' || request.headers.get('Accept')?.includes('text/html')) {
    return networkFirst(request, DYNAMIC_CACHE);
  }

  // Default: Network First
  return networkFirst(request, DYNAMIC_CACHE);
}

// Cache First Strategy
async function cacheFirst(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    if (cached) {
      return cached;
    }

    const response = await fetch(request);
    
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.error('Cache First failed:', error);
    return new Response('Network error', { status: 408 });
  }
}

// Network First Strategy
async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    
    if (response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    console.error('Network first failed, trying cache:', error);
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    if (cached) {
      return cached;
    }
    
    return new Response('Offline - No cached version available', { 
      status: 408,
      statusText: 'Network error' 
    });
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    // Fetch in background
    const fetchPromise = fetch(request).then(response => {
      if (response.status === 200) {
        cache.put(request, response.clone());
      }
      return response;
    });

    // Return cached version immediately if available
    if (cached) {
      // Update cache in background
      fetchPromise.catch(err => console.error('Background fetch failed:', err));
      return cached;
    }

    // If no cache, wait for network
    return await fetchPromise;
  } catch (error) {
    console.error('Stale while revalidate failed:', error);
    return new Response('Network error', { status: 408 });
  }
}

// Background sync for analytics
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync-analytics') {
    event.waitUntil(syncAnalytics());
  }
});

async function syncAnalytics() {
  // Implementar sincronización de analytics offline
  console.log('Syncing analytics data...');
}
