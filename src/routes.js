/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Product from "views/productPage/ProductPage"
import {Category} from "views/categoryPage/CategoryPage"
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/transaksi",
    name: "Kasir",
    icon: "ni ni-cart text-dark",
    component: Product,
    layout: "/admin"
  },
  {
    path: "/product",
    name: "Tambahkan Paket",
    icon: "ni ni-bag-17 text-red",
    component: Product,
    layout: "/admin"
  },
  {
    path: "/category",
    name: "Category",
    icon: "ni ni-collection text-yellow",
    component: Category,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin"
  },
  // {
  //   path: "/login",
  //   name: "LoginPage",
  //   icon: "ni ni-key-25 text-info",
  //   component: LoginPage,
  //   layout: "/auth"
  // }
];
export default routes;
