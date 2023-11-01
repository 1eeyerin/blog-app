import React from "react";
import styled from "styled-components";

interface UserProfileProps {
  name: string,
  date: string
}

const UserProfile = ({ name, date }: UserProfileProps) => {
  return (
    <ProfileGroup>
      <ProfileImage> </ProfileImage>
      <UserName>{name}</UserName>
      <Date>{date}</Date>
    </ProfileGroup>
  );
};

const ProfileGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ProfileImage = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #efefef;
`;

const UserName = styled.p`
  font-size: 14px;
  font-weight: bold;
`;

const Date = styled.time`
  font-size: 13px;
  color: #666;
`;

export default UserProfile;
