import { Route, Routes } from "react-router-dom";
import AuthBackground from "../../../components/common/authorization-background/AuthBackground";
import SignIn from "../sign-in/SignIn";
import PasswordRecovery from "../password-recovery/PasswordRecovery";
import PageNotFound from "../../page-not-found/PageNotFound";
import CreateNewPassword from "../../authorization/new-password/NewPassword";

const AuthRoutes = () => {
  return (
    <AuthBackground>
      <Routes>
        <Route index element={<SignIn />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="reset" element={<PasswordRecovery />} />
        <Route path="new-password" element={<CreateNewPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AuthBackground>
  );
};

export default AuthRoutes;
