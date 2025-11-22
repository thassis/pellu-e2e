import React from 'react';
import { G, Path, Svg } from 'react-native-svg';

type CommentIconProps = {
  size?: number;
  color?: string;
};

const CommentIcon = ({ size = 24, color = '#333' }: CommentIconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
      <G
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"></G>
      <G id="SVGRepo_iconCarrier">
        <G id="style=linear">
          <G id="comment">
            <Path
              id="vector"
              d="M1.98608 11.1034C1.98608 13.3236 2.78607 15.376 4.13153 16.9992C5.93153 19.238 8.78608 20.6746 11.9861 20.6746C11.9861 20.6746 15.5028 21.9659 17.8427 22.4553C18.6528 22.6248 19.5517 22.0692 19.5517 21.3173C19.5517 20.4026 17.9861 18.753 17.9861 18.753C19.1009 17.959 20.033 16.9462 20.7162 15.7808C21.526 14.3994 21.9861 12.8036 21.9861 11.1034C21.9861 9.39876 21.5255 7.7997 20.7162 6.41587C19.9666 5.13402 18.9178 4.03683 17.6588 3.21143C16.0406 2.12931 14.0952 1.51367 11.9861 1.51367C6.45881 1.51367 1.98608 5.80475 1.98608 11.1034Z"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"></Path>
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default CommentIcon;
