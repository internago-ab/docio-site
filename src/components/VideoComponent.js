// src/components/VideoComponent.js
import React from 'react';

const VideoComponent = ({ src, alt }) => (
    <video width="100%" controls>
      <source src={src} type="video/mp4" />
      {alt && <track kind="captions" />}
      Your browser does not support the video tag.
    </video>
  );
  

export default VideoComponent;
