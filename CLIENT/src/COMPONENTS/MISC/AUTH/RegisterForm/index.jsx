import React from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Formik } from "formik";
import { Input } from "antd";

import Button from "@/COMPONENTS/SHARED/Button";

import WithSectionLabel from "@/RESOURCES/HOCS/WithSectionLabel";
import UseRequest from "@/RESOURCES/HOOKS/SHARED/UseRequest";
import { QueryParamHandler } from "@/RESOURCES/HANDLERS/QueryParamHandler";
import { SvgHandler } from "@/RESOURCES/HANDLERS/SvgHandler";
import AlertHandler from "@/RESOURCES/HANDLERS/AlertHandler";

import C from "./style.module.scss";

function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(location.search);

  /******************** REQUESTS ********************/
  const loginMutation = UseRequest({
    onSuccess: () => {
      navigate(QueryParamHandler.UpdateParam("section", "login"));

      AlertHandler({
        dispatch,
        message: "Check Your Email For Verification !",
        type: "success",
        duration: 2,
      });
    },
    onError: (error) => {
      AlertHandler({ dispatch, error });
    },
    isPublic: true,
  });
  /******************** REQUESTS ********************/

  const handleSubmit = (values) => {
    loginMutation.mutate({
      route: "user/register",
      method: "POST",
      load: values,
    });
  };

  return (
    <motion.div
      className={C.AuthForm}
      initial={{ height: 330 }}
      animate={{
        height: "max-content",
        transition: { ease: [0.8, 0, 0, 0.8], duration: 0.4 },
      }}
      exit={{
        height: 330,
        transition: { ease: [0.8, 0, 0, 0.8], duration: 0.4, delay: 0.4 },
      }}
    >
      <motion.div
        className={C.Wrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.4 } }}
        exit={{ opacity: 0 }}
      >
        <div className={C.Logo}>
          {SvgHandler.SnapSapLogo(
            { width: "45px" },
            "#" + urlParams.get("color")
          )}
        </div>

        <Formik
          initialValues={{
            userName: "",
            email: "",
            password: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);

            setTimeout(() => {
              setSubmitting(false);
            }, 1000);
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <WithSectionLabel label={"USER-NAME"}>
                <Input
                  name="userName"
                  required
                  onChange={handleChange}
                  value={values.userName}
                  className={C.AuthField}
                  autoCorrect="false"
                  spellCheck="false"
                />
              </WithSectionLabel>

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
                  autoCorrect="false"
                  spellCheck="false"
                />
              </WithSectionLabel>

              <Button
                label="REGISTER"
                style={{
                  width: "100%",
                  height: "38px",
                  marginTop: "1rem",
                  fontSize: "0.8rem",
                  backgroundColor: "#" + urlParams.get("color"),
                }}
                disabled={isSubmitting}
                type="submit"
              />
            </form>
          )}
        </Formik>
      </motion.div>
    </motion.div>
  );
}

export default RegisterForm;
