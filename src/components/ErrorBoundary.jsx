import React from "react";
import PropTypes from "prop-types";
import { AlertTriangle, RefreshCcw } from "lucide-react";

/**
 * ErrorBoundary — A class-based React component that catches JavaScript
 * errors anywhere in its child component tree and displays a fallback UI.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  /**
   * Updates state so the next render will show the fallback UI.
   * @param {Error} error - The error that was thrown.
   * @returns {object} Updated state object.
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  /**
   * Logs error information to the console or an external service.
   * @param {Error} error - The error that was thrown.
   * @param {object} errorInfo - An object with a componentStack key.
   */
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  /**
   * Resets the error state to attempt re-rendering the child tree.
   */
  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Premium Glassmorphic Fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#06101d] px-6">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full"></div>
          </div>

          <div className="glass-panel p-10 max-w-lg w-full text-center relative z-10 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 text-red-500 mb-6">
              <AlertTriangle size={40} />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-gradient">Something went wrong</h1>
            <p className="text-muted mb-8 leading-relaxed">
              Our AI assistant ran into an unexpected glitch. Don't worry, your democratic guide is still safe. Please try refreshing the page.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={this.handleReset}
                className="btn btn-primary flex items-center justify-center gap-2"
              >
                <RefreshCcw size={18} />
                <span>Refresh Page</span>
              </button>
              <a 
                href="/"
                className="btn btn-secondary"
              >
                Return to Home
              </a>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 p-4 bg-black/30 rounded-lg text-left overflow-auto max-h-40">
                <code className="text-xs text-red-400">
                  {this.state.error && this.state.error.toString()}
                </code>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  /** The child components to be wrapped and monitored for errors. */
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
