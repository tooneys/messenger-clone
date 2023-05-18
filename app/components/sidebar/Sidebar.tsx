import DesktopSidebar from "./DesktopSidebar";

const SideBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <DesktopSidebar />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
};

export default SideBar;
