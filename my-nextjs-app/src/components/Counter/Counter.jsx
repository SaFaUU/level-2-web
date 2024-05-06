"use client";
import React, { useState } from 'react';

const Counter = () => {
    const [counter, setCounter] = useState(0);
    return (
        <div>
            <p className='text-3xl text-center'>{counter}</p>
            <div className="flex justify-center gap-4">
                <button
                    className="btn btn-accent"
                    onClick={() => setCounter(counter + 1)}
                >
                    Increment
                </button>
                <button
                    className="btn btn-accent"
                    onClick={() => setCounter(counter - 1)}
                >
                    Decrement
                </button>
            </div>
        </div>
    );
};

export default Counter;