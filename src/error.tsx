import * as React from "react";
import * as StackTrace from "stacktrace-js";

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
        // You can do absolutely everything with the error from stacktrace.js POST it or console.log it
        StackTrace.fromError(error)
            .then((err) => this.setState({ ...this.state, errorInfo: JSON.stringify(err) }));
    }

    render() {

        if (this.state.hasError) {
            return (
                <div id="error-page">
                    <h1>There has been an error</h1>
                    <p><strong>Stack trace:</strong></p>
                    <p>{this.state.errorInfo ? this.state.errorInfo : "Loading ..."}</p>
                    <a href="/">Go back</a>
                </div>
            )
        }
        else
            return this.props.children;
    }
}