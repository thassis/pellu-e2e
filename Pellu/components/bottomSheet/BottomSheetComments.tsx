import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import React from "react";
import { View } from "react-native";
import InputComment from "../../components/home/inputComment/InputComent";
import useComments from "../../components/home/post/useComments";
import { CommentType } from "../../types/comment.type";
import { getStringDateFromId } from "../../utils/Date";
import Avatar from "../avatar/Avatar";
import Loading from "../loading/Loading";
import Text from "../text/Text";
import { useBottomSheet } from "./BottomSheetContext";
import styles from "./styles";

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
            keyExtractor={(item: any) => item._id.toString()}
            renderItem={({ item }: { item: any }) => renderComment(item)}
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