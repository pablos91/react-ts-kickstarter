import * as React from "react";

export class ErrorBoundary extends React.Component<{}, { hasError: boolean, errorInfo: string }> {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorInfo: "" };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        //logErrorToMyService(error, errorInfo);
        this.setState({ hasError: this.state.hasError, errorInfo: errorInfo });
        console.log(JSON.stringify(errorInfo))
    }

    render() {

        if (this.state.hasError) {
            return (
                <div id="error-page">
                    <h1>There has been an error</h1>
                    <p>{JSON.stringify(this.state.errorInfo)}</p>
                    <a href="/">Go back</a>
                </div>
            )
        }
        else
            return this.props.children;
    }
}