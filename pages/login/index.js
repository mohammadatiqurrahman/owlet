import React, { useEffect } from "react";
import LoginSign from "../../components/login/LoginSign";
import { useUserContext } from "../../context/user_context";
import { useRouter } from "next/router";
import { based_url } from "../../utils/constants";
import Loading from "../../components/Loading";
import Head from "next/head";
import LoginService from "../../services/LoginService";
const Login = ({ locations }) => {
  const { user } = useUserContext();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);
  if (user) {
    return <Loading />;
  }
  return (
    <React.Fragment>
      <Head>
        <title>Log in | The Owlet</title>
      </Head>
      <main className="main">
        <div className="page-content mt-6 pb-2 mb-10">
          <div className="container" style={{ marginTop: "50px" }}>
            <LoginSign locations={locations} />
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};
export const getStaticProps = async () => {
  const locations = await LoginService.instance.getLocationList();

  return {
    props: {
      locations,
    },
    // revalidate: 10,
  };
};
export default Login;
