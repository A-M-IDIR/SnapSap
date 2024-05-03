import React from "react";

import { useDispatch } from "react-redux";
import { Formik } from "formik";

import Button, { buttonThemes } from "@/COMPONENTS/SHARED/Button";

import WithSectionLabel from "@/RESOURCES/HOCS/WithSectionLabel";
import UseRequest from "@/RESOURCES/HOOKS/SHARED/UseRequest";
import AlertHandler from "@/RESOURCES/HANDLERS/AlertHandler";

import C from "./style.module.scss";

function UpdateInfo({ infoLabel, infoKey, defaultInfo, infoType, popUp }) {
  const dispatch = useDispatch();

  /******************** REQUESTS ********************/
  const updatedUserMutation = UseRequest({
    onSuccess: (result) => {
      localStorage.setItem("user", JSON.stringify(result.data));
      popUp(false);

      AlertHandler({ dispatch, message: "Updated !", type: "success" });
    },
    onError: (error) => AlertHandler({ dispatch, error }),
  });
  /******************** REQUESTS ********************/

  const handleSubmit = (values) => {
    if (infoKey === "password" && values.password.length < 6) {
      AlertHandler({
        dispatch,
        message: "New Password Too Short.",
        type: "warning",
      });

      return;
    }

    let updatedData = values;
    let currentPassword = values.currentPassword;
    delete updatedData["currentPassword"];

    updatedUserMutation.mutate({
      route: "user",
      method: "PATCH",
      load: {
        updatedData,
        currentPassword,
      },
    });
  };

  return (
    <Formik
      initialValues={{
        [infoKey]: infoKey != "password" ? defaultInfo : "",
        currentPassword: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values);

        setTimeout(() => {
          setSubmitting(false);
        }, 1000);
      }}
    >
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <form className={C.UpdateInfo} onSubmit={handleSubmit}>
          <WithSectionLabel
            label={infoLabel}
            labelStyle={{ fontSize: "0.68rem" }}
          >
            <input
              className={C.FieldInput}
              onChange={handleChange}
              name={infoKey}
              value={values[infoKey]}
              spellCheck={false}
              type={infoType}
              disabled={isSubmitting}
              required
            />
          </WithSectionLabel>

          <WithSectionLabel
            label={"CURRENT-PASS"}
            labelStyle={{ fontSize: "0.68rem" }}
          >
            <input
              type="password"
              className={C.FieldInput}
              onChange={handleChange}
              name="currentPassword"
              value={values.currentPassword}
              disabled={isSubmitting}
              required
            />
          </WithSectionLabel>

          <div className={C.Footer}>
            <Button type="submit" label={"SAVE"} style={{ height: "32px" }} />

            <Button
              label={"CANCLE"}
              theme={buttonThemes.LightGray}
              style={{ height: "32px" }}
              type="button"
              onMouseUp={() => popUp(false)}
            />
          </div>
        </form>
      )}
    </Formik>
  );
}

export default UpdateInfo;
