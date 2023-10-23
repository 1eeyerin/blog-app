import React from 'react';
import PostList from '../../components/PostList';
import Wrapper from '../../components/Wrapper';

const Home = () => {
  return (
    <Wrapper>
      <PostList hasNavigation />
    </Wrapper>
  );
};


export default Home;