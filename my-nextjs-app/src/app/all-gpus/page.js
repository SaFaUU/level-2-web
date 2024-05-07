import React from 'react';

const page = async () => {
    const res = await fetch("http://localhost:5000/gpus", {
        cache: "no-store"
    })
    const gpus = await res.json()

    return (
        <div>
            <h1 className="text-3xl font-bold text-center">All GPUs</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 px-6 pt-5">
                {
                    gpus.map(gpu =>
                        <div className="card w-96 bg-base-100 shadow-xl" key={gpu.id}>
                            <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {gpu.title}
                                    <div className="badge badge-secondary">{gpu.price}</div>
                                </h2>
                                <p>{gpu.description}</p>
                                <div className="card-actions justify-end">
                                    <div className="btn btn-primary">Buy Now</div>
                                    <div className="btn btn-ghost">Details</div>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default page;