import {
    createBrowserRouter,
    LoaderFunctionArgs,
    redirect,
  } from "react-router-dom";
  import { Home } from "../views/Home";
  import { Login } from "../views/Login";
  
  const router = createBrowserRouter([
    {
      id: "root",
      path: "/",
      Component: Home,
    },
    {
      path: "/login",
      Component: Login
    },
  ]);
  
//   function protectedLoader({ request }: LoaderFunctionArgs) {
//     // If the user is not logged in and tries to access `/protected`, we redirect
//     // them to `/login` with a `from` parameter that allows login to redirect back
//     // to this page upon successful authentication
//     if (!token.getAuthorization()) {
//       let params = new URLSearchParams();
//       params.set("from", new URL(request.url).pathname);
//       return redirect("/login?" + params.toString());
//     }
//     return null;
//   }
  
  export default router;
  