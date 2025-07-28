import { createFileRoute } from "@tanstack/react-router";
import ArticaleForm from '@/components/pagesComponents/articles';

export const Route = createFileRoute("/_main/articles/add/")({
  component: ArticaleForm,
});
