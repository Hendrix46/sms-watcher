import {createBrowserRouter} from "react-router-dom";
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
      ]
    },
    {
      path: ROUTES.LOGIN,
      element: <Login />
    },
    {
        path: '*',
        element: <Suspense fallback={<p>loading ...</p>}><Login />  </Suspense>,
    },
];

export const router = createBrowserRouter(routes);