import { BrowserRouter, Route, Routes } from "react-router";
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
import OTP from "./OTP";
import ChangePassword from "./ChangePassword";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/change-password" element={<ChangePassword />} />
          
          {/* Protected routes with Body layout */}
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
