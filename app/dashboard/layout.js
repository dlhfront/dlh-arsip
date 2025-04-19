import ProtectedRoute from "../components/ProtectedRoute";
import SideNavbar from "../components/SideNavbar";

const RecordsLayout = ({ children }) => {
  return (
    <ProtectedRoute>
      <div className="flex w-full h-screen">
        <SideNavbar />
        <div className="overflow-y-scroll">{children}</div>
      </div>
    </ProtectedRoute>
  );
};

export default RecordsLayout;
