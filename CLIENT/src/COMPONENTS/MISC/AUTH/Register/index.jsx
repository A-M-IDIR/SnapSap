import React from "react";

import Header from "@/COMPONENTS/MISC/AUTH/Header";
import RegisterForm from "@/COMPONENTS/MISC/AUTH/RegisterForm";
import Footer from "@/COMPONENTS/MISC/AUTH/Footer";

import C from "./style.module.scss";

function Register() {
  return (
    <div className={C.Register}>
      <Header />

      <RegisterForm />

      <Footer
        text="Have An Account ?"
        action="Login"
        path="/auth?section=login"
      />
    </div>
  );
}

export default Register;
