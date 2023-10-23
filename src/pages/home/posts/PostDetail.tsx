import React from 'react';
import Wrapper from '../../../components/Wrapper';
import UserProfile from '../../../components/UserProfile';
import styled from 'styled-components';

const PostDetail = () => {
  return (
    <Wrapper>
      <h1>Firebase란?</h1>
      <UserProfileBox>
        <UserProfile name='yerin lee' date='2023-10-23' />
      </UserProfileBox>
      <PostUtilBox>
        <UtilButton href='#'>수정</UtilButton>
        <UtilButton href='#'>삭제</UtilButton>
      </PostUtilBox>
      <Content>
        firebase가 무엇일까요?
      </Content>
      <Subject>
        댓글입력
      </Subject>
      <Textarea placeholder='댓글을 입력해주세요.' />
      <ButtonArea>
        <Button>입력</Button>
      </ButtonArea>

      <CommentList>
        {[...Array(10)].map(() => {
          return (
            <CommentItem>
              <UserProfile name='yerin lee' date='2023-10-23' />
              <UserComment>안녕하세요</UserComment>
            </CommentItem>
          );
        })}
      </CommentList>
    </Wrapper>
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
  padding: 20px 0;
  border: 1px solid #ddd;
  border-left: 0;
  border-right: 0;
  margin: 20px 0;
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

const UtilButton = styled.a`
  font-size: 13px;
  color: #bbb;
`;

export default PostDetail;