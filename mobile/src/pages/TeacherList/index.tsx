import React from "react";
import { View } from "react-native";

import styles from "../Favorites/styles";
import PageHeaders from "../../components/PageHeaders";

const TeacherList: React.FC = () => {
  return (
    <View style={styles.container}>
      <PageHeaders title="Proffys Disponiveis" />
    </View>
  );
};

export default TeacherList;
