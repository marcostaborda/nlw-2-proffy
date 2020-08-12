import React, { useState, useCallback } from "react";
import { View, ScrollView, Text, TextInput } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

import styles from "./styles";
import PageHeaders from "../../components/PageHeaders";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import api from "../../services/api";
import { useFocusEffect } from "@react-navigation/native";

const TeacherList: React.FC = () => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  function loadFavorites() {
    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map(
          (teacher: Teacher) => {
            return teacher.id;
          }
        );
        setFavorites(favoritedTeachersIds);
      }
    });
  }
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );
  function handleToggleFilter() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  function handleFilterSubmit() {
    loadFavorites();
    api
      .get("classes", {
        params: {
          subject,
          week_day,
          time,
        },
      })
      .then((response) => {
        setTeachers(response.data);
        setIsFiltersVisible(false);
      });
  }

  return (
    <View style={styles.container}>
      <PageHeaders
        title="Proffys Disponiveis"
        headerRight={
          <BorderlessButton onPress={handleToggleFilter}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        }
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={(text) => setSubject(text)}
              placeholder="Qual a matéria"
              placeholderTextColor="#c1bccc"
            />
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da Semana</Text>
                <TextInput
                  style={styles.input}
                  value={week_day}
                  onChangeText={(text) => setWeekDay(text)}
                  placeholder="Dia da Semana"
                  placeholderTextColor="#c1bccc"
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  value={time}
                  onChangeText={(text) => setTime(text)}
                  placeholder="Qual horário"
                  placeholderTextColor="#c1bccc"
                />
              </View>
            </View>

            <RectButton
              style={styles.submitButton}
              onPress={handleFilterSubmit}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeaders>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacherItem) => (
          <TeacherItem
            key={teacherItem.id}
            teacher={teacherItem}
            favorited={favorites.includes(Number(teacherItem.id))}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TeacherList;
