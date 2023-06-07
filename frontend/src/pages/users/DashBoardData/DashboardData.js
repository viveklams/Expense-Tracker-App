import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import currencyFormatter from "../../../hooks/useCurrencyFormatter";

import DataGrap from "./DataGrap";
import { fetchAccountStatsAction } from "../../../redux/slices/accountStats/accountStatsSlices";
import LoadingComponent from "../../../components/LoadingComponent";
import ErrorDisplayMessage from "../../../components/ErrMessage";

const DashboardData = ({
  avgExp,
  totalExp,
  minExp,
  maxExp,
  numOfTransExp,
  avgInc,
  totalInc,
  minInc,
  maxInc,
  numOfTransInc,
  netProfit,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAccountStatsAction());
  }, [dispatch]);

  const account = useSelector((state) => state.account);
  const { loading, accountDetails, appErr, serverErr } = account;

  console.log(accountDetails?.expensesStats[0]);
  //   //format curr
  //   const formattedTotalExp = useCurrencyFormatter("INR", totalExp);
  //   const formattedTotalInc = useCurrencyFormatter("INR", totalInc);
  //   const formattedNetProfit = useCurrencyFormatter("INR", netProfit);
  //format date
  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : appErr || serverErr ? (
        <ErrorDisplayMessage>
          {serverErr} {appErr}
        </ErrorDisplayMessage>
      ) : (
        <section class="py-6">
          <div class="container">
            {/* Grpah */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <DataGrap
                income={accountDetails?.incomeStats[0]?.totalInc}
                expenses={accountDetails?.expensesStats[0]?.totalExp}
              />
            </div>
            {/* Net Profit */}
            <div style={{ textAlign: "center", margin: "20px" }}>
              <h2 className="text-success">Net Profit : </h2>
            </div>
            <div class="row">
              <div class="col-12 col-md-6 mb-6">
                <div class="p-8 border rounded-2">
                  <div class="d-flex mb-6 align-items-start justify-content-between">
                    <span
                      class="d-inline-flex align-items-center justify-content-center bg-light-light rounded-2"
                      style={{ width: "40px", height: "40px" }}
                    ></span>
                    {/* Expenses Start */}
                    <span class="badge fs-2 bg-light text-danger">
                      Total Expenses
                    </span>
                  </div>
                  <h1 class="mb-4">
                    {currencyFormatter(
                      "INR",
                      accountDetails?.expensesStats[0]?.totalExp
                    )}
                  </h1>
                  <p class="mb-0">
                    <span>Number of Transactions</span>
                    <span class="text-danger ms-1">
                      <span>
                        {accountDetails?.expensesStats[0]?.totalRecords}
                      </span>
                    </span>
                  </p>

                  <p class="mb-0">
                    <span>Minimum Transactions</span>
                    <span class="text-danger ms-1">
                      <span>{accountDetails?.expensesStats[0]?.minExp}</span>
                    </span>
                  </p>

                  <p class="mb-0">
                    <span>Maximum Transactions</span>
                    <span class="text-danger ms-1">
                      <span>{accountDetails?.expensesStats[0]?.maxExp}</span>
                    </span>
                  </p>

                  <p class="mb-0">
                    <span>Average Transactions</span>
                    <span class="text-danger ms-1">
                      <span>
                        {accountDetails?.expensesStats[0]?.averageExp}
                      </span>
                    </span>
                  </p>
                </div>
              </div>
              <div class="col-12 col-md-6 mb-6">
                <div class="p-8 border rounded-2">
                  <div class="d-flex mb-6 align-items-start justify-content-between">
                    <span
                      class="d-inline-flex align-items-center justify-content-center bg-danger-light rounded-2"
                      style={{ width: "40px", height: "40px" }}
                    ></span>

                    {/* Income Start */}
                    <span class="badge fs-2 bg-primary-light text-primary">
                      Total Income
                    </span>
                  </div>
                  <h1 class="mb-4">
                    {currencyFormatter(
                      "INR",
                      accountDetails?.incomeStats[0]?.totalInc
                    )}
                  </h1>

                  <p class="mb-0">
                    <span>Number of Transactions</span>
                    <span class="text-danger ms-1">
                      <span>
                        {accountDetails?.incomeStats[0]?.totalRecords}
                      </span>
                    </span>
                  </p>

                  <p class="mb-0">
                    <span>Minimum Transactions</span>
                    <span class="text-danger ms-1">
                      <span>{accountDetails?.incomeStats[0]?.minInc}</span>
                    </span>
                  </p>

                  <p class="mb-0">
                    <span>Maximum Transactions</span>
                    <span class="text-danger ms-1">
                      <span>{accountDetails?.incomeStats[0]?.maxInc}</span>
                    </span>
                  </p>

                  <p class="mb-0">
                    <span>Average Transactions</span>
                    <span class="text-danger ms-1">
                      <span>{accountDetails?.incomeStats[0]?.averageInc}</span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default DashboardData;
