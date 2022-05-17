import React from 'react';

import { CardSimple } from 'components/Card';

const Post = ({ post }) => (
  <CardSimple
    loading={!post?.name}
    content={{
      title: post.title,
      name: post.name,
      link: `/posts/${post._id}`,
      img: post.selectedFile,
      description: post.message.split(' ').splice(0, 20).join(' '),
    }}
  />
);

export default Post;
