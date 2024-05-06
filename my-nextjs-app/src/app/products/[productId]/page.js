import React from 'react';

const page = ({ params, searchParams }) => {
    console.log(params);
    return (
        <div>
            <h1>This a dynamic product page with id: {params.productId} and search params: {searchParams.category}</h1>
        </div>
    );
};

export default page;