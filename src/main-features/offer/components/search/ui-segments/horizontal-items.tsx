import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { FreeMode, Pagination, Navigation, Scrollbar } from "swiper";
import {Box} from "@mui/material";
import { ICategory } from "../../../../../shared/model/category.model";
import Typography from "@mui/material/Typography/Typography";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";

const HorizontalItems = ({listCategories}: {listCategories: ICategory[]}) => {

    return (
        <Box className="horizontal-items">
            <Swiper
                slidesPerView={5}
                spaceBetween={30}
                freeMode={true}
                loop={true}
                modules={[FreeMode, Pagination, Navigation, Scrollbar]}
                autoplay={{
                    delay: 8000,
                    disableOnInteraction: false,
                }}
                scrollbar={{
                    hide: true,
                }}
                className="mySwiper"
            >
                {
                    listCategories?.map((item: ICategory, index: number) => (
                        <SwiperSlide key={`category-${index}`}>
                            <Box className="container-img">
                                <img alt="image category" src={item.imageContent || ''}/>
                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                    className="truncate-text">
                                    {item.titleFr}
                                </Typography>
                            </Box>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </Box>
    );
}
export default React.memo(HorizontalItems);
