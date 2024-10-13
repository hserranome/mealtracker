import { Ionicons } from '@expo/vector-icons';
import React, { ComponentProps, useState, useCallback, useEffect, useMemo } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { useDebounce } from 'use-debounce';

import { Button, ButtonType } from '../Button';
import { ListItem, ListItemType } from '../ListItem';

type SearchScreenButtonType = {
  icon: ComponentProps<typeof Button>['icon'];
  label: string;
  onPress?: () => void;
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
    <ListItem
      item={item}
      accentColor={accentColor}
      listActionIcon={listActionIcon}
      listActionOnPress={listActionOnPress}
      onPressItem={onPressItem}
    />
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
            autoFocus
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
                icon={button.icon}
                onPress={button.onPress}
                style={{ backgroundColor: accentColor }}
                justify="left"
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
