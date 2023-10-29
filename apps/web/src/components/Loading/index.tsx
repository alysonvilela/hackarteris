'use client';

import Lottie from 'lottie-react';

import loading from './loading_animation.json';

export const LoadingAnimation = () => {
  return (
    <div className=" min-w-full h-full grid place-items-center">
      <div className="max-w-sm max-h-sm">
        <Lottie animationData={loading} loop={true} />
      </div>
    </div>
  );
};
