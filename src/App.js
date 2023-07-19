import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
export default function App() {
  const initialState = {
    questions: [],

    // 'loading', "error", "ready", "active","finished"
    status: "loading",
  };
  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return { ...state, question: action.payload, status: "ready" };

      default:
        break;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => console.log("Error"));
  }, []);
  return (
    <div className="app">
      <Header />

      <Main>
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  );
}
