import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { userGuard } from './core/guards/user/user.guard';
import { loggedGuard } from './core/guards/logged/logged.guard';

export const routes: Routes = [
  {path:"",redirectTo: "/home",pathMatch: "full"},
  {path: "",component: BlankComponent,canActivate: [userGuard],children: [
    {path:"home",loadComponent:() => import("./pages/home/home.component").then((c) => c.HomeComponent),title: "Home"},
    {path:"cart",loadComponent:() => import("./pages/cart/cart.component").then((c) => c.CartComponent),title: "Cart"},
    {path:"products",loadComponent:() => import("./pages/products/products.component").then((c) => c.ProductsComponent),title: "Products"},
    {path:"categories",loadComponent:() => import("./pages/categories/categories.component").then((c) => c.CategoriesComponent),title: "Categories"},
    {path:"allorders",loadComponent:() => import("./pages/all-orders/all-orders.component").then((c) => c.AllOrdersComponent),title: "All Orders"},
    {path:"checkout/:id",loadComponent:() => import("./pages/cheackout/cheackout.component").then((c) => c.CheackoutComponent),title: "Check Out"},
    {path:"brands",loadComponent:() => import("./pages/brands/brands.component").then((c) => c.BrandsComponent),title: "Brands"},
    {path:"details/:id",loadComponent:() => import("./pages/details/details.component").then((c) => c.DetailsComponent),title: "Datails"},
  ]},
  {path: '',component: AuthComponent,canActivate: [loggedGuard],children: [
    {path: 'login',loadComponent:() => import("./pages/log-in/log-in.component").then((c) => c.LogInComponent),title: 'Log In'},
    {path: 'forgot',loadComponent:() => import("./shared/components/ui/forgot/forgot.component").then((c) => c.ForgotComponent),title: 'Forgot password?'},
    {path: 'register',loadComponent:() => import("./pages/register/register.component").then((c) => c.RegisterComponent),title: 'Register'},
    {path: '**',loadComponent:() => import("./pages/not-found/not-found.component").then((c) => c.NotFoundComponent),title: '404'},
  ]}
];
