import React from "react";
import { View } from "react-native";
import Loading from "../loading/Loading";
import styles from "./styles";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import Avatar from "../avatar/Avatar";
import Text from "../text/Text";
import { getStringDateFromId } from "../../utils/Date";
import { CommentType } from "../../types/comment.type";
import InputComment from "../../navigator/stacks/home/homeScreen/components/inputComment/InputComent";
import useComments from "../../navigator/stacks/home/homeScreen/components/post/useComments";
import { useBottomSheet } from "./BottomSheetContext";

type Props = {
  close: () => void;
}

const BottomSheetComments = ({ close }: Props) => {
  const { commentData } = useBottomSheet();
  const postId = commentData?.postId || '';
  const { loading, comments, lastPage, postComment } = useComments(postId);

  const renderComment = (item: CommentType) => {
    return (
      <View style={styles.row}>
        <Avatar pictureName={item.user.picture} />
        <View style={styles.content}>
          <Text style={styles.name} medium>
            {item.user.name}
          </Text>
          <View style={{ paddingRight: 16 }}>
            <Text style={styles.comment}>{item.comment}</Text>
          </View>
          <Text style={styles.publishAt} medium>
            {item._id.includes('local_id')
              ? 'Publicado agora'
              : `Publicado em ${getStringDateFromId(item._id)}`}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.body}>
        {loading ? (
          <Loading loading={loading} center />
        ) : !comments?.length ? (
          <Text style={styles.text}>{'Seja o primeiro a comentar!'}</Text>
        ) : (
          <BottomSheetFlatList
            data={comments}
            keyExtractor={item => item._id.toString()}
            renderItem={({ item }) => renderComment(item)}
            contentContainerStyle={{ backgroundColor: 'white' }}
            ListFooterComponent={() =>
              <View style={{ paddingBottom: 16 }}>
                {!lastPage && <Text>{'Ver mais comentários'}</Text>}
              </View>
            }
          />
        )}
      </View>
      <InputComment
        onSubmitComment={comment => postComment(comment)}
        closeModal={close}
      />
    </>
  )
}

export default BottomSheetComments;