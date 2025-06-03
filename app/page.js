import Image from "next/image";
import CardRecord from "./components/molecules/CardRecord";
import SideNavbar from "./components/SideNavbar";

export default function Home() {
  return (
    <div className="flex w-full h-screen">
      <SideNavbar />
      <div>
        <h1>Dashboard</h1>
        {/* <h2 className="text-2xl font-bold text-center">Total Record</h2>
        <div className="grid grid-cols-3 gap-4">
          <CardRecord></CardRecord>
          <CardRecord></CardRecord>
          <CardRecord></CardRecord>
          <CardRecord></CardRecord>
          <CardRecord></CardRecord>
        </div> */}
      </div>
    </div>
  );
}
