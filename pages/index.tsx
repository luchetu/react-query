import React, { useEffect } from 'react'
import Head from 'next/head';
import DefaultLayout from '../template/default';
import { Breadcrumb } from 'antd';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../utils/redux/slice/auth/authSlice';
import Link from "next/link"


const index = () => {

  // const token = useSelector(selectCurrentToken);
  // const router = useRouter();

  // useEffect(() => {
  //   if (!token) {
  //     // Redirect to the login page on the client-side
  //     window.location.href = '/login/login';
  //   }
  // }, [token]);

  return (
    <>
      <Head>
        <title>KMS</title>

      </Head>
      <DefaultLayout
        title="Dashboard"
        sideMenuCollapsed={true}
        breadCrumbs={
          <>
            <Breadcrumb.Item>
              <Link href="/">Dashboard</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>dashboard</Breadcrumb.Item>
          </>
        }
      >
        {/* <DashboardComponent /> */}
      </DefaultLayout >
    </>

  );

}

export default index