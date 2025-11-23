import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import React, { useRef, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, ViewToken } from 'react-native';

import Post from '@/components/home/post/Post';
import Loading from '@/components/loading/Loading';
import useHome from '@/hooks/useHome';
import { useStore } from '@/zustand/useStore';
import { useRouter } from 'expo-router';
import LogoHeader from '../../components/logoHeader.tsx/LogoHeader';
import SafeAreaView from '../../components/safeAreaView/SafeAreaView';
import Text from '../../components/text/Text';
import { logEvent } from '../../logs/analytics';
import { IPost } from '../../types/post.type';
import Colors from '../../utils/Colors';

const Header = () => {
  const { navigate } = useRouter();

  const handlePressHelpOng = () => {
    logEvent('help_ong_home');
    navigate('/ong-list');
  }

  return (
    <View style={styles.header}>
      <LogoHeader />
      <TouchableOpacity style={styles.helpBtn} onPress={() => handlePressHelpOng()}>
        <Text bold style={styles.text}>Ajudar ONG</Text>
        <MaterialIcon name="chevron-right" size={24} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen = () => {
  const { loading, fetchNewPosts } = useHome();
  const { posts } = useStore(state => ({
    posts: state.posts,
  }));
  const [visiblePostId, setVisibleVideo] = useState<string>('');
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken<IPost>[] }) => {
    setVisibleVideo(viewableItems[0]?.item._id);
  }).current;

  if (!posts) return <Text>{'Não há nada para ver por aqui :('}</Text>;

  return (
    <SafeAreaView bottom={false} style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={posts || []}
        contentContainerStyle={styles.flatList}
        renderItem={({ item }) => (
          <Post
            post={item}
            visiblePostId={visiblePostId} />
        )
        }
        ListHeaderComponent={() => <Header />}
        ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
        ListFooterComponent={() => (
          <Loading loading={loading} style={styles.loading} color={Colors.black} />
        )}
        onEndReached={() => fetchNewPosts()}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatList: {
    paddingBottom: 58,
  },
  loading: {
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  helpBtn: {
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 8,
    marginRight: 16,
    backgroundColor: Colors.background,
    borderRadius: 12,
    borderWidth: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.primary,
  }
});
