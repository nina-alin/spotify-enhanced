import React from "react";

import { useSelector } from "react-redux";
import { Autoplay, Grid, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import ArrowIcon from "@/components/common/icons/arrow-icon";
import Error from "@/components/common/states/error";
import Loading from "@/components/common/states/loading";
import TrackCard from "@/components/dashboard/track-card";
import useMediaQuery from "@/hooks/use-media-query";
import { useGetUserQuery, useGetUserTopQuery } from "@/pages/api/user.api";
import { RootState } from "@/store";

export enum Direction {
  Left = "left",
  Right = "right",
}

const TrackCarousel = () => {
  const range = useSelector((state: RootState) => state.globalState.range);

  const { data: user, isLoading, isError } = useGetUserQuery();

  const {
    data: topTracks,
    isLoading: isLoadingTracks,
    isError: isErrorTracks,
  } = useGetUserTopQuery({
    type: "tracks",
    time_range: range,
    limit: 50,
  });

  const isMd = useMediaQuery("(max-width: 768px)");

  if (isError || isErrorTracks) {
    return <Error />;
  }

  if (!user || !topTracks || isLoading || isLoadingTracks) {
    return <Loading />;
  }

  return (
    <div className="col-span-2 mt-16 flex gap-8">
      {!isMd && <ArrowIcon direction={Direction.Left} />}

      <Swiper
        autoplay={{
          pauseOnMouseEnter: true,
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 3,
            grid: {
              rows: 2,
              fill: "row",
            },
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
          1280: {
            slidesPerView: 5,
          },
          1536: {
            slidesPerView: 8,
          },
        }}
        loop
        modules={[Autoplay, Grid, Navigation]}
        navigation={{ nextEl: "#swiper-forward", prevEl: "#swiper-back" }}
        slidesPerView={3}
      >
        {topTracks?.items?.map((track) => (
          <SwiperSlide key={track.id}>
            <TrackCard track={track as SpotifyApi.TrackObjectFull} />
          </SwiperSlide>
        ))}
      </Swiper>

      {!isMd && <ArrowIcon direction={Direction.Right} />}
    </div>
  );
};

export default TrackCarousel;