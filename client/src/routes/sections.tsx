import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';
import SplashScreen from 'src/shared/components/splash-screen';

// ----------------------------------------------------------------------

export const DashboardPage = lazy(() => import('src/pages/dashboard'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const CustomerPage = lazy(() => import('src/pages/customers'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const CategoriesPage = lazy(() => import('src/pages/categories'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const ProductsFormPage = lazy(() => import('src/pages/product-modify'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

const renderFallback = () => <SplashScreen />;

export const routesSection: RouteObject[] = [
  {
    element: (
      <DashboardLayout>
        <Suspense fallback={renderFallback()}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'user', element: <UserPage /> },
      { path: 'categories', element: <CategoriesPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/new', element: <ProductsFormPage key="new" /> },
      { path: 'products/:id', element: <ProductsFormPage /> },
      { path: 'customers', element: <CustomerPage /> },
      { path: 'blog', element: <BlogPage /> },
    ],
  },
  {
    path: 'sign-in',
    element: (
      <AuthLayout>
        <SignInPage />
      </AuthLayout>
    ),
  },
  {
    path: '404',
    element: <Page404 />,
  },
  { path: '*', element: <Page404 /> },
];
