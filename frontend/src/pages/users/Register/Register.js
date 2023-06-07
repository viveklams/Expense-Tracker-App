import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../../redux/slices/users/usersSlices";
import * as Yup from "yup";
import DisabledButton from "../../../components/DisabledButton";

//form validation
const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
});

const Register = () => {
  //usehistory
  const history = useHistory();

  //dispatch
  const dispatch = useDispatch();
  //get data from store
  const user = useSelector((state) => state?.users);
  const { userAppErr, userServerErr, userLoading, isRegistered } = user;

  //initialize form
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    },
    onSubmit: (values) => {
      dispatch(registerUserAction(values));
      console.log(values);
    },
    validationSchema: formSchema,
  });
  //Redirect
  useEffect(() => {
    if (isRegistered) return history.push("/login");
  }, [isRegistered]);
  return (
    <section className="position-relative py-5 overflow-hidden vh-100">
      <div className="d-none d-md-block position-absolute top-0 start-0 bg-dark w-75 h-100"></div>
      <div className="d-md-none position-absolute top-0 start-0 bg-primary w-100 h-100"></div>
      <div className="container position-relative mx-auto">
        <div className="row align-items-center">
          <div className="col-12 col-lg-5 mb-5">
            <div>
              <h2 className="display-5 fw-bold mb-4 text-white">
                Keep Track of your income and expenses flow
              </h2>
            </div>
          </div>
          <div className="col-12 col-lg-5 ms-auto">
            <div className="p-5 bg-light rounded text-center">
              <form onSubmit={formik.handleSubmit}>
                <span className="text-muted">New User</span>
                <h3 className="fw-bold mb-5">Register</h3>
                {/* Success msg
                {registered && (
                  <SuccessMessage msg="Register Successfully. You will be redirected soon" />
                )} */}
                {/* Display Err*/}
                {userServerErr || userAppErr ? (
                  <div className="alert alert-danger" role="alert">
                    {userServerErr}
                    {userAppErr}
                  </div>
                ) : null}
                <input
                  onSubmit={formik.handleSubmit}
                  value={formik.values.firstname}
                  onBlur={formik.handleBlur("firstname")}
                  onChange={formik.handleChange("firstname")}
                  className="form-control mb-2"
                  type="text"
                  placeholder="First Name"
                />
                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
                <input
                  value={formik.values.lastname}
                  onBlur={formik.handleBlur("lastname")}
                  onChange={formik.handleChange("lastname")}
                  className="form-control mb-2"
                  type="TEXT"
                  placeholder="Last Name"
                />
                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
                <input
                  value={formik.values.email}
                  onBlur={formik.handleBlur("email")}
                  onChange={formik.handleChange("email")}
                  className="form-control mb-2"
                  type="email"
                  placeholder="Email"
                />
                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.email && formik.errors.email}
                </div>
                <input
                  value={formik.values.password}
                  onBlur={formik.handleBlur("password")}
                  onChange={formik.handleChange("password")}
                  className="form-control mb-2"
                  type="password"
                  placeholder="Password"
                />
                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.password && formik.errors.password}
                </div>
                {/* userLoading */}
                {userLoading ? (
                  <DisabledButton />
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary py-2 w-100 mb-4"
                  >
                    Register
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
