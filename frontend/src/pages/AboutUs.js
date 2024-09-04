import React from 'react'
import Logo from '../components/Logo'
import sesame from '../assets/banners/sesame.jpg'
import groundnut from '../assets/banners/groundnut.jpg'
import coconut from "../assets/banners/coconutoil.jpg"
import sunflower from "../assets/banners/sunflower.jpg"
import safflower from "../assets/banners/sunflower.jpg"
import mustard from "../assets/banners/mustard.jpg"
import neem from "../assets/banners/oil.jpg"
import castor from "../assets/banners/caster.jpg"
import hair_oil from "../assets/banners/hairoil.jpg"
import almond from '../assets/banners/oil.jpg'
import eucalyptus from '../assets/banners/oil.jpg'
import lamp_oil from '../assets/banners/lamp.jpg'

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg max-w-4xl mx-auto p-8">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="text-3xl font-semibold text-gray-800 text-center mt-6">
          WOOD PRESSED OILS, SPICES & MORE
        </h1>
        <p className="text-gray-700 text-lg text-justify mt-4">
          Prakriti, founded in August 2023, is dedicated to producing high-quality oils using traditional methods that involve pressing seeds or nuts with wooden presses. This process retains the natural flavour, aroma, and nutrients of the oil, making it a popular choice among our customers. In addition to our wood pressed oils, Prakriti offers an array of complementary products to enhance your culinary experience.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8">What do we offer:</h2>

        {/* Each product section */}
        <div className="mt-8">
          {[
            { title: 'Sesame Oil', img: sesame, benefits: ['It helps maintain blood sugar levels', 'Increases good cholesterol levels and reduces bad cholesterol', 'Can be used for body massage', 'Very good for skin', 'Contains anti-cancerous compounds'] },
            { title: 'Coconut Oil', img: coconut, benefits: ['It improves heart health', 'Good for weight management', 'Lowers the risk of chronic diseases', 'Nourishes skin and hair', 'Improves insulin sensitivity and blood sugar control'] },
            { title: 'Groundnut Oil', img: groundnut, benefits: ['Rich in vitamin E, monosaturated fats, and antioxidants', 'Supports heart health', 'Boosts immunity', 'Helps to stabilize blood sugar levels', 'Helps in digestion'] },
            { title: 'Sunflower Oil', img: sunflower, benefits: ['High in Vitamin E', 'Rich in omega-6 fatty acids', 'Helps to reduce LDL cholesterol levels', 'Nourishment to the skin'] },
            { title: 'Mustard Oil', img: mustard, benefits: ['Rich in monounsaturated and polyunsaturated fats', 'Lowers the risk of heart diseases', 'Has natural antibacterial and antifungal properties', 'Helps to clear nasal passages and relieve respiratory symptoms'] },
            { title: 'Safflower Oil', img: safflower, benefits: ['Lowers the risk of cardiovascular diseases', 'Boosts metabolism and reduces body fat', 'Rich in omega-6 fatty acid', 'Acts as a natural moisturizer for the skin', 'Helps to regulate blood sugar levels'] },
            { title: 'Neem Oil', img: neem, benefits: ['Has antibacterial and antifungal properties', 'Supports healthy skin and hair', 'Can be used as an insect repellent', 'Helps to treat acne and skin infections', 'Used in natural pesticide formulations'] },
            { title: 'Castor Oil', img: castor, benefits: ['Rich in ricinoleic acid', 'Used as a natural laxative', 'Boosts immune system', 'Helps to relieve muscle and joint pains', 'Supports healthy hair growth'] },
            { title: 'Hair Oil', img: hair_oil, benefits: ['Promotes hair growth', 'Reduces dandruff and scalp infections', 'Moisturizes and strengthens hair', 'Prevents hair loss', 'Gives your hair a natural shine'] },
            { title: 'Almond Oil', img: almond, benefits: ['Promotes heart health', 'Supports healthy skin', 'May reduce the risk of chronic diseases', 'Good for weight management', 'Rich in antioxidants'] },
            { title: 'Eucalyptus Oil', img: eucalyptus, benefits: ['Helps to clear nasal congestion', 'Has antibacterial and antiviral properties', 'Used in aromatherapy for relaxation', 'Supports respiratory health', 'Can be used as an insect repellent'] },
            { title: 'Lamp Oil', img: lamp_oil, benefits: ['Made from pure ingredients', 'Burns with a clean, bright flame', 'Long-lasting and efficient', 'Free from additives and chemicals', 'Can be used in various traditional practices'] },
          ].map((product, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-6 mb-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{product.title}</h3>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <img src={product.img} alt={product.title} className="w-40 h-40 object-cover rounded-lg" />
                <ul className="list-disc list-inside text-gray-700 text-md">
                  {product.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AboutUs
