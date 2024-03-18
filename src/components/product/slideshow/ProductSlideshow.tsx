'use client'

import Image from 'next/image'
import { useState } from 'react'
import { type Swiper as SwiperObject } from 'swiper'
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import './slideshow.css'

interface ProductSlideshowProps {
  images: string[]
  title: string
  className?: string
}

export const ProductSlideshow = ({ images, title, className }: ProductSlideshowProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>()

  // const swiperStyle: Record<string, string> = {
  //   '--swiper-navigation-color': '#fff',
  //   '--swiper-pagination-color': '#fff'
  // }

  return (
    <div className={className}>
      <Swiper
        // style={swiperStyle}

        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 2500
        }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >

        {
          images.map(image => (
            <SwiperSlide key={image}>
              <Image
                width={1024}
                height={800}
                src={`/products/${image}`}
                unoptimized={true}
                alt={title}
                className='rounded-lg object-fill'
              />
            </SwiperSlide>
          ))
        }
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper'
      >
        {
          images.map(image => (
            <SwiperSlide key={image}>
              <Image
                width={300}
                height={300}
                src={`/products/${image}`}
                unoptimized={true}
                alt={title}
                className='rounded-lg object-fill'
              />
            </SwiperSlide>

          ))
        }
      </Swiper>
    </div>
  )
}
