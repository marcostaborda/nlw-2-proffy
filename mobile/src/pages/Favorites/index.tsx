import React from "react";
import { View } from "react-native";

import styles from "./styles";
import PageHeaders from "../../components/PageHeaders";

const Favorites: React.FC = () => {
  return (
    <View style={styles.container}>
      <PageHeaders title="Meus Proffys favoritos" />
    </View>
  );
};

export default Favorites;
