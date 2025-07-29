import BranchForm from "@/components/pagesComponents/branches";
import { createFileRoute } from "@tanstack/react-router";
//FileRoutesByPath 
export const Route = createFileRoute("/_main/branches/add/")({
  component: RouteComponent,
});

function RouteComponent() {
  // throw new Error('swsw')
  return < BranchForm/>;
}
