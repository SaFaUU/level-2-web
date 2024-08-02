import { createRoot } from "react-dom/client"
import App from "../App";

// const App = () => {
//     return React.createElement("h1", {
//         style: {
//             color: "red"
//         }
//     }, "Hello World", HelloWorld(), anotherHello());
// }

// // const HelloWorld = () => {
// //     return <h1>Hello World</h1>
// // }


const root = createRoot(document.getElementById("root"));
root.render(<App />);
// root.render(React.createElement(App));