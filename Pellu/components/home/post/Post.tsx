import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Easing, Pressable, Share, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
// import YoutubePlayer from "react-native-youtube-iframe";

import { default as Ionicons, default as MaterialDesignIcon } from '@expo/vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { AppState } from 'react-native';
import CommentIcon from '../../../assets/svg/comment.icon';
import Avatar from '../../../components/avatar/Avatar';
import { useBottomSheet } from '../../../components/bottomSheet/BottomSheetContext';
import ImageUri from '../../../components/imageUri/ImageUri';
import Text from '../../../components/text/Text';
import { BASE_URL } from '../../../env';
import useLogin from '../../../hooks/useLogin';
import { logEvent } from '../../../logs/analytics';
import { HomeService } from '../../../services/home';
import { IPost } from '../../../types/post.type';
import { getPublishedAtFromId } from '../../../utils/Date';
import { useStore } from '../../../zustand/useStore';
import Carousel from '../picturesCarousel/Carousel';
import PollQuestions from '../pollQuestions/pollQuestions';
import styles from './styles';

let lastTap = 0;
let lastImage = '';

type PostProps = {
  post: IPost;
  showActions?: boolean;
  visiblePostId?: string;
};

const { height } = Dimensions.get('window');
const videoHeight = height * 0.8;

const Post = ({ post, visiblePostId, showActions = true }: PostProps) => {
  const { userAuthenticated } = useStore(state => ({
    userAuthenticated: state.user,
  }));
  const { requireLogin } = useLogin();

  const { description, numberComments, pictures, user, youtubeVideoId } = post;
  const { openSheet } = useBottomSheet();
  const isFocused = useIsFocused();
  const { navigate } = useRouter();

  const [likedPost, setLikedPost] = useState(post.isLiked);
  const [showHeart, setShowHeart] = useState(false);
  const scaleValue = useRef(new Animated.Value(0)).current;
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state: any) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'background') {
        setPlaying(false);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const onChangeLike = () => {
    requireLogin(
      () => {
        setLikedPost(!likedPost);
        HomeService.postLike(post._id, !likedPost);
      },
      'Login necessário',
      'Faça login para curtir um post'
    );
  };

  const handleDoubleTap = (image: string) => {
    requireLogin(
      () => {
        const now = Date.now();
        if (image === lastImage && now - lastTap < 300) {
          if (!likedPost) {
            HomeService.postLike(post._id, !likedPost);
            setLikedPost(true);
          }
          animateHeart();
        }
        lastTap = now;
        lastImage = image;
      },
      'Login necessário',
      'Faça login para curtir um post'
    );
  };

  const animateHeart = () => {
    setShowHeart(true);
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.delay(300),
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(() => setShowHeart(false));
  };

  const shareApp = async () => {
    logEvent('share_post_home', { post_id: post._id });

    await Share.share({
      message: `Confira esse incrível rede social sobre pets! Baixe aqui: ${BASE_URL}`,
    });
  };

  const goToProfile = async () => {
    logEvent('go_to_profile_from_post', { userId: post.userId });

    if (userAuthenticated?._id === post.userId) {
      console.log('navigate to authenticated', userAuthenticated?._id);
      navigate("profile-authenticated");
    } else {
      console.log('navigate to profile', post.userId);
      navigate({ pathname: "profile", params: { userId: post.userId } });
    }
  }

  useEffect(() => {
    if (visiblePostId === post._id) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }, [visiblePostId]);

  useEffect(() => {
    if (!isFocused) {
      setPlaying(false);
    }
  }, [isFocused]);

  const renderContent = () => {
    if (post.pollQuestions?.length) {
      return (
        <View style={[styles.titleContainer, styles.images]}>
          <PollQuestions
            postId={post._id}
            disabled={!showActions}
            questions={post.pollQuestions}
            votedPollQuestionId={post?.pollQuestionId}
          />
        </View>
      );
    }

    return (
      <View style={styles.images}>
        {youtubeVideoId ? (
          <Pressable
            onPress={() => {
              setPlaying((playing) => !playing);
            }}>
            <View pointerEvents="none" style={{ height: videoHeight, backgroundColor: 'black' }}>
              {/* <YoutubePlayer
                play={playing && visiblePostId === post._id}
                height={videoHeight}
                videoId={youtubeVideoId}
                webViewProps={{
                  injectedJavaScript: `
                  var element = document.getElementsByClassName('container')[0];
                  element.style.position = 'unset';
                  true;
                `,
                }}
                onChangeState={onStateChange}
              /> */}
            </View>

          </Pressable>
        ) : (
          <Carousel
            images={pictures}
            renderImage={(image, defaultWidth, defaultHeight) => {
              return (
                <TouchableWithoutFeedback
                  onPress={() => handleDoubleTap(image)}
                  style={{ width: defaultWidth, height: defaultHeight }}
                >
                  <View style={{ width: defaultWidth, height: defaultHeight }}>
                    <ImageUri
                      size="large"
                      name={image}
                      width={defaultWidth}
                      height={defaultHeight}
                    />
                    {showHeart && (
                      <Animated.View
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: [
                            { translateX: -25 },
                            { translateY: -25 },
                            { scale: scaleValue },
                          ],
                        }}
                      >
                        <MaterialDesignIcon name="heart" size={80} color="red" />
                      </Animated.View>
                    )}
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goToProfile} style={styles.userPostContainer}>
        <Avatar pictureName={user.picture} />
        <Text style={styles.text} medium>{user.name}</Text>
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.decription} numberOfLines={3} seeMore>
          {description}
        </Text>
      </View>

      {renderContent()}

      {showActions && (
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.touchable}
            onPress={onChangeLike}>
            <Ionicons
              name={likedPost ? 'heart' : 'heart-outline'}
              color={likedPost ? 'red' : 'black'}
              size={24}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchable}
            onPress={() => openSheet({
              title: 'Comentários',
              commentData: { postId: post._id },
              type: 'comments',
            })}
          >
            <CommentIcon size={20} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchable}
            onPress={shareApp}
          >
            <Ionicons name={'paper-plane-outline'} color={'black'} size={20} />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.titleContainer}>
        <Text>{getPublishedAtFromId(post._id)}</Text>
      </View>
    </View>
  );
};

export default Post;
