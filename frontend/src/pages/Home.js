import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"category1"} heading={"Enter your Category name here"}/>
      <HorizontalCardProduct category={"category2"} heading={"Enter your Category name here"}/>
      <VerticalCardProduct category={"category3"} heading={"Enter your Category name here"}/>
      <VerticalCardProduct category={"category4"} heading={"Enter your Category name here"}/>
      
    </div>
  )
}

export default Home