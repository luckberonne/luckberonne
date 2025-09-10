import { Component, ReactNode, ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    // Enviar error a servicio de logging
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // También podrías enviar a servicios como Sentry
    // Sentry.captureException(error, { contexts: { react: errorInfo } });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="max-w-md w-full mx-auto p-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Oops! Algo salió mal
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Ha ocurrido un error inesperado. Por favor, intenta recargar la página.
              </p>
              
              {import.meta.env.DEV && this.state.error && (
                <details className="text-left mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded text-sm">
                  <summary className="cursor-pointer font-medium text-gray-700 dark:text-gray-300">
                    Detalles del error
                  </summary>
                  <pre className="mt-2 text-xs text-red-600 dark:text-red-400 overflow-auto">
                    {this.state.error.message}
                    {'\n'}
                    {this.state.error.stack}
                  </pre>
                </details>
              )}

              <div className="space-y-3">
                <button
                  onClick={this.handleReset}
                  className="w-full flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  <RefreshCw size={16} className="mr-2" />
                  Intentar de nuevo
                </button>
                
                <button
                  onClick={() => window.location.reload()}
                  className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded-lg transition-colors"
                >
                  Recargar página
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Error Boundary específico para secciones
export function SectionErrorBoundary({ 
  children, 
  sectionName 
}: { 
  children: ReactNode; 
  sectionName: string; 
}) {
  const fallback = (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <AlertTriangle className="mx-auto text-yellow-500 mb-4" size={32} />
        <h3 className="text-lg font-semibold mb-2">
          Error al cargar {sectionName}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Esta sección no se pudo cargar correctamente.
        </p>
      </div>
    </div>
  );

  return (
    <ErrorBoundary fallback={fallback}>
      {children}
    </ErrorBoundary>
  );
}
