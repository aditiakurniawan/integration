import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddFilmAdmin from "./pages/AddFilmAdmin";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import ListFilmAdmin from "./pages/ListFilmAdmin";
import ListTransactionAdmin from "./pages/ListTransactionAdmin";
import Movies from "./pages/Movies";
import NotFound from "./pages/NotFound";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import TVSeries from "./pages/TVSeries";
import { IsLoginRoute, IsAdminRoute } from './PrivateRoute'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tvseries" element={<TVSeries />} />
          <Route element={<IsLoginRoute />} path={"/"}>
            <Route path="/payment" element={<Payment />} />
            <Route path="/profile" element={<Profile />} />
            <Route element={<IsAdminRoute />} path={"/"}>
              <Route path="/addfilm" element={<AddFilmAdmin />} />
              <Route path="/listtransaction" element={<ListTransactionAdmin />} />
              <Route path="/listfilm" element={<ListFilmAdmin />} />
              <Route path="/listfilm/:category" element={<ListFilmAdmin />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
