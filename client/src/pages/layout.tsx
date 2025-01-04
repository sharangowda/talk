import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/toaster";

export default function Layout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          <div className="text-2xl ml-10 lg:ml-28 lg:text-4xl lg:font-extrabold lg:mb-2">
            {title}
          </div>
          {children}
        </main>
        <Toaster />
      </SidebarProvider>
    </>
  );
}
//<footer className="w-full flex justify-end">
//  <ModeToggle />
//</footer>
