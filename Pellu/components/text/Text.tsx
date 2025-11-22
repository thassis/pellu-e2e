import React, { useState, useRef } from 'react';
import {
  NativeSyntheticEvent,
  Text as RNText,
  TextProps as RNTextProps,
  TextLayoutEventData,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';

type TextTypes = 'title' | 'subtitle' | 'h1' | 'delete';

type TextProps = RNTextProps & {
  medium?: boolean;
  bold?: boolean;
  link?: boolean;
  seeMore?: boolean;
  type?: TextTypes;
};

const Text = ({ numberOfLines, type, ...props }: TextProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSeeMore, setShowSeeMore] = useState(false);
  const textRef = useRef(null);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const styleFontWeight = props.medium
    ? styles.textMedium
    : props.bold
      ? styles.textBold
      : styles.text;

  const textStyles = {
    title: styles.pageTitle,
    subtitle: styles.subtitle,
    h1: styles.h1,
    delete: styles.delete,
  };

  const style = (type && textStyles[type]) || styleFontWeight;

  // Função que verifica o layout do texto
  const handleTextLayout = (
    event: NativeSyntheticEvent<TextLayoutEventData>,
  ) => {
    const { lines } = event.nativeEvent;
    if (lines.length > (numberOfLines || 0)) {
      setShowSeeMore(true);
    }
  };

  if (props.link) return <RNText {...props} style={[style, styles.link, props.style]} />;

  return (
    <>
      <RNText
        {...props}
        style={[props.style, style]}
        numberOfLines={isExpanded ? undefined : numberOfLines}
        onTextLayout={handleTextLayout}
        ref={textRef}
      />

      {props.seeMore && showSeeMore && !isExpanded && (
        <TouchableOpacity onPress={toggleExpanded} style={{ marginTop: 2 }}>
          <Text style={props.style} link>
            Veja mais
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default Text;
