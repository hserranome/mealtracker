import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const buttons = [
  { icon: 'barcode-outline', label: 'Scan Barcode' },
  { icon: 'add-circle-outline', label: 'Quick add' },
  { icon: 'nutrition-outline', label: 'My food' },
  { icon: 'restaurant-outline', label: 'My Recipe' },
];

const historyItems = [
  { name: 'Arroz Basmati', brand: 'Hacendado', calories: 130, weight: 150 },
  { name: 'Arroz Basmati', brand: 'Hacendado', calories: 130, weight: 150 },
  { name: 'Arroz Basmati', brand: 'Hacendado', calories: 130, weight: 150 },
  { name: 'Arroz Basmati', brand: 'Hacendado', calories: 130, weight: 150 },
  { name: 'Arroz Basmati', brand: 'Hacendado', calories: 130, weight: 150 },
  { name: 'Arroz Basmati', brand: 'Hacendado', calories: 130, weight: 150 },
  { name: 'Arroz Basmati', brand: 'Hacendado', calories: 130, weight: 150 },
];

const SearchScreen = () => {
  const { styles, theme } = useStyles(stylesheet);

  const renderHistoryItem = ({
    item,
  }: {
    item: { name: string; brand: string; calories: number; weight: number };
  }) => (
    <View style={styles.historyItem}>
      <View>
        <Text style={styles.historyItemName}>{item.name}</Text>
        <Text style={styles.historyItemDetails}>{`${item.brand}-${item.calories} kcal`}</Text>
        <Text style={styles.historyItemWeight}>{`${item.weight}g`}</Text>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={24} color={theme.colors.blue} />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerTintColor: theme.colors.foreground,
          headerStyle: {
            backgroundColor: theme.colors.base900,
          },
        }}
      />
      <View style={styles.container}>
        <View style={styles.searchWrapper}>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={20}
              color={theme.colors.base600}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor={theme.colors.base600}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          {buttons.map((button, index) => (
            <TouchableOpacity key={index} style={styles.button}>
              <Ionicons name={button.icon as any} size={24} color={theme.colors.foreground} />
              <Text style={styles.buttonText}>{button.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>History</Text>
          <FlatList
            data={historyItems}
            renderItem={renderHistoryItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </>
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
    backgroundColor: theme.colors.blue,
    borderRadius: theme.radius[5],
    padding: theme.margins[8],
    alignItems: 'center',
    width: '48%',
    marginBottom: theme.margins[8],
  },
  buttonText: {
    ...theme.fonts.body.xs,
    color: theme.colors.foreground,
    marginTop: theme.margins[4],
  },
  historyContainer: {
    flex: 1,
  },
  historyTitle: {
    ...theme.fonts.heading.xs,
    color: theme.colors.foreground,
    paddingTop: theme.margins[16],
    paddingHorizontal: theme.margins[16],
    paddingBottom: theme.margins[8],
    borderBottomColor: theme.colors.base200,
    borderBottomWidth: 1,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.margins[8],
    paddingHorizontal: theme.margins[16],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.base200,
  },
  historyItemName: {
    ...theme.fonts.body.m,
    color: theme.colors.foreground,
  },
  historyItemDetails: {
    ...theme.fonts.body.xs,
    color: theme.colors.base600,
  },
  historyItemWeight: {
    ...theme.fonts.body.xs,
    color: theme.colors.base600,
  },
  addButton: {
    padding: theme.margins[8],
  },
}));

export default SearchScreen;
