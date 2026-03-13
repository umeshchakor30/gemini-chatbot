import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

import Loader from "./Loader";
import Response from "./Response";

function App() {
  const [question, setQuestion] = useState("");
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoader(true);
    const response = await fetch(`http://localhost:8000/ask`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question,
      }),
    });
    const data = await response.json();
    setLoader(false);
    data?._status ? setData(data.finalData) : null; // Set a state here
  };

  return (
    <div>
      <h1 className="text-blue-600 dark:text-sky-400 text-center font-bold text-4xl shadow-xl h-32 text-shadow-2xs align-middle">
        Gemimi AI Chat Bot
      </h1>
      <div className="shadow-lg mt-15">
        <div className="max-w-[1320px] mx-auto grid grid-cols-[30%_auto] gap-5 p-5 border-amber-50 border-2 border-soli">
          <form onSubmit={handleSubmit} className="shadow-lg py-4">
            <textarea
              name=""
              id=""
              className="w-[100%] h-[200px] bottom-1 p-3"
              onChange={(event) => setQuestion(event.target.value)}
              value={question}
              placeholder="Please Enter How Can I Help You?"
            ></textarea>

            <button className="bg-amber-900 text-white w-[100%]  py-4">
              How Can I Help You?
            </button>
          </form>
          <div className="border-l-1">
            <article className="h-auto object-contain p-5">
              {loader ? <Loader /> : <Response data={data}></Response>}
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
