import React, { useEffect, useState } from "react";
import Order from "../../components/dashboard/Order";
import Head from "next/head";
import { useUserContext } from "../../context/user_context";
import { useRouter } from "next/router";
import AccountDetails from "../../components/dashboard/AccountDetails";
import Loading from "../../components/Loading";
import DashboardStatus from "../../components/dashboard/DashboardStatus";
import DashboardService from "../../services/DashboardService";
import ChangePasswordModal from "../../components/dashboard/ChangePasswordModal";
import { useGeneralContext } from "../../context/general_context";
import UserProfileEditModal from "../../components/dashboard/UserProfileEditModal";

const Dashboard = ({ locations }) => {
  const { changePasswordModal, userProfileEditModal } = useGeneralContext();

  const router = useRouter();
  const [dashboard, setDashboard] = useState(true);
  const [orders, setOrders] = useState(false);
  const [accountDetails, setAccountDetails] = useState(false);

  const { user, setUser } = useUserContext();

  const logout = async () => {
    if (user) {
      const logoutRes = await DashboardService.instance.logoutUser(
        user.customer.token
      );

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
    return <Loading />;
  }

  // Dashboard Tabs
  const tabs = () => {
    return (
      <ul className="nav nav-tabs mb-4 col-lg-3 col-md-4" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setDashboard(true);
              setOrders(false);
              setAccountDetails(false);
            }}
          >
            Dashboard
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setOrders(true);
              setDashboard(false);
              setAccountDetails(false);
            }}
          >
            Orders
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setOrders(false);
              setAccountDetails(true);
              setDashboard(false);
            }}
          >
            Account details
          </a>
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
    );
  };

  // Dashboard onClick tab view
  const afterClickOnTabs = () => {
    return (
      <div className="tab-content col-lg-9 col-md-8">
        <div className={`tab-pane ${dashboard ? "active" : ""}`} id="dashboard">
          <DashboardStatus />
        </div>
        <div className={`tab-pane ${orders ? "active" : ""}`} id="orders">
          <Order />
        </div>

        <div
          className={`tab-pane ${accountDetails ? "active" : ""}`}
          id="account"
        >
          <AccountDetails />
        </div>
      </div>
    );
  };
  return (
    <React.Fragment>
      <Head>
        <title>dashboard | The Owlet</title>
      </Head>
      <main className="main account">
        {changePasswordModal && <ChangePasswordModal />}
        {userProfileEditModal && <UserProfileEditModal />}
        <div className="page-content mt-4 mb-10 pb-6">
          <div className="container">
            <h2 className="title title-center mb-10 mt-5">
              Welcome to your Dashboard
            </h2>
            <div className="tab tab-vertical gutter-lg">
              {tabs()}
              {afterClickOnTabs()}
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};
export const getStaticProps = async () => {
  const locations = await DashboardService.instance.getLocationList();

  return {
    props: {
      locations,
    },
    // revalidate: 10,
  };
};
export default Dashboard;
