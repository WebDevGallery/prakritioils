// Home.js
import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';
import SkeletonLoader from '../components/SkeletonLoader'; // Import the skeleton loader

const CategoryList = lazy(() => import('../components/CategoryList'));
const BannerProduct = lazy(() => import('../components/BannerProduct'));
const HorizontalCardProduct = lazy(() => import('../components/HorizontalCardProduct'));
const VerticalCardProduct = lazy(() => import('../components/VerticalCardProduct'));

const Home = () => {
  return (
    <div className=''>
      <Suspense fallback={<SkeletonLoader />}>
        <CategoryList />
        <BannerProduct />
        <HorizontalCardProduct category={"Oils"} heading={"Healthy Wood Pressed Oils"} />
        <HorizontalCardProduct category={"Jaggery"} heading={"Try Out Jaggery"} />
        <VerticalCardProduct category={"Spices"} heading={"Home Made Aromatic Spices"} />
        <VerticalCardProduct category={"Home Made Powders"} heading={"Home Made Powders"} />
        <HorizontalCardProduct category={"Snacks"} heading={"Try Out Some Healthy and Tasty Snacks"} />
        <HorizontalCardProduct category={"Millets"} heading={"Try Out These Fresh Millets"} />
        <VerticalCardProduct category={"Salt"} heading={"Salts"} />
        <VerticalCardProduct category={"Pickles & Chutney"} heading={"Spice Up Your Life with Every Bite"} />
        <HorizontalCardProduct category={"Honey"} heading={"Pure Sweetness from Nature's Nectar"} />
        <HorizontalCardProduct category={"Aromatic Oils"} heading={"Essence of Tranquility in Every Drop"} />
        <VerticalCardProduct category={"Ghee"} heading={"Pure Goodness, Rich Tradition"} />
      </Suspense>
    </div>
  );
}

export default Home;
