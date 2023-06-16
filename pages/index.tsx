import React, { useEffect } from 'react'
import Head from 'next/head';
import DefaultLayout from '../template/default';
import { Breadcrumb } from 'antd';
import Link from "next/link";
import { useStore } from '../store/useStore';



const Index: React.FC = () => {

  const token = useStore(state => state.token);
  useEffect(() => {
    if (!token) {
      // Redirect to the login page on the client-side
      window.location.href = '/login/login';
    }
  }, [token]);



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

export default Index