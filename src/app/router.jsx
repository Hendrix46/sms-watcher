import {createBrowserRouter, Navigate} from "react-router-dom";
import {ROUTES} from "@/constants/routes.js";
import {lazy, Suspense} from "react";
import TemplateMatcherForm from "@/components/form/TemplateMatcherForm.jsx";
import MainLayout from "@/components/layout/MainLayout.jsx";
import FileUpload from "@/components/FileUpload/FileUpload.jsx";
import {Login} from "@/components/auth/Login.jsx";

const routes = [
    {
      element: <MainLayout />,
      children: [
          {
              path: ROUTES.SMS_CHECKER,
              element: <TemplateMatcherForm />,
          },
          {
              path: ROUTES.FILE_UPLOAD,
              element: <FileUpload />,
          },
          {
              path: '/',
              element: <Navigate to={ROUTES.SMS_CHECKER} replace />,
          },
      ]
    },
    // {
    //   path: ROUTES.LOGIN,
    //   element: <Login />
    // },
    {
        path: '*',
        element: <Suspense fallback={<p>loading ...</p>}><TemplateMatcherForm /></Suspense>,
    },
];

export const router = createBrowserRouter(routes);