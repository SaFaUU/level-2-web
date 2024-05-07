import Image from 'next/image';
import React from 'react';
import nextImage from '../../assets/a.jpg'

const GalleryPage = () => {
    return (
        <div>
            <h1 className='text-3xl font-bold text-center'>Image Optimizations</h1>
            <h2 className='text-2xl font-bold text-center'>Regular Image Tag</h2>
            {/* <img className='mx-auto' width={500}
                height={500} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQORGEmYT8DmvsfERmKiCWmQLpxORnrdRyHIlikH9U48g&s" alt="" /> */}
            <h2 className='text-2xl font-bold text-center'>Next JS Image Tag</h2>
            <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQORGEmYT8DmvsfERmKiCWmQLpxORnrdRyHIlikH9U48g&s"
                alt="Picture of the author"
                width={500}
                height={500}
                className='mx-auto'
            />
            <Image src={nextImage} alt="Picture of the author" width={500} height={500} className='mx-auto' />
        </div>
    );
};

export default GalleryPage;