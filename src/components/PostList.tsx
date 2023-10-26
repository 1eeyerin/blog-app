import UserProfile from "./UserProfile";
import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";

const PostList = ({ hasNavigation = true }) => {
  return (
    <>
      {hasNavigation && (
        <Navigation>
          <li><NavLink to="#" $active>전체</NavLink></li>
          <li><NavLink to="#">나의 글</NavLink></li>
        </Navigation>
      )}
      <List>
        {[...Array(10)].map((num) => {
          return (
            <li key={num}>
              <ProfileBox>
                <UserProfile name="yerin lee" date="2023-10-23" />
              </ProfileBox>
              <Link to="/posts/12">
                <Subject>제목1</Subject>
                <Content>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis eum exercitationem, iste
                  iusto
                  libero magnam
                  magni nesciunt officia optio quia, quibusdam repellat saepe sequi, temporibus ullam? Eius perferendis
                  perspiciatis quasi?</Content>
              </Link>
              <PostUtilBox>
                <UtilButton to="#">수정</UtilButton>
                <UtilButton to="#">삭제</UtilButton>
              </PostUtilBox>
            </li>
          );
        })}
      </List>
    </>
  );
};

const ProfileBox = styled.div`
  margin-bottom: 15px;
`;

interface NavLinkProps {
  $active?: boolean;
}

const NavLink = styled(Link)<NavLinkProps>`
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

const UtilButton = styled(Link)`
  font-size: 13px;
  color: #bbb;
`;

export default PostList;
