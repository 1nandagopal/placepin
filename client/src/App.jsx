import { Route, Routes } from "react-router-dom";
import Places from "./routes/Places";
import Auth from "./routes/Auth";
import NewPlace from "./routes/NewPlace";

function App() {
  return (
    <main className="bg-gray-900 h-screen text-white p-8 overflow-auto">
      <Routes>
        {/* <Route path="/" element={<Places />} /> */}
        <Route path="/new" element={<Places />} />
        <Route path="/" element={<NewPlace />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </main>
  );
}

export default App;
