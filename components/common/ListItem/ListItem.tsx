import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export type ListItemType = {
  id: string;
  name?: string;
  subtitle?: string;
  mainValue?: number;
  secondaryValue?: number;
  unit?: string;
};

type ListItemProps = {
  item: ListItemType;
  accentColor: string;
  listActionIcon?: React.ComponentProps<typeof Ionicons>['name'];
  listActionOnPress?: (item: ListItemType) => void;
  onPressItem?: (item: ListItemType) => void;
};

export const ListItem: React.FC<ListItemProps> = ({
  item,
  accentColor,
  listActionIcon = 'heart-circle',
  listActionOnPress,
  onPressItem,
}) => {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <View style={styles.listItem}>
      <View>
        <Text style={styles.listItemName}>{item.name}</Text>
        {item.subtitle && <Text style={styles.listItemDetails}>{item.subtitle}</Text>}
        <TouchableOpacity
          style={styles.editContainer}
          disabled={!onPressItem}
          onPress={() => onPressItem?.(item)}
          hitSlop={30}>
          <Ionicons name="pencil-outline" size={12} color={theme.colors.base800} />
          <Text style={styles.listItemWeight}>
            {item.mainValue} {item.unit}
          </Text>
        </TouchableOpacity>
      </View>

      {!!listActionOnPress && (
        <TouchableOpacity style={styles.addButton} onPress={() => listActionOnPress(item)}>
          <Ionicons name={listActionIcon} size={24} color={accentColor} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
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
  listItemWeight: {
    ...theme.fonts.body.xs,
    color: theme.colors.base600,
  },
  addButton: {
    padding: theme.margins[8],
  },
}));
