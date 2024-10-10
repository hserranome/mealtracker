import { Ionicons } from '@expo/vector-icons';
import React, { ComponentProps, useState, useCallback, useEffect, useMemo } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { useDebounce } from 'use-debounce';

import { Button, ButtonType } from '../Button';

type SearchScreenButtonType = {
  icon: string;
  label: string;
  onPress?: () => void;
};

type ListItemType = {
  id: string;
  name: string;
  brands?: string;
  calories: number;
  weight: number;
};

type SearchScreenProps = {
  buttons?: SearchScreenButtonType[];
  listItems: ListItemType[];
  listTitle?: string;
  listActionIcon?: ComponentProps<typeof Ionicons>['name'];
  listActionOnPress?: (item: ListItemType) => void;
  onPressItem?: (item: ListItemType) => void;
  accentColor: string;
  showSearchMore?: boolean;
  searchMoreLabel?: string;
  onSearchMore?: (query: string) => void;
  onCustomSearch?: (query: string) => void;
  isLoading?: boolean;
};

export const SearchScreen: React.FC<SearchScreenProps> = ({
  buttons,
  listItems: listItemsProp,
  listTitle,
  accentColor,
  listActionIcon = 'heart-circle',
  listActionOnPress,
  onPressItem,
  isLoading = false,
  showSearchMore = false,
  searchMoreLabel = 'Search More',
  onSearchMore,
  onCustomSearch,
}) => {
  const { styles, theme } = useStyles(stylesheet);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300); // 300ms delay

  const listItems = useMemo(
    () =>
      onCustomSearch || debouncedSearchQuery.length < 3
        ? listItemsProp
        : listItemsProp.filter((item) =>
            item.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
          ),
    [onCustomSearch, listItemsProp, debouncedSearchQuery]
  );

  useEffect(() => {
    if (onCustomSearch && debouncedSearchQuery.trim().length >= 3) {
      onCustomSearch(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery, onCustomSearch]);

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const renderListItem = ({ item }: { item: ListItemType }) => (
    <View style={styles.listItem}>
      <View>
        <Text style={styles.listItemName}>{item.name}</Text>
        <Text
          style={
            styles.listItemDetails
          }>{`${item.brands ? item.brands + ' - ' : ''}${item.calories} kcal`}</Text>
        <TouchableOpacity
          style={styles.editContainer}
          disabled={!onPressItem}
          onPress={onPressItem ? () => onPressItem(item) : undefined}
          hitSlop={30}>
          <Ionicons name="pencil-outline" size={12} color={theme.colors.base800} />
          <Text style={styles.listItemWeight}>{`${item.weight}g`}</Text>
        </TouchableOpacity>
      </View>

      {!!listActionOnPress && (
        <TouchableOpacity style={styles.addButton} onPress={() => listActionOnPress(item)}>
          <Ionicons name={listActionIcon} size={24} color={accentColor} />
        </TouchableOpacity>
      )}
    </View>
  );

  const renderFooter = () => {
    if (!showSearchMore) return null;
    return (
      <View style={styles.searchMoreButtonContainer}>
        <Button
          title={searchMoreLabel}
          type={ButtonType.Ghost}
          icon="search-outline"
          onPress={() => onSearchMore && onSearchMore(searchQuery)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={accentColor} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor={theme.colors.base600}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>
      {buttons && (
        <View style={styles.buttonsWrapper}>
          {buttons.map((button, index) => (
            <View key={index} style={styles.buttonContainer}>
              <Button
                title={button.label}
                type={ButtonType.Ghost}
                icon={button.icon as any}
                onPress={button.onPress}
                style={{ backgroundColor: accentColor }}
                justify="left"
                grow
              />
            </View>
          ))}
        </View>
      )}
      <View style={styles.listContainer}>
        {listTitle && <Text style={styles.listTitle}>{listTitle}</Text>}
        {isLoading ? <ActivityIndicator style={styles.loadingIndicator} /> : null}
        <FlatList
          data={listItems}
          renderItem={renderListItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
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
  buttonsWrapper: {
    paddingTop: theme.margins[16],
    paddingHorizontal: theme.margins[16],
    paddingBottom: theme.margins[14],
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.base900,
    gap: theme.margins[12],
  },
  buttonContainer: {
    flexBasis: '48%',
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
  searchMoreButtonContainer: {
    marginTop: theme.margins[16],
    marginBottom: theme.margins[16],
    marginHorizontal: theme.margins[16],
  },
  loadingIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
