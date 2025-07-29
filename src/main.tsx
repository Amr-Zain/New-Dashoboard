import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Tailwind css
import "./main.scss";

// int18
import "./i18n";

// Router
// import { RouterProvider } from 'react-router-dom';
// import router from './router/index';

// Redux
import { Provider } from "react-redux";
import store from "./store/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GeneralApICaller from "./components/generalComponents/layout/GeneralApICaller";
import ThemeCustomizer from "./components/generalComponents/layout/ThemeCustomizer";
// import AOS from "aos";

// import "aos/dist/aos.css";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import LoaderPage from "./components/generalComponents/layout/Loader";
import NotFound from "@/components/generalComponents/Auth/NotFound";
import AppError from "./components/generalComponents/ErrorHandle";
import ErrorPage from "./components/pagesComponents/ErrorPage";
import NetworkWrapper from "./components/generalComponents/NetworkWrapper";
export type RouterContext = {
  queryClient: QueryClient;
};
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultErrorComponent:ErrorPage,
  defaultNotFoundComponent: NotFound,
  defaultPendingComponent: LoaderPage,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
    context: RouterContext;
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Toaster />
        <GeneralApICaller />
        <ThemeCustomizer />
        <NetworkWrapper>
          <RouterProvider router={router} />
        </NetworkWrapper>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
