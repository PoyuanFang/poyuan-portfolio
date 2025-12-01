'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaOptionsType } from 'embla-carousel'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

type PropType = {
  slides: string[]
  options?: EmblaOptionsType
}

const ProjectImageCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className="relative group">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((src, index) => (
            <div className="flex-grow-0 flex-shrink-0 w-full aspect-[16/9]" key={index}>
              <img
                className="w-full h-full object-cover"
                src={src}
                alt={`Project image ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Prev/Next Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <button
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
          className="w-12 h-12 rounded-full bg-black/30 text-white flex items-center justify-center disabled:opacity-20 hover:bg-black/50 transition-colors interactive pointer-events-auto"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={scrollNext}
          disabled={nextBtnDisabled}
          className="w-12 h-12 rounded-full bg-black/30 text-white flex items-center justify-center disabled:opacity-20 hover:bg-black/50 transition-colors interactive pointer-events-auto"
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-colors ${index === selectedIndex ? 'bg-white' : 'bg-white/50'
              }`}
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectImageCarousel