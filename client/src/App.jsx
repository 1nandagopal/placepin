import { Route, Routes } from "react-router-dom";
import Places from "./routes/Places";
import Auth from "./routes/Auth";

function App() {
  return (
    <main className="bg-gray-900 h-screen text-white p-8 overflow-auto">
      <Routes>
        {/* <Route path="/" element={<Places />} /> */}
        <Route path="/" element={<Auth />} />
      </Routes>
    </main>
  );
}

export default App;
