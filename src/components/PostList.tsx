import UserProfile from "./UserProfile";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "firebaseApp";
import { useAuthContext } from "context/AuthContext";
import { User } from "firebase/auth";
import { toast } from "react-toastify";

interface PostListProps {
  hasNavigation?: boolean;
  defaultTab?: TabType | CategoryType;
}

interface FetchDataProps {
  activeTab?: TabType | CategoryType;
  user: User;
}

export interface CommentsInterface {
  content: string;
  uid: string;
  email: string;
  createdAt: string;
}

export interface PostProps {
  id?: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  uid: string;
  category?: CategoryType;
  comments?: CommentsInterface[];
}

type TabType = "all" | "my";

export type CategoryType = "Frontend" | "Backend" | "Web" | "Native";
export const CATEGORIES: CategoryType[] = [
  "Frontend",
  "Backend",
  "Web",
  "Native"
];

const fetchData = async ({ activeTab, user }: FetchDataProps) => {
  const postsRef = collection(db, "posts");
  let postsQuery;

  if (activeTab === "my" && user) {
    postsQuery = query(
      postsRef,
      where("uid", "==", user.uid),
      orderBy("createdAt", "asc")
    );
  } else if (activeTab === "all") {
    postsQuery = query(postsRef, orderBy("createdAt", "desc"));
  } else {
    postsQuery = query(
      postsRef,
      where("category", "==", activeTab),
      orderBy("createdAt", "asc")
    );
  }

  const datas = await getDocs(postsQuery);

  let posts: PostProps[] = [];

  datas?.forEach((doc) => {
    posts.push({
      id: doc.id,
      ...doc.data()
    } as PostProps);
  });

  return posts;
};

const PostList = ({
  hasNavigation = true,
  defaultTab = "all"
}: PostListProps) => {
  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(
    defaultTab
  );
  const [posts, setPosts] = useState<PostProps[]>([]);

  const { user } = useAuthContext() as { user: User };

  const getPosts = async () => {
    const data = await fetchData({ activeTab, user });
    setPosts(data);
  };

  const handleDelete = async (id?: string) => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (confirm && id) {
      await deleteDoc(doc(db, "posts", id));

      toast.success("게시글을 삭제했습니다.");
      getPosts().then(r => r);
    }
  };

  useEffect(() => {
    getPosts().then(r => r);
  }, [activeTab]);

  return (
    <>
      {hasNavigation && (
        <Navigation>
          <li>
            <NavLink
              type="button"
              onClick={() => setActiveTab("all")}
              $active={activeTab === "all"}
            >
              전체
            </NavLink>
          </li>
          <li>
            <NavLink
              type="button"
              $active={activeTab === "my"}
              onClick={() => setActiveTab("my")}
            >
              나의 글
            </NavLink>
          </li>
          {CATEGORIES?.map((category) => (
            <li key={category}>
              <NavLink
                $active={activeTab === category}
                onClick={() => setActiveTab(category)}
              >
                {category}
              </NavLink>
            </li>
          ))}
        </Navigation>
      )}
      {
        posts.length === 0 ? (
          <div>글이 없습니다.</div>
        ) : (
          <List>
            {posts.map((post, index) => {
              const { createdAt, email, title, content } = post;

              return (
                <li key={index}>
                  <ProfileBox>
                    <UserProfile name={email} date={createdAt} />
                  </ProfileBox>
                  <Link to={`/posts/${post?.id}`}>
                    <Subject>{title} <CategoryTitle>{`${post?.category}`}</CategoryTitle></Subject>
                    <Content>{content}</Content>
                  </Link>
                  {post?.uid === user?.uid && (
                    <PostUtilBox>
                      <UtilLink to={`/posts/edit/${post?.id}`}>수정</UtilLink>
                      <UtilButton type="button" onClick={() => handleDelete(post?.id)}>삭제</UtilButton>
                    </PostUtilBox>
                  )}
                </li>
              );
            })}
          </List>
        )}
    </>
  );
};

const CategoryTitle = styled.span`
  display: inline-block;
  vertical-align: top;
  font-size: 12px;
  border: 1px solid #ededed;
  box-sizing: border-box;
  border-radius: 4px;
  color: #888;
  padding: 2px 8px;
  margin-left: 5px;
`;

const ProfileBox = styled.div`
  margin-bottom: 15px;
`;

interface NaviLinkProps {
  $active?: boolean;
}

const NavLink = styled.button<NaviLinkProps>`
  font-weight: bold;
  color: ${(props) => props.$active ? "#222" : "#bbb"}
`;

const Navigation = styled.ul`
  display: flex;
  align-items: center;
  gap: 15px;
  padding-bottom: 15px;
  margin-bottom: 30px;
  border-bottom: 1px solid #efefef;
`;

const Subject = styled.strong`
  display: block;
  font-size: 18px;
  text-align: left;
`;

const Content = styled.p`
  color: #666;
  margin-top: 10px;
  text-align: left;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 15px;
`;

const PostUtilBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  margin-top: 15px;
`;

const UtilLink = styled(Link)`
  font-size: 13px;
  color: #bbb;
`;

const UtilButton = styled.button`
  font-size: 13px;
  color: #bbb;
`;

export default PostList;
