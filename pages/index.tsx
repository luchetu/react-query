import React, { useEffect } from 'react'
import Head from 'next/head';
import DefaultLayout from '../template/default';
import { Breadcrumb } from 'antd';
import Link from "next/link";
import { useStore } from '../store/store.js';



const Index: React.FC = () => {

  return (
    <>
      <Head>
        <title>LByte</title>

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