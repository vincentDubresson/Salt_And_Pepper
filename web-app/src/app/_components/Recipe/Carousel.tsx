import { PICTURES_RECIPE_TYPE } from '@/app/_lib/_type/RecipeTypes';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

export default function Carousel({ recipePictures }: { recipePictures: PICTURES_RECIPE_TYPE }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: '0px',
    centerMode: true,
    nextArrow: <></>,
    prevArrow: <></>,
  };

  

  return (
    <div className="xl:max-w-xl m-auto">
      <Slider {...settings}>
        {recipePictures?.map((picture) => (
          <div key={picture.node.sort} className="cursor-grab focus:cursor-grabbing">
            <img src={process.env.NEXT_PUBLIC_API_RECIPE_PICTURE_URL + '/re/' + picture.node.pictureName} alt=""/>
          </div>
        ))}
      </Slider>
    </div>
  );
}
