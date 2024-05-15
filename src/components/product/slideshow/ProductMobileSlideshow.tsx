'use client'

import { Autoplay, FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import './slideshow.css'
import { ProductImage } from '@/components'

interface ProductSlideshowProps {
  images: string[]
  title: string
  className?: string
}

const swiperStyle: Record<string, string> = {
  // width: '100vw',
  height: '500px'
}

export const ProductMobileSlideshow = ({ images, title, className }: ProductSlideshowProps) => {
  return (
    <div className={className}>
      <Swiper
        style={swiperStyle}
        spaceBetween={10}
        navigation={true}
        pagination
        autoplay={{
          delay: 2500
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay, Pagination]}
        className="mySwiper2"
      >

        {
          images.map(image => (
            <SwiperSlide key={image}>
              <ProductImage
                width={600}
                height={500}
                src={image}
                alt={title}
                className='object-fill'
              />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}
