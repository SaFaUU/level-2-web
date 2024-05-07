import Counter from "@/components/Counter/Counter";

export const metadata = {
  title: "Homepage",
  description: "Generated by create next app",
};


const page = async () => {

  const res = await fetch('http://localhost:5000/gpus', {
    next: {
      revalidate: 5
    }
  })
  const gpus = await res.json()

  throw new Error("Error from Homepage")

  return (
    <div>
      <p className='text-3xl text-center '>Hello World</p>
      {/* <Counter /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 px-5">
        {
          gpus.slice(0, 3).map((gpu) => {
            return (
              <div className="card w-96 bg-base-100 shadow-xl" key={gpu.id}>
                <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                <div className="card-body">
                  <h2 className="card-title">{gpu.title}</h2>
                  <p>{gpu.description}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                    <button className="btn btn-primary">{gpu.price}</button>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default page;