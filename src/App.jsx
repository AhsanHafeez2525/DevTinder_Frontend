import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import { Provider } from "react-redux"; // ✅ Import Provider
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Signup from "./Signup";
import Profile from "./Profile";
import Body from "./Body";
import store from "./store/store";
import Feed from "./Feed";
import Connections from "./Connections";
import Requests from "./Requests";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Routes>
          {/* Body acts as a layout route */}
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/feed" element={<Feed />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
