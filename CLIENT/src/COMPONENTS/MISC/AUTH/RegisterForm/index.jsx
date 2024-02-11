import React from "react";

import { motion } from "framer-motion";

import Field from "@/COMPONENTS/SHARED/Field";
import Button from "@/COMPONENTS/SHARED/Button";

import C from "./style.module.scss";

function RegisterForm() {
  return (
    <motion.div
      className={C.RegisterForm}
      initial={{ height: 270 }}
      animate={{
        height: "max-content",
        transition: { ease: [0.8, 0, 0, 0.8], duration: 0.4 },
      }}
      exit={{
        height: 270,
        transition: { ease: [0.8, 0, 0, 0.8], duration: 0.4, delay: 0.4 },
      }}
      onClick={() => navigate("/auth?section=login")}
    >
      <motion.div
        className={C.Wrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.4 } }}
        exit={{ opacity: 0 }}
      >
        <aside>
          <Field
            type="text"
            label="FIRST-NAME"
            value={""}
            onChange={() => {}}
            required={true}
          />

          <Field
            type="text"
            label="LAST-NAME"
            value={""}
            onChange={() => {}}
            required={true}
          />
        </aside>

        <Field
          type="text"
          label="USER-NAME"
          value={""}
          onChange={() => {}}
          required={true}
        />

        <Field
          type="email"
          label="EMAIL"
          value={""}
          onChange={() => {}}
          required={true}
        />

        <aside>
          <Field
            type="password"
            label="PASSOWRD"
            value={""}
            onChange={() => {}}
            required={true}
          />

          <Field
            type="password"
            label="CONFIRM"
            value={""}
            onChange={() => {}}
            required={true}
          />
        </aside>

        <Button
          label="REGISTER"
          style={{
            width: "100%",
            height: "38px",
            marginTop: "1rem",
            fontSize: "0.8rem",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default RegisterForm;
