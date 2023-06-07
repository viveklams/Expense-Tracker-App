import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import ErrMessage from "../../../components/ErrMessage";

import { updateProfileAction } from "../../../redux/slices/users/usersSlices";

import DisabledButton from "../../../components/DisabledButton";
import LoadingComponent from "../../../components/Loading/Loading";
import ErrorDisplayMessage from "../../../components/ErrMessage";
// import navigate from "../../../utils/navigate";

//form validation
const formSchema = Yup.object({
  firstname: Yup.string().required("firstname is required"),
  lastname: Yup.string().required("lastname is required"),
  email: Yup.string().required("email is required"),
});

const UpdateProfile = ({ location: { state } }) => {
  console.log(state);
  const history = useHistory();

  const user = useSelector((state) => state?.users);
  const { userLoading, userAppErr, userServerErr, isEdited } = user;

  //dispatch action
  const dispatch = useDispatch();

  // //initialize form
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: state?.user?.firstname,
      lastname: state?.user?.lastname,
      email: state?.user?.email,
    },
    onSubmit: (values) => {
      // const user = {
      //   ...values,
      //   id: user?.user?.id,
      // };
      dispatch(updateProfileAction(values));
      // dispatch();
    },
    validationSchema: formSchema,
  });
  //redirect
  useEffect(() => {
    if (isEdited) history.push("/profile");
  }, [isEdited, dispatch]);

  // if (isUpdated) {
  //   navigate(history, "profile", undefined);
  // }
  return (
    <>
      {userAppErr || userServerErr ? (
        <ErrorDisplayMessage>
          {userServerErr} {userAppErr}
        </ErrorDisplayMessage>
      ) : (
        <section className="py-5 bg-success vh-100">
          <div className="container text-center">
            <div className="row mb-4">
              <div className="col-12 col-md-8 col-lg-5 mx-auto">
                <div className="p-4 shadow-sm rounded bg-white">
                  <form onSubmit={formik.handleSubmit}>
                    <span className="text-muted">Update Profile</span>
                    <h4 className="mb-4 fw-light">{user?.user?.firstname}</h4>

                    {/* Display income Err */}
                    {userAppErr || userServerErr ? (
                      <ErrMessage
                        error={{
                          userAppErr,
                          userServerErr,
                        }}
                      />
                    ) : null}
                    <div className="mb-3 input-group">
                      <input
                        value={formik.values.firstname}
                        onBlur={formik.handleBlur("firstname")}
                        onChange={formik.handleChange("firstname")}
                        className="form-control"
                        type="text"
                        placeholder="Enter firstname"
                      />
                    </div>
                    {/* Err */}
                    <div className="text-danger mb-2">
                      {formik.touched.firstname && formik.errors.firstname}
                    </div>
                    <div className="mb-3 input-group">
                      <input
                        value={formik.values.lastname}
                        onBlur={formik.handleBlur("lastname")}
                        onChange={formik.handleChange("lastname")}
                        className="form-control"
                        type="text"
                        placeholder="Enter lastname"
                      />
                    </div>
                    {/* Err */}
                    <div className="text-danger mb-2">
                      {formik.touched.lastname && formik.errors.lastname}
                    </div>
                    <div className="mb-3 input-group">
                      <input
                        value={formik.values.email}
                        onBlur={formik.handleBlur("email")}
                        onChange={formik.handleChange("email")}
                        className="form-control"
                        type="email"
                        placeholder="Enter email"
                      />
                    </div>
                    {/* Err */}
                    <div className="text-danger mb-2">
                      {formik.touched.email && formik.errors.email}
                    </div>

                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic mixed styles example"
                    >
                      {userLoading ? (
                        <DisabledButton />
                      ) : (
                        <button type="submit" className="btn btn-warning">
                          Update
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default UpdateProfile;
