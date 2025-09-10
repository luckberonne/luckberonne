// Service Worker registration and management
export class ServiceWorkerManager {
  private static instance: ServiceWorkerManager;
  private registration: ServiceWorkerRegistration | null = null;

  private constructor() {}

  public static getInstance(): ServiceWorkerManager {
    if (!ServiceWorkerManager.instance) {
      ServiceWorkerManager.instance = new ServiceWorkerManager();
    }
    return ServiceWorkerManager.instance;
  }

  public async register(): Promise<ServiceWorkerRegistration | null> {
    if ('serviceWorker' in navigator && 'caches' in window) {
      try {
        console.log('Registering Service Worker...');
        
        this.registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });

        console.log('Service Worker registered:', this.registration);

        // Handle updates
        this.registration.addEventListener('updatefound', () => {
          const newWorker = this.registration?.installing;
          if (newWorker) {
            this.handleWorkerUpdate(newWorker);
          }
        });

        // Check for existing waiting worker
        if (this.registration.waiting) {
          this.showUpdateAvailable();
        }

        // Listen for controller changes
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          window.location.reload();
        });

        return this.registration;
      } catch (error) {
        console.error('Service Worker registration failed:', error);
        return null;
      }
    } else {
      console.warn('Service Worker not supported');
      return null;
    }
  }

  private handleWorkerUpdate(worker: ServiceWorker) {
    worker.addEventListener('statechange', () => {
      if (worker.state === 'installed' && navigator.serviceWorker.controller) {
        this.showUpdateAvailable();
      }
    });
  }

  private showUpdateAvailable() {
    // Mostrar notificación de actualización disponible
    const updateBanner = document.createElement('div');
    updateBanner.className = 'fixed top-0 left-0 right-0 bg-blue-500 text-white p-3 text-center z-50';
    updateBanner.innerHTML = `
      <div class="flex items-center justify-center space-x-4">
        <span>Nueva versión disponible</span>
        <button id="update-btn" class="bg-white text-blue-500 px-4 py-1 rounded font-semibold">
          Actualizar
        </button>
        <button id="dismiss-btn" class="text-white underline">
          Más tarde
        </button>
      </div>
    `;

    document.body.appendChild(updateBanner);

    // Handle update button click
    document.getElementById('update-btn')?.addEventListener('click', () => {
      this.skipWaiting();
      updateBanner.remove();
    });

    // Handle dismiss button click
    document.getElementById('dismiss-btn')?.addEventListener('click', () => {
      updateBanner.remove();
    });
  }

  public async skipWaiting() {
    if (this.registration?.waiting) {
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  }

  public async unregister(): Promise<boolean> {
    if (this.registration) {
      return await this.registration.unregister();
    }
    return false;
  }

  public async clearCaches(): Promise<void> {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(name => caches.delete(name)));
  }

  // Check if app is running from cache (offline)
  public isOffline(): boolean {
    return !navigator.onLine;
  }

  // Add to queue for background sync
  public async addToSyncQueue(data: any): Promise<void> {
    if ('serviceWorker' in navigator && this.registration) {
      try {
        // Cast to any to handle sync API
        const registration = this.registration as any;
        if (registration.sync) {
          await registration.sync.register('background-sync-analytics');
        }
        // Store data in IndexedDB for later sync
        this.storeForSync(data);
      } catch (error) {
        console.error('Background sync registration failed:', error);
      }
    }
  }

  private storeForSync(data: any): void {
    // Simple implementation - could use IndexedDB for complex cases
    const queue = JSON.parse(localStorage.getItem('sync-queue') || '[]');
    queue.push({ data, timestamp: Date.now() });
    localStorage.setItem('sync-queue', JSON.stringify(queue));
  }
}

// Hook para usar Service Worker
export function useServiceWorker() {
  const swManager = ServiceWorkerManager.getInstance();

  return {
    register: () => swManager.register(),
    unregister: () => swManager.unregister(),
    clearCaches: () => swManager.clearCaches(),
    isOffline: () => swManager.isOffline(),
    addToSyncQueue: (data: any) => swManager.addToSyncQueue(data),
  };
}
