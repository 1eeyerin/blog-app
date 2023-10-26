import React from "react";
import PostListComponent from "components/PostList";
import Wrapper from "components/Wrapper";

const PostList = () => {
  return (
    <Wrapper>
      <PostListComponent hasNavigation={false} />
    </Wrapper>
  );
};

export default PostList;