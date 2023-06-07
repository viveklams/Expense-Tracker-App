import { BrowserRouter, Route, Switch } from "react-router-dom";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Home from "./pages/Home";

import IncomeList from "./pages/income/IncomeList";
import Navbar from "./components/Navigation/Navbar";
import Profile from "./pages/users/Profile/Profile";
import Register from "./pages/users/Register/Register";
import Login from "./pages/users/Login/Login";
import ExpensesList from "./pages/expense/ExpensesList";

import UserProfileExpList from "./pages/users/Profile/UserProfileExpList";
import UserProfileIncList from "./pages/users/Profile/UserProfileIncList";
import UpdateProfile from "./pages/users/Profile/UpdateProfile";
import AddIncome from "./pages/income/AddIncome";
import AddExpense from "./pages/expense/AddExpense";
import ProtectedRoute from "./components/Navigation/ProtectedRoute";

import NotAdmin from "./components/NotAdmin/NotAdmin";
import NewRecord from "./components/Add/NewRecordForm";
import EditContent from "./components/EditContent/EditContent";
import DashboardData from "./pages/users/DashBoardData/DashboardData";

const options = {
  timeout: 50000,
  position: positions.BOTTOM_CENTER,
};

const App = () => {
  return (
    <Provider template={AlertTemplate} {...options}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <ProtectedRoute exact path="/dashboard" component={DashboardData} />
          <ProtectedRoute
            exact
            path="/user-profile-expenses"
            component={UserProfileExpList}
          />
          <Route
            exact
            path="/user-profile-income"
            component={UserProfileIncList}
          />
          <Route exact path="/not-admin" component={NotAdmin} />

          <ProtectedRoute
            exact
            path="/update-profile"
            component={UpdateProfile}
          />

          <ProtectedRoute exact path="/edit" component={EditContent} />
          {/* <ProtectedRoute
            exact
            path="/user-expenses"
            component={UserExpenses}
          /> */}
          <ProtectedRoute exact path="/add-expense" component={AddExpense} />
          <ProtectedRoute exact path="/add-income" component={AddIncome} />

          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute exact path="/incomes" component={IncomeList} />
          <ProtectedRoute exact path="/expenses" component={ExpensesList} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
