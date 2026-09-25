import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div>
        {/* 
        Outlet is the placeholder where
        the child route will be rendered.
      */}
      <Outlet />
    
    </div>
  );
};

export default PublicLayout;