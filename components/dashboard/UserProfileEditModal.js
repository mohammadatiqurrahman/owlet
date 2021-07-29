import React, { useEffect, useState } from "react";
import { useGeneralContext } from "../../context/general_context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from "../../context/user_context";
import DashboardService from "../../services/DashboardService";
import { useRouter } from "next/router";

const UserProfileEditModal = () => {
  const router = useRouter();
  const { setUserProfileEditModal } = useGeneralContext();
  const { user, setUser } = useUserContext();

  const [changeProfileStatus, setChangeProfileStatus] = useState(false);
  const [unauthenticated, setUnauthenticated] = useState(false);
  const [account, setAccount] = useState({
    address: user && user.customer.address,
    name: user && user.customer.name,
  });

  const accountInputHandler = (e) => {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
  };

  const accountHandleSubmit = async (e) => {
    e.preventDefault();
    setChangeProfileStatus(true);
    if (account.name && account.address) {
      const data = await DashboardService.instance.editProfile(
        user.customer.token,
        account
      );

      if (data.message === "Unauthenticated") {
        localStorage.removeItem("user");
        setUnauthenticated(true);
        setUserProfileEditModal(false);
        router.push("/login");
        return;
      }
      if (data.errors) {
        setChangeProfileStatus(false);
        toast.error("Failed to update profile");
      } else {
        const newCustomer = {
          ...user.customer,
          name: account.name,
          address: account.address,
        };
        setUser({ ...user, customer: newCustomer });

        setChangeProfileStatus(false);
        toast.success(data.message);
      }
    }
  };

  useEffect(() => {
    if (unauthenticated === false) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
      router.push("/login");
    }
  }, [user]);
  return (
    <React.Fragment>
      <ToastContainer />
      <div
        className="mfp-bg mfp-newsletter mfp-flip-popup mfp-ready"
        style={{ display: "block" }}
      ></div>
      <div
        className="mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-newsletter mfp-flip-popup mfp-ready"
        tabIndex="-1"
        style={{ display: "block" }}
      >
        <div className="mfp-container mfp-s-ready mfp-inline-holder">
          <div className="mfp-content">
            <div className="newsletter-popup" id="newsletter-popup">
              <div className="container">
                <div className="row">
                  <h4 className="text-uppercase text-dark mt-5">
                    Edit Profile
                  </h4>
                  <form
                    style={{
                      padding: "0px 95px 15px 95px",
                    }}
                    onSubmit={accountHandleSubmit}
                  >
                    <div style={{ textAlign: "left", color: "black" }}>
                      Name *
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={account.name}
                      required
                      onChange={accountInputHandler}
                      style={{ border: "1px solid #232323" }}
                    />
                    <div style={{ textAlign: "left", color: "black" }}>
                      Address *
                    </div>
                    <textarea
                      type="text"
                      className="form-control"
                      style={{ border: "1px solid #232323" }}
                      name="address"
                      required
                      rows="4"
                      cols="50"
                      value={account.address}
                      onChange={accountInputHandler}
                    ></textarea>

                    {!changeProfileStatus ? (
                      <button className="btn btn-dark mt-3" type="submit">
                        Save Changes
                      </button>
                    ) : (
                      <button className="btn btn-disabled mt-3">
                        Changing profile...
                      </button>
                    )}
                  </form>
                </div>
              </div>

              <button
                title="Close (Esc)"
                type="button"
                className="mfp-close"
                onClick={() => setUserProfileEditModal(false)}
              >
                <span>×</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserProfileEditModal;
