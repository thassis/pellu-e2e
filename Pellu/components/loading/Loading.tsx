import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import Colors from '../../utils/Colors';
import {ActivityIndicatorProps} from 'react-native';

type LoadingProps = ActivityIndicatorProps & {
  loading: boolean;
  center?: boolean;
  color?: string;
};

const Loading = ({loading, center, color, ...props}: LoadingProps) => {
  if (!loading) return null;
  return (
    <ActivityIndicator
      {...props}
      color={color || Colors.gray}
      style={[
        props.style,
        center
          ? {flex: 1, justifyContent: 'center', alignItems: 'center'}
          : undefined,
      ]}
    />
  );
};

export default Loading;
