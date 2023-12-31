import { Outlet } from "react-router-dom";

import Header from "../components/Header";

function MainLayout() {
  return (
    <div className="page">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
