import React, { useEffect, useState } from "react";
import Order from "../../components/dashboard/Order";
import LoginSign from "../../components/login/LoginSign";
import { useUserContext } from "../../context/user_context";
import { based_url } from "../../utils/constants";
import { useRouter } from "next/router";
import AccountDetails from "../../components/dashboard/AccountDetails";

import Login from "../login";
import Loading from "../../components/Loading";
import DashboardStatus from "../../components/dashboard/DashboardStatus";
import { Link } from "@material-ui/core";
const Dashboard = ({ locations }) => {
  const router = useRouter();
  const [dashboard, setDashboard] = useState(true);
  const [orders, setOrders] = useState(false);
  const [accountDetails, setAccountDetails] = useState(false);

  const { user, setUser } = useUserContext();
  // console.log(user);
  const logout = async () => {
    if (user) {
      const logoutRes = await fetch(`${based_url}/customer/logout`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + user.customer.token,
        },
      });

      const loggedout = await logoutRes.json();
      localStorage.removeItem("user");
      setUser(null);
      router.push("/login");
    }
  };
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);
  if (!user) {
    // return <LoginSign locations={locations} />;
    return <Loading />;

    // return <h1>Loading...</h1>;
  }
  return (
    <React.Fragment>
      <main className="main account">
        <div className="page-content mt-4 mb-10 pb-6">
          <div className="container">
            <h2 className="title title-center mb-10">Account Informations</h2>
            <div className="tab tab-vertical gutter-lg">
              <ul
                className="nav nav-tabs mb-4 col-lg-3 col-md-4"
                role="tablist"
              >
                <li className="nav-item">
                  <Link href="/dashboard">
                    <a className="nav-link" style={{ cursor: "pointer" }}>
                      Dashboard
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/dashboard/orders">
                    <a className="nav-link" style={{ cursor: "pointer" }}>
                      Orders
                    </a>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link href="/dashboard/account_details">
                    <a className="nav-link" style={{ cursor: "pointer" }}>
                      Account details
                    </a>
                  </Link>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      logout();
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
              <div className="tab-content col-lg-9 col-md-8">
                <div className="tab-pane" id="orders">
                  <Dashboard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};
export const getStaticProps = async () => {
  const locationRes = await fetch(`${based_url}/location/list`);
  const locations = await locationRes.json();

  return {
    props: {
      locations,
    },
    // revalidate: 10,
  };
};
export default Dashboard;
