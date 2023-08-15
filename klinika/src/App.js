import "./App.scss";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Wards from "./components/Wards/Wards";
import GlobalContext from "./context/global";
import Schedules from "./components/Schedule/Schedules";
import Schedule from "./components/ScheduleData/Schedule";
import Movement from "./components/Movement/Movement";

function App() {
  const [token, setToken] = useState(document.cookie ? document.cookie : null);
  const [message, setMessage] = useState(null);
  const [scheduleArray, setScheduleArray] = useState([]);

  useEffect(() => {
    // async function getUsers() {
    //   const data = await getDocs(collection(db, "users"));
    //   data.forEach(element => console.log(element.data()))
    // }
    // getUsers();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        token,
        setToken,
        message,
        setMessage,
        scheduleArray,
        setScheduleArray,
      }}
    >
      <Router>
        <Routes>
          <Route exact path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/wards" element={<Wards />} />
          <Route path="/schedule" element={<Schedules />} />
          <Route path="/schedules/:id" element={<Schedule />} />
          <Route path="/wards/:id" element={<Movement />} />
          <Route path="*" /> {/* Dodać komponent NOT FOUND */}
        </Routes>
      </Router>
    </GlobalContext.Provider>
  );
}

export default App;
