import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

function Slider({ slidersList }) {
  return (
    <div className="px-9 md:px-16">
      <Carousel>
        <CarouselContent>
          {slidersList?.map((slider) => (
            <CarouselItem key={slider?.id} asChild>
              <Image
                src={
                  process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                  slider?.attributes.image?.data[0]?.attributes?.url
                }
                alt="slider"
                width={1000}
                height={400}
                unoptimized={true}
                className="w-full h-[200px] object-center md:h-[400px] object-contain md:object-cover rounded-2xl"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default Slider;
