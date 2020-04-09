import React from 'react';
import Layout from '../components/layout';
import usePosts from '../hooks/use-posts';
import PostPreview from '../components/post-preview';
import Insta from '../components/insta';
import Contact from '../components/contact';

export default ({ location, data }) => {
  const posts = usePosts();

  return (
    <Layout location={location}>
      <h1>ASIYA ASHA</h1>
      <p>--------------------</p>
      <p>What I've been doing..</p>
      {posts.map(post => (
        <PostPreview key={post.slug} post={post} />
      ))}
      <Contact />
    </Layout>
  );
};
