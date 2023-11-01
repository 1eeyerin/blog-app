import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextField from "components/TextField";
import TextAreaField from "components/TextAreaField";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "firebaseApp";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useAuthContext } from "context/AuthContext";
import { CATEGORIES, CategoryType, PostProps } from "components/PostList";
import SelectField from "components/SelectField";

const onCreateAt = () => {
  return new Date()?.toLocaleDateString("ko", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
};

const PostForm = () => {
  const params = useParams();
  const [post, setPost] = useState<PostProps | null>(null);
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<CategoryType>("Frontend");

  const navigate = useNavigate();
  const { user } = useAuthContext();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const createdAt = onCreateAt();

    try {
      if (post && post.id) {
        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, {
          title,
          summary,
          content,
          updatedAt: createdAt,
          category
        });
        toast?.success("게시글을 수정했습니다.");
        navigate(`/posts/${post.id}`);

      } else {
        await addDoc(collection(db, "posts"), {
          title,
          summary,
          content,
          createdAt,
          email: user?.email,
          uid: user?.uid,
          category
        });

        toast?.success("게시글을 생성했습니다.");
        navigate("/posts");
      }
    } catch (e: any) {
      console.log(e);
      toast?.error(e?.code);
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const {
      target: { name, value }
    } = e;

    if (name === "title") {
      setTitle(value);
    }

    if (name === "summary") {
      setSummary(value);
    }

    if (name === "content") {
      setContent(value);
    }

    if (name === "category") {
      setCategory(value as CategoryType);
    }
  };

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) });
    }
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [params?.id]);

  useEffect(() => {
    if (post && user) {
      if (post.uid === user.uid) {
        setTitle(post?.title);
        setSummary(post?.summary);
        setContent(post?.content);
        setCategory(post?.category as CategoryType);
      } else {
        navigate("/");
        toast.error("접근 불가능한 페이지 입니다.");
      }
    }
  }, [navigate, post, user]);


  return (
    <FormWrapper onSubmit={onSubmit}>
      <TextField
        label="제목"
        id="title"
        name="title"
        onChange={onChange}
        value={title}
        required
      />
      <SelectField
        label="카테고리"
        id="category"
        name="category"
        defaultValue={category}
        onChange={onChange}
        categories={CATEGORIES}
      />
      <TextField
        label="요약"
        id="summary"
        name="summary"
        onChange={onChange}
        value={summary}
        required
      />
      <TextAreaField
        label="내용"
        id="content"
        name="content"
        onChange={onChange}
        value={content}
        required
      />
      <Button type="submit">
        {params?.id ? "수정" : "제출"}하기
      </Button>
    </FormWrapper>
  );
};

const Button = styled.button`
  background: #5b7dbd;
  color: #ffffff;
  padding: 10px 30px;
  border-radius: 2px;
  border: 0;
  width: 100%;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export default PostForm;