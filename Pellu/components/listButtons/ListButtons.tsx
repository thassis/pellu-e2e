import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import Text from '../text/Text';
import MaterialCommunityIcons from "@react-native-vector-icons/material-design-icons";
import styles from './styles';
import Colors from '../../utils/Colors';
import Loading from '../loading/Loading';

type ListButtonProps = {
  title: string;
  icon: React.ReactNode;
  description?: string;
  onPress: () => void;
  onDelete?: () => void;
};

const ListButton = ({
  title,
  icon,
  description,
  onPress,
  onDelete,
}: ListButtonProps) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={styles.rowContainer}>
        <View style={styles.row}>
          {icon}
          <View>
            <Text style={styles.text}>{title}</Text>
            {!!description && (
              <Text style={styles.textDescription}>{description}</Text>
            )}
          </View>
        </View>
        {onDelete ? (
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={24}
            color={Colors.error}
            onPress={() => onDelete()}
          />
        ) : (
          <MaterialCommunityIcons name="chevron-right" size={24} />
        )}
      </View>
    </TouchableOpacity>
  );
};

type ListButtonsProps<T> = {
  data: T[];
  loading?: boolean;
  getKey?: (item: T) => string | number;
  getTitle: (item: T) => string;
  getIcon: (item: T) => React.ReactNode;
  handlePressItem?: (item: T) => void;
  handleDeleteItem?: (item: T) => void;
  getDescription?: (item: T) => string;
  onEndReached?: () => void;
};

export const ListButtons = <T,>({
  data,
  loading = false,
  getKey,
  getTitle,
  getIcon,
  getDescription,
  handlePressItem,
  handleDeleteItem,
  onEndReached,
}: ListButtonsProps<T>) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => (getKey ? String(getKey(item)) : getTitle(item))}
        renderItem={({ item }) => (
          <ListButton
            key={getKey ? String(getKey(item)) : getTitle(item)}
            title={getTitle(item)}
            icon={getIcon(item)}
            description={getDescription ? getDescription(item) : ''}
            onPress={() => handlePressItem && handlePressItem(item)}
            onDelete={handleDeleteItem ? () => handleDeleteItem(item) : undefined}
          />
        )}
        ListFooterComponent={<Loading loading={loading} />}
        contentContainerStyle={{ paddingTop: 16 }}
        onEndReached={onEndReached}
        scrollEnabled
      />
    </View>
  );
};

export default ListButtons;
