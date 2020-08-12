import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import styles from "./styles";
import PageHeaders from "../../components/PageHeaders";
import { ScrollView } from "react-native-gesture-handler";
import TeacherItem, { Teacher } from "../../components/TeacherItem";

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Teacher[]>([]);
  function loadFavorites() {
    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        setFavorites(favoritedTeachers);
      }
    });
  }
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );
  return (
    <View style={styles.container}>
      <PageHeaders title="Meus Proffys favoritos" />
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favorites.map((teacherItem) => (
          <TeacherItem key={teacherItem.id} teacher={teacherItem} favorited />
        ))}
      </ScrollView>
    </View>
  );
};

export default Favorites;
