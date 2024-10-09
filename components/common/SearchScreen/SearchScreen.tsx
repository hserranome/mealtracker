import { Ionicons } from '@expo/vector-icons';
import React, { ComponentProps } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type ButtonType = {
  icon: string;
  label: string;
  onPress?: () => void;
};

type ListItemType = {
  id: string;
  name: string;
  brands: string;
  calories: number;
  weight: number;
};

type SearchScreenProps = {
  buttons: ButtonType[];
  listItems: ListItemType[];
  listTitle: string;
  listActionIcon?: ComponentProps<typeof Ionicons>['name'];
  listActionOnPress?: (item: ListItemType) => void;
  onPressItem?: (item: ListItemType) => void;
  accentColor: string;
};

export const SearchScreen: React.FC<SearchScreenProps> = ({
  buttons,
  listItems,
  listTitle,
  accentColor,
  listActionIcon = 'heart-circle',
  listActionOnPress,
  onPressItem,
}) => {
  const { styles, theme } = useStyles(stylesheet);

  const renderListItem = ({ item }: { item: ListItemType }) => (
    <View style={styles.listItem}>
      <TouchableOpacity
        disabled={!onPressItem}
        onPress={onPressItem ? () => onPressItem(item) : undefined}>
        <Text style={styles.listItemName}>{item.name}</Text>
        <Text style={styles.listItemDetails}>{`${item.brands} - ${item.calories} kcal`}</Text>
        <View style={styles.editContainer}>
          <Ionicons name="pencil-outline" size={12} color={theme.colors.base800} />
          <Text style={styles.listItemWeight}>{`${item.weight}g`}</Text>
        </View>
      </TouchableOpacity>

      {!!listActionOnPress && (
        <TouchableOpacity style={styles.addButton} onPress={() => listActionOnPress(item)}>
          <Ionicons name={listActionIcon} size={24} color={accentColor} />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={accentColor} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor={theme.colors.base600}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, { backgroundColor: accentColor }]}
            onPress={button.onPress}>
            <Ionicons name={button.icon as any} size={32} color={theme.colors.foreground} />
            <Text style={styles.buttonText}>{button.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>{listTitle}</Text>
        <FlatList
          data={listItems}
          renderItem={renderListItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchWrapper: {
    backgroundColor: theme.colors.base900,
    paddingHorizontal: theme.margins[16],
    paddingBottom: theme.margins[16],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.base200,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.base200,
    borderRadius: theme.radius[5],
    paddingHorizontal: theme.margins[12],
  },
  searchIcon: {
    marginRight: theme.margins[8],
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: theme.colors.foreground,
    ...theme.fonts.body.m,
  },
  buttonContainer: {
    paddingTop: theme.margins[16],
    paddingHorizontal: theme.margins[16],
    paddingBottom: theme.margins[14],
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.base900,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.radius[5],
    paddingVertical: theme.margins[10],
    paddingHorizontal: theme.margins[12],
    width: '48%',
    marginBottom: theme.margins[12],
  },
  buttonText: {
    ...theme.fonts.heading.xxs,
    textAlign: 'center',
    color: theme.colors.foreground,
    marginLeft: theme.margins[8],
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  listTitle: {
    ...theme.fonts.heading.xs,
    color: theme.colors.foreground,
    paddingTop: theme.margins[16],
    paddingHorizontal: theme.margins[16],
    paddingBottom: theme.margins[8],
    borderBottomColor: theme.colors.base200,
    borderBottomWidth: 1,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.margins[8],
    paddingHorizontal: theme.margins[16],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.base200,
  },
  listItemName: {
    ...theme.fonts.body.m,
    color: theme.colors.foreground,
  },
  listItemDetails: {
    ...theme.fonts.body.xs,
    color: theme.colors.base600,
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.margins[4],
  },
  editButton: {
    padding: theme.margins[4],
  },
  listItemWeight: {
    ...theme.fonts.body.xs,
    color: theme.colors.base600,
  },
  addButton: {
    padding: theme.margins[8],
  },
}));
