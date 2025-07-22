import { createFileRoute } from "@tanstack/react-router";
import ArticaleForm from '@/components/pagesComponents/articles'
//FileRoutesByPath 
export const Route = createFileRoute("/_main/articles/add/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ArticaleForm />;
}
