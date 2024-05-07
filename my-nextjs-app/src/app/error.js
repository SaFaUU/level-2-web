"use client";

const ErrorPage = ({ error, reset }) => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-3xl font-bold text-center">Something Went Wrong</h1>

            <p>{error.message}</p>
            <button onClick={() => reset()}>Try Again</button>
        </div>
    );
};

export default ErrorPage;