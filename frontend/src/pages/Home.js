import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';
import SkeletonLoader from '../components/SkeletonLoader'; // Import the skeleton loader
import NatureImageCard from '../components/NatureImageCard';
import imagesrc from '../assets/banners/desk/desk6.jpg'
import NatureImageCardright from '../components/NaturalImageCardright';
import imagesrc2 from '../assets/cow.png'
import imagesrc3 from '../assets/spices.png'
import imagesrc4 from '../assets/honey.png'
import WhatsAppChat from '../components/Whatsapp';

const CategoryList = lazy(() => import('../components/CategoryList'));
const BannerProduct = lazy(() => import('../components/BannerProduct'));
const HorizontalCardProduct = lazy(() => import('../components/HorizontalCardProduct'));
const VerticalCardProduct = lazy(() => import('../components/VerticalCardProduct'));

const generateFallingLeaves = () => {
  const leaves = [];
  for (let i = 0; i < 10; i++) { // Generate 10 leaves
    leaves.push(<div key={i} className="leaf" style={{ left: `${Math.random() * 100}vw`, animationDelay: `${Math.random() * 5}s` }} />);
  }
  return leaves;
};

const Home = () => {
  return (
    
    <div className='main'>
      <WhatsAppChat/>
      <Helmet>
        <title>Nature's Products</title>
      </Helmet>
      <Suspense fallback={<SkeletonLoader />}>
        <CategoryList />
        <NatureImageCard
        imageSrc={imagesrc}
        imageAlt="Beautiful Nature"
        heading="Explore the Pureness of Natural Wood pressed Oils"
        description="Wood pressed oils are extracted using traditional wooden mills, preserving their natural nutrients, flavor, and aroma. These oils are free from chemicals and retain a rich, authentic taste, making them a healthier choice for cooking."
        category ='Oils'
        catdis='Healthy Wood Pressed Oils'
      />
        <VerticalCardProduct category={"Oils"} heading={"More Wood Pressed Oils"} />
        <HorizontalCardProduct category={"Jaggery"} heading={"Try Out Jaggery"} />
        <NatureImageCardright
        imageSrc={imagesrc2}
        imageAlt="Beautiful Nature"
        heading="Pure Desi Ghee"
        description="Our Desi cow ghee is a traditional clarified butter made from the milk of grass-fed cows, known for its rich aroma and golden hue. It is packed with essential nutrients, promoting digestion, boosting immunity, and enhancing overall well-being."
        category ="Ghee"
        catdis='Pure Goodness, Rich Tradition'
      />
        
        <VerticalCardProduct category={"Home Made Powders"} heading={"Home Made Powders"} />
        <HorizontalCardProduct category={"Snacks"} heading={"Try Out Some Healthy and Tasty Snacks"} />

        <NatureImageCard
        imageSrc={imagesrc3}
        imageAlt="Beautiful Nature"
        heading="Aromatic Spices"
        description="Our Aromatic spices are rich in flavor and fragrance, adding depth and warmth to culinary dishes. These spices not only enhance taste but also offer numerous health benefits through their natural medicinal properties."
        category ='Spices'
        catdis=''
      />
        <HorizontalCardProduct category={"Millets"} heading={"Try Out These Fresh Millets"} />
        <VerticalCardProduct category={"Salt"} heading={"Salts"} />
        <VerticalCardProduct category={"Pickles & Chutney"} heading={"Spice Up Your Life with Every Bite"} />
        <NatureImageCardright
        imageSrc={imagesrc4}
        imageAlt="Honeycomb"
        heading="Pure Honey"
        description="Natural sweetener produced by bees from flower nectar, known for its golden color and rich, smooth texture. Packed with antioxidants and antibacterial properties, honey offers numerous health benefits and enhances the flavor of various foods."
        category ="Honey"
        catdis="Pure Sweetness from Nature's Nectar"
      />
        <HorizontalCardProduct category={"Aromatic Oils"} heading={"Essence of Tranquility in Every Drop"} />
        
      </Suspense>
      
      {/* Render falling leaves */}
      <div className="falling-leaves-container">
        {generateFallingLeaves()}
      </div>
    </div>
  );
}

export default Home;
