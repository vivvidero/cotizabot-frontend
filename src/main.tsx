import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { ErrorPage } from './components/index.ts';
import { MainCreate, MainUpdate, UsedCreate, VisCreate } from './pages/index.ts';
import { VisUpdate } from './pages/UpdateItems/VisUpdate.tsx';
import { UsedUpdate } from './pages/UpdateItems/UsedUpdate.tsx';
import { Render } from './pages/Render/Render.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'create-items',
        element: <MainCreate />,
        children: [
          {
            path: 'vis',
            element: <VisCreate />
          },
          {
            path: 'used',
            element: <UsedCreate />
          }
        ]
      },
      {
        path: 'update-items',
        element: <MainUpdate />,
        children: [
          {
            path: 'vis',
            element: <VisUpdate />
          },
          {
            path: 'used',
            element: <UsedUpdate />
          }
        ]
      },
      {
        path: 'render',
        element: <Render />
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
