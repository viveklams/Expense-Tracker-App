import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ContentDetails from "../../../components/ContentDetails/ContentDetails";

import LoadingComponent from "../../../components/LoadingComponent";

import UserProfileContentDetails from "../../../components/UserProfile/UserProfileContentDetails";
import { userProfileAction } from "../../../redux/slices/users/usersSlices";
import ErrorDisplayMessage from "../../../components/ErrMessage";

const UserProfileIncList = () => {
  const dispatch = useDispatch();
  //user Expenses
  useEffect(() => {
    dispatch(userProfileAction());
  }, []);
  const user = useSelector((state) => state.users);
  const { profile, loading, AppErr, ServerErr } = user;

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : AppErr || ServerErr ? (
        <ErrorDisplayMessage>
          {ServerErr} {AppErr}
        </ErrorDisplayMessage>
      ) : profile?.income?.length <= 0 ? (
        <h2>No Expense Found</h2>
      ) : (
        <section className="py-6">
          <div className="container-fluid">
            <div className="position-relative border rounded-2">
              <a
                className="position-absolute top-0 end-0 mt-4 me-4"
                href="#"
              ></a>
              <div className="pt-8 px-8 mb-8">
                <h6 className="mb-0 fs-3">Recent Income transactions</h6>
                <p className="mb-0">
                  Below is the history of your income transactions records
                </p>
                <Link
                  to="/add-income"
                  className="btn  btn-outline-success me-2 m-2"
                >
                  New Income
                </Link>
              </div>
              <table className="table">
                <thead>
                  <tr className="table-active">
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Title</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Description</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Amount</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Date</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Action</small>
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {loading ? (
                      <LoadingComponent />
                    ) : AppErr || ServerErr ? (
                      <div>err</div>
                    ) : profile?.income?.length <= 0 ? (
                      <h2>No Income Found</h2>
                    ) : (
                      profile?.income?.map((inc) => (
                        <UserProfileContentDetails item={inc} key={inc?._id} />
                      ))
                    )}
                  </>
                </tbody>
              </table>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          ></div>
        </section>
      )}
    </>
  );
};

export default UserProfileIncList;
