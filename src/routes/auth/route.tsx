import App from "@/App";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <App>
      <div className="min-h-screen">
        <Outlet />
      </div>
    </App>
  );
}
