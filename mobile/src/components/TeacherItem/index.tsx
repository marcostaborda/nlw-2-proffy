import React, { useState } from "react";
import { View, Image, Text, Linking } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import styles from "./styles";
import { RectButton } from "react-native-gesture-handler";
import heartOutlineIcon from "../../assets/images/icons/heart-outline.png";
import unFavoriteIcon from "../../assets/images/icons/unfavorite.png";
import whatsappIcon from "../../assets/images/icons/whatsapp.png";

export interface Teacher {
  id: string;
  user_id: string;
  subject: string;
  cost: string;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
  const [isFavorited, setFavorited] = useState(favorited);

  function handleLinkToWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
  }
  async function handleToggleFavorite() {
    const favorites = await AsyncStorage.getItem("favorites");
    let favoritesArray: Teacher[] = [];

    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (isFavorited) {
      const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
        return teacherItem.id === teacher.id;
      });
      favoritesArray.splice(favoriteIndex, 1);
      setFavorited(false);
    } else {
      favoritesArray.push(teacher);
      setFavorited(true);
    }
    await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
  }
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={{ uri: teacher.avatar }} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>
      <Text style={styles.bio}>{teacher.bio}</Text>
      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {"    "}
          <Text style={styles.priceVal}>R$ {teacher.cost}</Text>
        </Text>

        <View style={styles.buttonContainer}>
          <RectButton
            onPress={handleToggleFavorite}
            style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]}
          >
            {isFavorited ? (
              <Image source={unFavoriteIcon}></Image>
            ) : (
              <Image source={heartOutlineIcon}></Image>
            )}
          </RectButton>
          <RectButton
            style={styles.contactButton}
            onPress={handleLinkToWhatsApp}
          >
            <Image source={whatsappIcon}></Image>
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;