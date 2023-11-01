import React, { useEffect, useState } from "react";
import UserProfile from "components/UserProfile";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "context/AuthContext";
import { PostProps } from "components/PostList";
import { db } from "../firebaseApp";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Loader from "components/Loader";

const PostDetail = () => {
  const [post, setPost] = useState<PostProps | null>(null);
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");

    if (confirm && post && post.id) {
      await deleteDoc(doc(db, "posts", post.id));
      toast.success("게시글을 삭제했습니다.");
      navigate("/");
    }
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [params?.id]);

  if (!post) {
    return (
      <Loader />
    );
  }


  return (
    <>
      <h1>{post?.title} {post?.updatedAt && <EditedPostText>(수정됨)</EditedPostText>}</h1>
      <UserProfileBox>
        <UserProfile name={post?.email} date={post?.createdAt} />
      </UserProfileBox>
      {post?.uid === user?.uid &&
        <PostUtilBox>
          <UtilLink to={`/posts/edit/${post?.id}`}>수정</UtilLink>
          <UtilButton type="button" onClick={handleDelete}>삭제</UtilButton>
        </PostUtilBox>
      }
      <Content>
        {post?.content}
      </Content>
      <Subject>
        댓글입력
      </Subject>
      <Textarea placeholder="댓글을 입력해주세요." />
      <ButtonArea>
        <Button>입력</Button>
      </ButtonArea>

      <CommentList>
        {[...Array(10)].map((num, index) => {
          return (
            <CommentItem key={`${num}${index}`}>
              <UserProfile name="yerin lee" date="2023-10-23" />
              <UserComment>안녕하세요</UserComment>
            </CommentItem>
          );
        })}
      </CommentList>
    </>
  );
};

const UserComment = styled.p`
  margin: 15px 0 0 35px;
  font-size: 14px;
`;

const CommentItem = styled.li`
  padding-bottom: 20px;
  border-bottom: 1px solid #eaeaea;
`;

const CommentList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 80px;
  padding-bottom: 60px;
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  background: #5b7dbd;
  color: #ffffff;
  padding: 10px 30px;
  border-radius: 2px;
  border: 0;
`;

const Subject = styled.strong`

`;

const Textarea = styled.textarea`
  border: 1px solid #ddd;
  width: 100%;
  resize: none;
  padding: 20px;
  border-radius: 2px;
  margin: 10px 0;
`;

const Content = styled.div`
  color: #666666;
  padding: 90px 0;
  border: 1px solid #ddd;
  border-left: 0;
  border-right: 0;
  margin: 20px 0 60px;
`;

const UserProfileBox = styled.div`
  margin-top: 20px;
`;

const PostUtilBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  margin-top: 15px;
`;

const UtilButton = styled.button`
  font-size: 13px;
  color: #bbb;
`;

const UtilLink = styled(Link)`
  font-size: 13px;
  color: #bbb;
`;

const EditedPostText = styled.span`
  font-size: 13px;
  color: #ccc;
  margin-left: 5px;
`;

export default PostDetail;