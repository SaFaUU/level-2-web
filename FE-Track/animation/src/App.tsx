import "./App.css";
import Lessor1 from "./pages/Lessor1";

function App() {
  const name = "Programming Hero";
  const nameArr = name.split("");

  return (
    <div className="main">
      {/* <div className="box"></div> */}
      {/* {/* <div className="box-1"></div> */}
      {/* <div className="box-2"></div> */}
      {/* <h1>Something Cool</h1> */}
      {/* <button className="btn">Hover me</button> */}

      {/* <div className="loading">
        <div className="glass"></div>
        <div className="box"></div>
      </div> */}
      {/* <div className="card">
        <h1>Heading</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
          deserunt odit dolorem totam culpa animi illum eaque dicta vitae cumque
          impedit earum, optio, dolore sed, itaque autem reprehenderit quo sunt!
        </p>
      </div> */}
      {/* <div className="container">
        {nameArr.map((char, index) => (
          <span
            key={index}
            className="alphabet"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            {char}
          </span>
        ))}
      </div> */}
      <Lessor1 />
    </div>
  );
}

export default App;
