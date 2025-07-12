import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import FeaturedCarousel from '../components/FeaturedCarousel'
import GenderShowcase from '../components/GenderShowcase'

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedCarousel />
      <GenderShowcase />
      <LatestCollection />
      <OurPolicy />
      <NewsLetterBox />
    </div>
  )
}

export default Home
