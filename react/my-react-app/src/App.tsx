import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { queryClient } from './app/queryClient'
import { AuthProvider } from './features/auth/context/AuthProvider'
import { ProtectedRoute } from './features/auth/components/ProtectedRoute'
import { RequireRole } from './features/auth/components/RequireRole'
import { PreferencesProvider } from './features/preferences/context/PreferencesProvider'
import { AppLayout } from './layouts/AppLayout'

const DashboardPage = lazy(() =>
  import('./pages/DashboardPage').then((module) => ({ default: module.DashboardPage })),
)
const PostsPage = lazy(() =>
  import('./pages/PostsPage').then((module) => ({ default: module.PostsPage })),
)
const CreatePostPage = lazy(() =>
  import('./pages/CreatePostPage').then((module) => ({ default: module.CreatePostPage })),
)
const EditPostPage = lazy(() =>
  import('./pages/EditPostPage').then((module) => ({ default: module.EditPostPage })),
)
const PostDetailPage = lazy(() =>
  import('./pages/PostDetailPage').then((module) => ({ default: module.PostDetailPage })),
)
const UsersPage = lazy(() =>
  import('./pages/UsersPage').then((module) => ({ default: module.UsersPage })),
)
const UserDetailPage = lazy(() =>
  import('./pages/UserDetailPage').then((module) => ({ default: module.UserDetailPage })),
)
const TodosPage = lazy(() =>
  import('./pages/TodosPage').then((module) => ({ default: module.TodosPage })),
)
const LoginPage = lazy(() =>
  import('./pages/LoginPage').then((module) => ({ default: module.LoginPage })),
)
const UnauthorizedPage = lazy(() =>
  import('./pages/UnauthorizedPage').then((module) => ({ default: module.UnauthorizedPage })),
)
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })),
)
//defines route tree
const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <AppLayout />,
        children: [
/*
      index: true makes Dashboard the default child route.
*/
          { index: true, element: <DashboardPage /> },
          { path: 'posts', element: <PostsPage /> },
          {
            element: <RequireRole allowedRoles={['admin']} />,
            children: [
              { path: 'posts/new', element: <CreatePostPage /> },
              { path: 'posts/:postId/edit', element: <EditPostPage /> },
            ],
          },
/*
:postId is a dynamic route segment.
*/
          { path: 'posts/:postId', element: <PostDetailPage /> },
          { path: 'users', element: <UsersPage /> },
          { path: 'users/:userId', element: <UserDetailPage /> },
          { path: 'todos', element: <TodosPage /> },
          { path: 'unauthorized', element: <UnauthorizedPage /> },
/*
      path: '*' catches unknown URLs.
*/
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
])

function App() {
  //connects router to react
  return (
    <AuthProvider>
      <PreferencesProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
      </PreferencesProvider>
    </AuthProvider>
  )
}

export default App
