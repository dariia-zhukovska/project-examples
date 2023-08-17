import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/styles/styles.scss";

import ExpiredLink from "./components/expired-link/ExpiredLin";
import PageNotFound from "./pages/page-not-found/PageNotFound";

import AuthRoutes from "./pages/authorization/auth-routes/AuthRoutes";
import HeaderRoutes from "./pages/main-page/header-routes/HeaderRoutes";
import CommunityDeteilsHeader from "./components/community-details/community-details-header/CommunityDeteilsHeader";
import CommunityHeaderRoutes from "./pages/main-page/header-routes/CommunityHeaderRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<AuthRoutes />} />
        <Route path="auth/*" element={<AuthRoutes />}></Route>
        <Route path="main/*" element={<HeaderRoutes />}></Route>
        <Route path="expired" element={<ExpiredLink />}></Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
