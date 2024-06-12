import { Route, Routes } from "react-router-dom";
import Places from "./routes/Places";

function App() {
  return (
    <main className="bg-gray-900 h-screen text-white p-8 overflow-auto">
      <Routes>
        <Route path="/" element={<Places />} />
      </Routes>
    </main>
  );
}

export default App;
