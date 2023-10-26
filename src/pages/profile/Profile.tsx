import React, { useContext } from "react";
import styled from "styled-components";
import PostList from "components/PostList";
import Wrapper from "components/Wrapper";
import { toast } from "react-toastify";
import { app } from "firebaseApp";
import { getAuth, signOut } from "firebase/auth";
import { useAuthContext } from "context/AuthContext";

const onSignOut = async () => {
  try {
    const auth = getAuth(app);
    await signOut(auth);
    toast.success("로그아웃 되었습니다.");

  } catch (error: any) {
    console.log(error);
    toast.error(error?.code);
  }
};

const Profile = () => {
  const { user } = useAuthContext();

  return (
    <Wrapper>
      <ProfileContainer>
        <ProfileGroup>
          <ProfileImage> </ProfileImage>
          <div>
            <UserId>{user?.email}</UserId>
            <UserName>{user?.displayName || "사용자"}</UserName>
          </div>
        </ProfileGroup>
        <UtilBox>
          <UtilButton type="button" onClick={onSignOut}>
            로그아웃
          </UtilButton>
        </UtilBox>
      </ProfileContainer>
      <PostList hasNavigation={false} />
    </Wrapper>
  );
};

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 25px;
  border-bottom: 1px solid #eaeaea;
  margin-bottom: 60px;
`;

const UtilBox = styled.div`
  display: flex;
  align-items: center;
`;

const UtilButton = styled.button`
  text-decoration: underline;
  font-size: 13px;
`;

const ProfileGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ProfileImage = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #efefef;
`;

const UserName = styled.p`
  font-size: 15px;
  font-weight: bold;
  display: block;
`;

const UserId = styled.time`
  font-size: 15px;
  color: #666;
`;

export default Profile;
