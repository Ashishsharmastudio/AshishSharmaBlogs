// Home.jsx

import React, { useContext } from 'react';
import { Context } from '../../main';
import HeroSection from '../minicomponents/HeroSection';
import TrendingBlogs from '../minicomponents/TrendingBlogs';
import LatestBlog from '../minicomponents/LatestBlog';
import PopularAuthors from '../minicomponents/PopularAuthors';

const Home = () => {
  const { mode, blogs } = useContext(Context);
  const filteredBlogs = blogs.slice(0, 6);

  return (
    <article className={mode === 'dark' ? 'dark-bg' : 'light-bg'}>
      <HeroSection />
      <TrendingBlogs />
      <LatestBlog blogs={filteredBlogs} heading="Latest Blogs" />
      <PopularAuthors />
    </article>
  );
};

export default Home;
