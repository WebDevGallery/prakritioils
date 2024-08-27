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
    <div className='px-8'>
      <div className='shadow-md p-3'>
        <div className='flex items-center justify-center'>
          <Logo />
        </div>
        <h1 className='flex items-center justify-center pt-6 font-semibold md:text-xl text-lg'>
          WOOD PRESSED OILS, SPICES & MORE
        </h1>
        <div>
          <p className='text-justify text-md md:text-lg pt-4'>
            Prakriti, founded in August 2023, is dedicated to producing high-quality oils using traditional methods that involve pressing seeds or nuts with wooden presses. This process retains the natural flavour, aroma, and nutrients of the oil, making it a popular choice among our customers. In addition to our wood pressed oils, Prakriti offers an array of complementary products to enhance your culinary experience.
          </p>
        </div>
      </div>

      <div className='shadow-md p-3'>
        <h1 className='flex items-center justify-start pt-6 font-semibold text-xl'>What do we offer:</h1>

        <ol>
          <li>
            <div className='p-3'>
              <h1 className='flex items-center justify-start pt-6 font-semibold md:text-xl text-lg'>Sesame oil:</h1>
              <div className='flex justify-evenly flex-col md:flex-row items-center gap-5'>
                <div>
                  <img src={sesame} height={150} width={150} />
                </div>
                <div>
                  <div>
                    <p className='font-semibold'>
                      Rich in flavour and nutrients, our sesame oil is a perfect choice that will go well with a variety of dishes.
                    </p>
                  </div>
                  <div className='p-8'>
                    <ul>
                      <li className='list-disc'>It helps maintain blood sugar levels</li>
                      <li className='list-disc'>Increases good cholesterol levels and reduces bad cholesterol</li>
                      <li className='list-disc'>Can be used for body massage</li>
                      <li className='list-disc'>Very good for skin</li>
                      <li className='list-disc'>Contains anti-cancerous compounds</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ol>

        <ol>
          <li>
            <div className='p-3'>
              <h1 className='flex items-center justify-start pt-6 font-semibold md:text-xl text-lg'>Coconut oil:</h1>
              <div className='flex justify-evenly flex-col md:flex-row items-center gap-5'>
                <div>
                  <img src={coconut} height={150} width={150} />
                </div>
                <div>
                  <div>
                    <p className='font-semibold'>
                      Extracted from dry coconuts (Copra), our coconut oil is renowned for its myriad uses in cooking, skin care, and hair care.
                    </p>
                  </div>
                  <div className='p-8'>
                    <ul>
                      <li className='list-disc'>It improves heart health</li>
                      <li className='list-disc'>Good for weight management</li>
                      <li className='list-disc'>Lowers the risk of chronic diseases</li>
                      <li className='list-disc'>Nourishes skin and hair</li>
                      <li className='list-disc'>Improves insulin sensitivity and blood sugar control</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ol>

        <ol>
          <li>
            <div className='p-3'>
              <h1 className='flex items-center justify-start pt-6 font-semibold md:text-xl text-lg'>Groundnut oil:</h1>
              <div className='flex justify-evenly flex-col md:flex-row items-center gap-5'>
                <div>
                  <img src={groundnut} height={150} width={150} />
                </div>
                <div>
                  <div>
                    <p className='font-semibold'>
                      With its rich, nutty flavour and high smoke point, it’s the favourite among customers for cooking.
                    </p>
                  </div>
                  <div className='p-8'>
                    <ul>
                      <li className='list-disc'>Rich in vitamin E, monosaturated fats, and antioxidants</li>
                      <li className='list-disc'>Supports heart health</li>
                      <li className='list-disc'>Boosts immunity</li>
                      <li className='list-disc'>Helps to stabilize blood sugar levels</li>
                      <li className='list-disc'>Helps in digestion</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ol>

        <ol>
          <li>
            <div className='p-3'>
              <h1 className='flex items-center justify-start pt-6 font-semibold md:text-xl text-lg'>Sunflower oil:</h1>
              <div className='flex justify-evenly flex-col md:flex-row items-center gap-5'>
                <div>
                  <img src={sunflower} height={150} width={150} />
                </div>
                <div>
                  <div>
                    <p className='font-semibold'>
                      Prakriti’s unrefined cold pressed Sunflower oil has a natural aroma and nutrients of the sunflower seeds which offers numerous health benefits.
                    </p>
                  </div>
                  <div className='p-8'>
                    <ul>
                      <li className='list-disc'>High in Vitamin E</li>
                      <li className='list-disc'>Rich in omega-6 fatty acids</li>
                      <li className='list-disc'>Helps to reduce LDL cholesterol levels</li>
                      <li className='list-disc'>Nourishment to the skin</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ol>

        <ol>
          <li>
            <div className='p-3'>
              <h1 className='flex items-center justify-start pt-6 font-semibold md:text-xl text-lg'>Mustard oil:</h1>
              <div className='flex justify-evenly flex-col md:flex-row items-center gap-5'>
                <div>
                  <img src={mustard} height={150} width={150} />
                </div>
                <div>
                  <div>
                    <p className='font-semibold'>
                      Extracted from carefully selected mustard seeds, our mustard oil retains its pungent flavour and nutritional benefits.
                    </p>
                  </div>
                  <div className='p-8'>
                    <ul>
                      <li className='list-disc'>Rich in monounsaturated and polyunsaturated fats</li>
                      <li className='list-disc'>Lowers the risk of heart diseases</li>
                      <li className='list-disc'>Has natural antibacterial and antifungal properties</li>
                      <li className='list-disc'>Helps to clear nasal passages and relieve respiratory symptoms</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li>
            <div className='p-3'>
              <h1 className='flex items-center justify-start pt-6 font-semibold md:text-xl text-lg'>Safflower oil:</h1>
              <div className='flex justify-evenly flex-col md:flex-row items-center gap-5'>
                <div>
                  <img src={safflower} height={150} width={150} />
                </div>
                <div>
                  <div>
                    <p className='font-semibold'>
                      Wood pressing Safflower seeds involves a traditional method to extract the oil without the use of heat or chemicals, thus preserving its natural flavour, aroma, and nutritional benefits.
                    </p>
                  </div>
                  <div className='p-8'>
                    <ul>
                      <li className='list-disc'>Lowers the risk of cardiovascular diseases</li>
                      <li className='list-disc'>Boosts metabolism and reduces body fat</li>
                      <li className='list-disc'>Rich in omega-6 fatty acid</li>
                      <li className='list-disc'>Acts as a natural moisturizer for the skin</li>
                      <li className='list-disc'>Helps to regulate blood sugar levels</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li>
            <div className='p-3'>
              <h1 className='flex items-center justify-start pt-6 font-semibold md:text-xl text-lg'>Neem oil:</h1>
              <div className='flex justify-evenly flex-col md:flex-row items-center gap-5'>
                <div>
                  <img src={neem} height={150} width={150} />
                </div>
                <div>
                  <div>
                    <p className='font-semibold'>
                      Known for its numerous benefits, neem oil has been used in traditional medicine and beauty treatments for centuries.
                    </p>
                  </div>
                  <div className='p-8'>
                    <ul>
                      <li className='list-disc'>Has antibacterial and antifungal properties</li>
                      <li className='list-disc'>Supports healthy skin and hair</li>
                      <li className='list-disc'>Can be used as an insect repellent</li>
                      <li className='list-disc'>Helps to treat acne and skin infections</li>
                      <li className='list-disc'>Used in natural pesticide formulations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li>
            <div className='p-3'>
              <h1 className='flex items-center justify-start pt-6 font-semibold md:text-xl text-lg'>Castor oil:</h1>
              <div className='flex justify-evenly flex-col md:flex-row items-center gap-5'>
                <div>
                  <img src={castor} height={150} width={150} />
                </div>
                <div>
                  <div>
                    <p className='font-semibold'>
                      Derived from castor seeds, this oil has been used for centuries for its health and wellness benefits.
                    </p>
                  </div>
                  <div className='p-8'>
                    <ul>
                      <li className='list-disc'>Rich in ricinoleic acid</li>
                      <li className='list-disc'>Used as a natural laxative</li>
                      <li className='list-disc'>Boosts immune system</li>
                      <li className='list-disc'>Helps to relieve muscle and joint pains</li>
                      <li className='list-disc'>Supports healthy hair growth</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li>
            <div className='p-3'>
              <h1 className='flex items-center justify-start pt-6 font-semibold md:text-xl text-lg'>Hair oil:</h1>
              <div className='flex justify-evenly flex-col md:flex-row items-center gap-5'>
                <div>
                  <img src={hair_oil} height={150} width={150} />
                </div>
                <div>
                  <div>
                    <p className='font-semibold'>
                      A blend of various oils designed to nourish and strengthen your hair naturally.
                    </p>
                  </div>
                  <div className='p-8'>
                    <ul>
                      <li className='list-disc'>Promotes hair growth</li>
                      <li className='list-disc'>Reduces dandruff and scalp infections</li>
                      <li className='list-disc'>Moisturizes and strengthens hair</li>
                      <li className='list-disc'>Prevents hair loss</li>
                      <li className='list-disc'>Gives your hair a natural shine</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li>
            <div className='p-3'>
              <h1 className='flex items-center justify-start pt-6 font-semibold md:text-xl text-lg'>Almond oil:</h1>
              <div className='flex justify-evenly flex-col md:flex-row items-center gap-5'>
                <div>
                  <img src={almond} height={150} width={150} />
                </div>
                <div>
                  <div>
                    <p className='font-semibold'>
                      Made from the pressing of sweet almonds, this oil is rich in vitamins, minerals, and essential fatty acids.
                    </p>
                  </div>
                  <div className='p-8'>
                    <ul>
                      <li className='list-disc'>Promotes heart health</li>
                      <li className='list-disc'>Supports healthy skin</li>
                      <li className='list-disc'>May reduce the risk of chronic diseases</li>
                      <li className='list-disc'>Good for weight management</li>
                      <li className='list-disc'>Rich in antioxidants</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li>
            <div className='p-3'>
              <h1 className='flex items-center justify-start pt-6 font-semibold md:text-xl text-lg'>Eucalyptus oil:</h1>
              <div className='flex justify-evenly flex-col md:flex-row items-center gap-5'>
                <div>
                  <img src={eucalyptus} height={150} width={150} />
                </div>
                <div>
                  <div>
                    <p className='font-semibold'>
                      This essential oil is derived from the leaves of the eucalyptus tree and has a variety of health benefits.
                    </p>
                  </div>
                  <div className='p-8'>
                    <ul>
                      <li className='list-disc'>Helps to clear nasal congestion</li>
                      <li className='list-disc'>Has antibacterial and antiviral properties</li>
                      <li className='list-disc'>Used in aromatherapy for relaxation</li>
                      <li className='list-disc'>Supports respiratory health</li>
                      <li className='list-disc'>Can be used as an insect repellent</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li>
            <div className='p-3'>
              <h1 className='flex items-center justify-start pt-6 font-semibold md:text-xl text-lg'>Lamp oil:</h1>
              <div className='flex justify-evenly flex-col md:flex-row items-center gap-5'>
                <div>
                  <img src={lamp_oil} height={150} width={150} />
                </div>
                <div>
                  <div>
                    <p className='font-semibold'>
                      Traditionally used in lamps, our oil is pure and perfect for use in religious and cultural practices.
                    </p>
                  </div>
                  <div className='p-8'>
                    <ul>
                      <li className='list-disc'>Made from pure ingredients</li>
                      <li className='list-disc'>Burns with a clean, bright flame</li>
                      <li className='list-disc'>Long-lasting and efficient</li>
                      <li className='list-disc'>Free from additives and chemicals</li>
                      <li className='list-disc'>Can be used in various traditional practices</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  )
}

export default AboutUs
