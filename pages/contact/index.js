import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import Contact from "../../models/contact";
import ContactService from "../../services/ContactService";
const index = () => {
  // Input fields
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  // Input error handler
  const [contactError, setContactError] = useState({
    nameError: "",
    emailError: "",
    phoneError: "",
    messageError: "",
    contactSuccess: "",
  });

  useEffect(() => {
    if (contactError.contactSuccess) {
      // Show notification after success sending message
      toast.success(`${contactError.contactSuccess}`);
    }
  }, [contactError.contactSuccess]);

  // Storing form input
  const contactInputHandler = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setContact({ ...contact, [name]: value });
  };

  // Submit form
  const contactHandler = async (e) => {
    e.preventDefault();
    if (!contact.name || !contact.email || !contact.phone || !contact.message) {
      setContactError({
        ...contactError,
        nameError: contact.name ? "" : "The name field is required.",
        emailError: contact.name ? "" : "The email field is required.",
        phoneError: contact.phone ? "" : "The phone field is required.",
        messageError: contact.message ? "" : "The Message field is required.",
      });
      return;
    }
    const contactInformation = new Contact(
      contact.name,
      contact.email,
      contact.phone,
      contact.message
    );
    const contactResponse =
      await ContactService.instance.postContactInformation(contactInformation);
    if (contactResponse.message) {
      setContactError({
        ...contactError,
        contactSuccess: contactResponse.message,
      });
      setContact({
        ...contact,
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } else {
      setContactError({
        ...contactError,
        nameError: contactResponse.errors.name
          ? contactResponse.errors.name[0]
          : "",
        phoneError: contactResponse.errors.phone
          ? contactResponse.errors.phone[0]
          : "",
        emailError: contactResponse.errors.email
          ? contactResponse.errors.email[0]
          : "",
        messageError: contactResponse.errors.message
          ? contactResponse.errors.message[0]
          : "",
      });
    }
  };

  // Header and title
  const headerAndTitle = () => {
    return (
      <Head>
        <title>Contact Us | The Owlet</title>
      </Head>
    );
  };
  // Address
  const address = () => {
    return (
      <div className="col-lg-3 col-md-4 col-sm-6 ls-m mb-4">
        <div className="grey-section d-flex align-items-center h-100">
          <div>
            <h4 className="mb-2 text-capitalize">Headquarters</h4>
            <p>
              1600 Amphitheatre Parkway
              <br />
              New York WC1 1BA
            </p>

            <h4 className="mb-2 text-capitalize">Phone Number</h4>
            <p>
              <a href="tel:#">1.800.458.56</a>
              <br />
              <a href="tel:#">1.800.458.56</a>
            </p>

            <h4 className="mb-2 text-capitalize">Support</h4>
            <p className="mb-4">
              <a href="#">support@your-domain.com</a>
              <br />
              <a href="#">help@your-domain.com</a>
              <br />
              <a href="#">Sale</a>
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Contact Form
  const contactForm = () => {
    return (
      <form className="pl-lg-2" onSubmit={contactHandler}>
        <h4 className="ls-m font-weight-bold">Let’s Connect</h4>
        <p>
          Your email address will not be published. Required fields are marked *
        </p>
        <div className="row mb-2">
          <div className="col-md-4 mb-4">
            <input
              className="form-control"
              type="text"
              placeholder="Name *"
              name="name"
              onChange={contactInputHandler}
              value={contact.name}
              onKeyUp={() =>
                contactError.nameError &&
                setContactError({
                  ...contactError,
                  nameError: "",
                })
              }
            />
            <div
              style={{
                display: contactError.nameError ? "block" : "none",

                color: " #cb2431",
                marginLeft: "5px",
              }}
            >
              {contactError.nameError ? contactError.nameError : ""}
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <input
              className="form-control"
              type="text"
              placeholder="Email *"
              name="email"
              onChange={contactInputHandler}
              value={contact.email}
              onKeyUp={() =>
                contactError.emailError &&
                setContactError({
                  ...contactError,
                  emailError: "",
                })
              }
            />
            <div
              style={{
                display: contactError.emailError ? "block" : "none",

                color: " #cb2431",
                marginLeft: "5px",
              }}
            >
              {contactError.emailError ? contactError.emailError : ""}
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <input
              className="form-control"
              type="text"
              placeholder="Phone Number *"
              name="phone"
              onChange={contactInputHandler}
              value={contact.phone}
              onKeyUp={() =>
                contactError.phoneError &&
                setContactError({
                  ...contactError,
                  phoneError: "",
                })
              }
            />
            <div
              style={{
                display: contactError.phoneError ? "block" : "none",

                color: " #cb2431",
                marginLeft: "5px",
              }}
            >
              {contactError.phoneError ? contactError.phoneError : ""}
            </div>
          </div>
          <div className="col-12 mb-4">
            <textarea
              className="form-control"
              placeholder="Write your message*"
              name="message"
              onChange={contactInputHandler}
              value={contact.message}
              onKeyUp={() =>
                contactError.messageError &&
                setContactError({
                  ...contactError,
                  messageError: "",
                })
              }
            ></textarea>
            <div
              style={{
                display: contactError.messageError ? "block" : "none",

                color: " #cb2431",
                marginLeft: "5px",
              }}
            >
              {contactError.messageError ? contactError.messageError : ""}
            </div>
          </div>
        </div>
        <button className="btn btn-dark btn-rounded">
          Send Message<i className="d-icon-arrow-right"></i>
        </button>
        <ToastContainer />
      </form>
    );
  };
  return (
    <React.Fragment>
      {headerAndTitle()}
      <main className="main">
        <div className="page-content mt-10 pt-7">
          <section className="contact-section">
            <div className="container">
              <div className="row">
                {address()}
                <div className="col-lg-9 col-md-8 col-sm-6 d-flex align-items-center mb-4">
                  <div className="w-100">{contactForm()}</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </React.Fragment>
  );
};

export default index;
