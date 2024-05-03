import React from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { Input } from "antd";
import { motion } from "framer-motion";

import Button from "@/COMPONENTS/SHARED/Button";

import WithSectionLabel from "@/RESOURCES/HOCS/WithSectionLabel";
import UseRequest from "@/RESOURCES/HOOKS/SHARED/UseRequest";
import { TokenHandler } from "@/RESOURCES/HANDLERS/TokenHandler";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";
import AlertHandler from "@/RESOURCES/HANDLERS/AlertHandler";

import C from "./style.module.scss";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(location.search);

  /******************** REQUESTS ********************/
  const loginMutation = UseRequest({
    onSuccess: (result) => {
      TokenHandler.addToken(result.data.token);
      localStorage.setItem("user", JSON.stringify(result.data.user));

      navigate(`/home?color=${urlParams.get("color")}`);

      AlertHandler({ dispatch, message: "Welcome !", type: "success" });
    },
    onError: (error) => {
      AlertHandler({ dispatch, error });
    },
    isPublic: true,
  });
  /******************** REQUESTS ********************/

  const handleSubmit = (values) => {
    loginMutation.mutate({
      route: "user/login",
      method: "POST",
      load: values,
    });
  };

  return (
    <div className={C.AuthForm}>
      <motion.div
        className={C.Wrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className={C.Logo}>
          {SvgHandler.SnapSapLogo(
            { width: "45px" },
            "#" + urlParams.get("color")
          )}
        </div>

        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);

            setTimeout(() => {
              setSubmitting(false);
            }, 1000);
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <WithSectionLabel label={"EMAIL"}>
                <Input
                  name="email"
                  type="email"
                  required
                  onChange={handleChange}
                  value={values.email}
                  className={C.AuthField}
                  autoCorrect="false"
                  spellCheck="false"
                />
              </WithSectionLabel>

              <WithSectionLabel label={"PASSWORD"}>
                <Input.Password
                  name="password"
                  required
                  onChange={handleChange}
                  value={values.password}
                  className={C.AuthField}
                />
              </WithSectionLabel>

              <Button
                label="LOGIN"
                style={{
                  width: "100%",
                  height: "38px",
                  marginTop: "0.8rem",
                  fontSize: "0.8rem",
                  backgroundColor: "#" + urlParams.get("color"),
                }}
                type="submit"
                disabled={isSubmitting}
              />
            </form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
}

export default LoginForm;
