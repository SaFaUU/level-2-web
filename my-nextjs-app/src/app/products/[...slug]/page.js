import React from 'react';

const page = ({ params }) => {
    console.log(params);
    return (
        <div>
            <h1>This is products page with id: {params.slug}</h1>
        </div>
    );
};

export default page;