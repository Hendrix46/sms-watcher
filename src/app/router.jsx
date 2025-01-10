import {createBrowserRouter, Navigate} from "react-router-dom";
import {ROUTES} from "@/constants/routes.js";
import TemplateMatcherForm from "@/components/form/TemplateMatcherForm.jsx";
import MainLayout from "@/components/layout/MainLayout.jsx";
import FileUpload from "@/components/FileUpload/FileUpload.jsx";

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
        element:  <Navigate to={ROUTES.SMS_CHECKER} replace />,
    },
];

export const router = createBrowserRouter(routes);