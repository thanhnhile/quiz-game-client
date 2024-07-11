import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import { PUBLIC_ROUTES, USER_ROUTES, RouteItem } from "./route";

function App() {
  const createRoute = (routes: RouteItem[], layout: any) => {
    const Layout = layout || Fragment;
    return routes?.map((route) => {
      return (
        <Route
          path={route.path}
          element={
            <Layout>
              <route.component />
            </Layout>
          }
        />
      );
    });
  };
  return (
    <div className='App'>
      <Routes>
        {createRoute(PUBLIC_ROUTES, null)}
        {createRoute(USER_ROUTES, null)}
      </Routes>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        theme='dark'
        pauseOnHover
        transition={Zoom}
      />
    </div>
  );
}

export default App;
