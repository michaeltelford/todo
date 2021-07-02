import React from 'react';
import Header from './Header';
import Error from './Error';

// Top level error boundary that catches the error and displays a generic error UI.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  // Update state so the next render will show the fallback UI.
  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <>
          <Header />
          <Error />
        </>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
