
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Product from "views/productPage/ProductPage"
import {Category} from "views/categoryPage/CategoryPage"
import {KasirPage} from "views/kasirPage/KasirPage"
import {BannerPage} from "views/bannerManagement/BannerPage"
import StoreSettings from "views/storeSettings/StoreSettins"
import {ExportPage} from "views/export/ExportData";
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
    icon: "ni ni-cart text-primary",
    component: KasirPage,
    layout: "/admin"
  },
  {
    path: "/product",
    name: "Tambahkan Paket",
    icon: "ni ni-bag-17 text-primary",
    component: Product,
    layout: "/admin"
  },
  {
    path: "/category",
    name: "Kategori",
    icon: "ni ni-collection text-primary",
    component: Category,
    layout: "/admin"
  },
  {
    path: "/banner",
    name: "Banner Manajemen",
    icon: "ni ni-bulb-61 text-primary",
    component: BannerPage,
    layout: "/admin"
  },

  {
    path: "/laporan",
    name: "Data Laporan",
    icon: "ni ni-books text-primary",
    component: ExportPage,
    layout: "/admin"
  },

  {
    path: "/settings",
    name: "Store Settings",
    icon: "ni ni-settings text-primary",
    component: StoreSettings,
    layout: "/admin"
  },
  
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/admin"
  // },

  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Profile,
  //   layout: "/admin"
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/admin"
  // },
  // {
  //   path: "/login",
  //   name: "LoginPage",
  //   icon: "ni ni-key-25 text-info",
  //   component: LoginPage,
  //   layout: "/auth"
  // }
];
export default routes;
