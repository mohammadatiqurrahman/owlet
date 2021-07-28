import React, { useState } from "react";
import { useUserContext } from "../../context/user_context";

import { useGeneralContext } from "../../context/general_context";
const AccountDetails = () => {
  const { user } = useUserContext();
  const { setChangePasswordModal, setUserProfileEditModal } =
    useGeneralContext();

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
              setUserProfileEditModal(true);
            }}
          >
            Edit Profile <i className="far fa-edit"></i>
          </a>
          <br />
          <a
            className="btn btn-link btn-secondary btn-underline mt-2"
            onClick={() => {
              setChangePasswordModal(true);
            }}
          >
            Edit Password <i className="far fa-edit"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
