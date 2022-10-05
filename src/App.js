import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AuthContextComponent } from "./contexts/authContext";
import { Profile } from "./pages/Profile";
import { ErrorPage } from "./pages/ErrorPage";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Game } from "./pages/Game";
import { AboutUs } from "./pages/AboutUs";
import { CreateGame } from "./pages/CreateGame";

import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <AuthContextComponent>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={<ProtectedRoute component={Profile} />}
          />
          <Route path="/:id" element={<Game />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/profile/create-game" element={<CreateGame />}/>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </AuthContextComponent>
    </>
  );
}

export default App;
