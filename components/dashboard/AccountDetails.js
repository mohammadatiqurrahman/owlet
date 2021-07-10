import React, { useState } from "react";
import { useUserContext } from "../../context/user_context";
import { based_url } from "../../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AccountDetails = () => {
  const notify = (data) => toast.success(`${data}`);
  const [openModal, setOpenModal] = useState(false);
  const { user, setUser } = useUserContext();
  // console.log(user.customer);
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
    if (account.name && account.address) {
      const accountEdit = await fetch(`${based_url}/customer/edit_profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + user.customer.token,
        },
        body: JSON.stringify({ name: account.name, address: account.address }),
      });
      const data = await accountEdit.json();
      // console.log(data);
      if (data.errors) {
        const failedMessage = "Failed to update profile";
        notify(failedMessage);
      } else {
        const newCustomer = {
          ...user.customer,
          name: account.name,
          address: account.address,
        };
        setUser({ ...user, customer: newCustomer });
        localStorage.setItem("user", JSON.stringify(user));
        notify(data.message);
        // setOpenModal(false);
      }
    }
  };
  return (
    <div className="row">
      <div className="column">
        <div className="card">
          <h3>{user && user.customer.name}</h3>
          <p> {user && user.customer.email}</p>
          <p>{user && user.customer.phone}</p>
          <p> {user && user.customer.address}</p>
          <a
            className="btn btn-link btn-secondary btn-underline"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Edit <i className="far fa-edit"></i>
          </a>
        </div>
      </div>
      <div className={`modal-overlay ${openModal ? "open-modal" : ""}`}>
        <div className="modal-container" style={{ padding: "30px" }}>
          <form className="form" onSubmit={accountHandleSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <label>Name *</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={account.name}
                  required=""
                  onChange={accountInputHandler}
                  style={{ background: "white" }}
                />
              </div>
              <div className="col-sm-12">
                <label>Address *</label>
                <textarea
                  type="text"
                  className="form-control"
                  style={{ background: "white" }}
                  name="address"
                  required=""
                  rows="4"
                  cols="50"
                  value={account.address}
                  onChange={accountInputHandler}
                ></textarea>
              </div>
              {/* <div className="col-sm-6">
                <label>Email</label>
                <input
                  className="form-control"
                  value={user && user.customer.email}
                  readOnly
                />
              </div> */}
            </div>
            {/* <div className="row">
              <div className="col-sm-6">
                <label>Address *</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="address"
                  required=""
                  value={account.address}
                  onChange={accountInputHandler}
                ></textarea>
              </div>
              <div className="col-sm-6">
                <label>Phone *</label>
                <input
                  className="form-control"
                  value={user && user.customer.phone}
                  readOnly
                />
              </div>
            </div> */}
            <button
              type="submit"
              className="btn btn-primary"
              // onClick={() => {
              //   notify();
              // }}
            >
              SAVE CHANGES
            </button>
            <ToastContainer />
          </form>
          <button className="close-btn" onClick={() => setOpenModal(false)}>
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>

      <style jsx>{`
        .card {
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
          padding: 16px;
          text-align: center;
          background-color: #f1f1f1;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(73, 166, 233, 0.5);
          display: grid;
          place-items: center;
          transition: all 0.3s linear;
          visibility: hidden;
          z-index: -10;
          overflow: scroll;
        }
        /* OPEN/CLOSE MODAL */
        .open-modal {
          visibility: visible;
          z-index: 10;
        }
        .modal-container {
          background: rgb(249 248 246);
          border-radius: 0.5rem;
          width: 90vw;

          max-width: 920px;

          display: grid;
          place-items: center;
          position: relative;
        }
        .close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          font-size: 2rem;
          background: transparent;
          border-color: transparent;
          color: hsl(360, 67%, 44%);
          cursor: pointer;
          transition: all 0.3s linear;
        }
        .close-btn:hover {
          color: hsl(360, 71%, 66%);
          transform: scale(1.3);
        }
      `}</style>
    </div>
    // <div className="row">
    //   <div className="col-sm-8 mb-4">
    //     <div className="card card-address">
    //       <div className="card-body">
    //         <h5 className="card-title text-uppercase">Profile Details</h5>
    //         <p>
    //           {user && user.customer.name}
    //           <br />
    //           {user && user.customer.email}
    //           <br />
    //           {user && user.customer.address}
    //           <br />
    //           {user && user.customer.phone}
    //           <br />
    //         </p>
    //         <a href="#" className="btn btn-link btn-secondary btn-underline">
    //           Edit <i className="far fa-edit"></i>
    //         </a>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    // <form className="form" onSubmit={accountHandleSubmit}>
    //   <div className="row">
    //     <div className="col-sm-6">
    //       <label>Name *</label>
    //       <input
    //         type="text"
    //         className="form-control"
    //         name="name"
    //         value={account.name}
    //         required=""
    //         onChange={accountInputHandler}
    //       />
    //     </div>
    //     <div className="col-sm-6">
    //       <label>Email</label>
    //       <input
    //         className="form-control"
    //         value={user && user.customer.email}
    //         readOnly
    //       />
    //     </div>
    //   </div>
    //   <div className="row">
    //     <div className="col-sm-6">
    //       <label>Address *</label>
    //       <textarea
    //         type="text"
    //         className="form-control"
    //         name="address"
    //         required=""
    //         value={account.address}
    //         onChange={accountInputHandler}
    //       ></textarea>
    //     </div>
    //     <div className="col-sm-6">
    //       <label>Phone *</label>
    //       <input
    //         className="form-control"
    //         value={user && user.customer.phone}
    //         readOnly
    //       />
    //     </div>
    //   </div>

    //   {/*
    //   <label>Email Address *</label>
    //   <input type="email" className="form-control" name="email" required="" /> */}
    //   {/* <fieldset>
    //     <legend>Password Change</legend>
    //     <label>Current password (leave blank to leave unchanged)</label>
    //     <input
    //       type="password"
    //       className="form-control"
    //       name="current_password"
    //     />

    //     <label>New password (leave blank to leave unchanged)</label>
    //     <input type="password" className="form-control" name="new_password" />

    //     <label>Confirm new password</label>
    //     <input
    //       type="password"
    //       className="form-control"
    //       name="confirm_password"
    //     />
    //   </fieldset> */}

    //   <button type="submit" className="btn btn-primary">
    //     SAVE CHANGES
    //   </button>
    // </form>
  );
};

export default AccountDetails;
