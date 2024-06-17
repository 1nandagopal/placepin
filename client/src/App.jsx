import { Route, Routes } from "react-router-dom";
import Places from "./routes/Places";
import Auth from "./routes/Auth";
import NewPlace from "./routes/NewPlace";
import MyPlaces from "./routes/MyPlaces";

function App() {
  return (
    <main className="bg-gray-900 h-screen text-white p-8 overflow-auto">
      <Routes>
        {/* <Route path="/" element={<Places />} /> */}
        <Route path="/new" element={<NewPlace />} />
        <Route path="/myplaces" element={<MyPlaces />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </main>
  );
}

export default App;
