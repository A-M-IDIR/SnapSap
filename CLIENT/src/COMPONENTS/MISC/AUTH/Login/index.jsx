import React from "react";

import Header from "@/COMPONENTS/MISC/AUTH/Header";
import LoginForm from "@/COMPONENTS/MISC/AUTH/LoginForm";
import Footer from "@/COMPONENTS/MISC/AUTH/Footer";

import C from "./style.module.scss";

function Login() {
  return (
    <div className={C.Login}>
      <Header />

      <LoginForm />

      <Footer
        text="Need An Account ?"
        action="Register"
        path="/auth?section=register"
      />
    </div>
  );
}

export default Login;
