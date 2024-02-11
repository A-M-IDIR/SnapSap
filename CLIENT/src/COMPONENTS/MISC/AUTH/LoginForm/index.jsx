import React from "react";

import { motion } from "framer-motion";

import Field from "@/COMPONENTS/SHARED/Field";
import Button from "@/COMPONENTS/SHARED/Button";

import C from "./style.module.scss";

function LoginForm() {
  return (
    <div className={C.LoginForm}>
      <motion.div
        className={C.Wrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Field
          type="email"
          label="EMAIL"
          value={""}
          onChange={() => {}}
          required={true}
        />

        <Field
          type="password"
          label="PASSOWRD"
          value={""}
          onChange={() => {}}
          required={true}
        />

        <Button
          label="LOGIN"
          style={{
            width: "100%",
            height: "38px",
            marginTop: "1rem",
            fontSize: "0.8rem",
          }}
        />
      </motion.div>
    </div>
  );
}

export default LoginForm;
