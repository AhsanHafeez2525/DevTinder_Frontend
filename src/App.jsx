import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux"; // ✅ Import Provider
import Login from "./Login";
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
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
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
