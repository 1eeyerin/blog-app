import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../pages/home";
import Layout from "Layout";
import { Profile } from "pages/profile";
import { PostDetail, PostEdit, PostList, PostNew } from "pages/home/posts";
import { Login } from "pages/login";
import { Signup } from "pages/signup";

const Router = ({ isAuthenticated }: { isAuthenticated: boolean }) => {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/posts">
                <Route path="" element={<PostList />} />
                <Route path=":id" element={<PostDetail />} />
                <Route path="new" element={<PostNew />} />
                <Route path="edit/:id" element={<PostEdit />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;