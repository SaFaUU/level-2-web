import "./App.css";
import AnimateHook from "./pages/AnimateHook";
import AnimationControls from "./pages/AnimationControls";
import AnimationControls2 from "./pages/AnimationControls 2";
import Drag from "./pages/Drag";
import Hover from "./pages/Hover";
import InView from "./pages/InView";
import InView2 from "./pages/InView2";
import Keyframe from "./pages/Keyframe";
import Lessor1 from "./pages/Lessor1";
import MotionValues from "./pages/MotionValues";
import ScrollHook from "./pages/ScrollHook";
import TransformHook from "./pages/TransformHook";

function App() {
  const name = "Programming Hero";
  const nameArr = name.split("");

  return (
    <div>
      <div className="h-screen w-screen bg-red-500"></div>
      <div className="h-screen w-screen bg-red-500"></div>
      <div className="main h-screen w-screen flex flex-col justify-center items-center">
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
        {/* <Lessor1 /> */}
        {/* <Hover /> */}
        {/* <Drag /> */}
        {/* <Keyframe /> */}
        {/* <AnimationControls /> */}
        {/* <AnimationControls2 /> */}

        {/* <InView /> */}
        {/* <InView2 /> */}
        {/* <AnimateHook /> */}
        {/* <TransformHook /> */}
        {/* <MotionValues /> */}
        <ScrollHook />
      </div>
    </div>
  );
}

export default App;
