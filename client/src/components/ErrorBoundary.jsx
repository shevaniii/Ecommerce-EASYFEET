 import React from 'react';
 
 class ErrorBoundary extends React.Component {
   constructor(props) {
     super(props);
     this.state = { hasError: false, error: null, errorInfo: null };
   }
 
   static getDerivedStateFromError(error) {
     return { hasError: true };
   }
 
   componentDidCatch(error, errorInfo) {
     this.setState({
       error: error,
       errorInfo: errorInfo
     });
     
     // Log error to console for debugging
     console.error('Error caught by boundary:', error);
     console.error('Error info:', errorInfo);
   }
 render() {
     if (this.state.hasError) {
       return (
         <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
           <div className="text-center max-w-md">
             <h2 className="text-3xl font-bold text-red-500 mb-4">
               🚫 Something went wrong
             </h2>
             <p className="text-gray-300 mb-6">
               We encountered an unexpected error. Please try refreshing the page.
             </p>
             <button
               onClick={() => window.location.reload()}
               className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded transition"
             >
               Refresh Page
             </button>
             {process.env.NODE_ENV === 'development' && (
               <details className="mt-6 text-left bg-gray-900 p-4 rounded">
                 <summary className="cursor-pointer text-red-300 mb-2">
                   Error Details (Development)
                 </summary>
                 <pre className="text-xs text-gray-400 whitespace-pre-wrap">
                   {this.state.error && this.state.error.toString()}
                   <br />
                   {this.state.errorInfo.componentStack}
                 </pre>
               </details>
             )}
           </div>
         </div>
       );  }
 
     return this.props.children;
   }
 }
 
 export default ErrorBoundary;