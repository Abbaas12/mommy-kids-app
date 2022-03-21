import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import AuthContext from "../../auth/context";
import authStorage from "../../auth/storage";
import AppButton from "../../components/AppButton";
import colors from "../../config/Colors";
import Icon from "react-native-vector-icons/FontAwesome";
import listings from "../../api/listings";

const { width, height } = Dimensions.get("window");

export default function ProductDetailScreen({ navigation, route }) {
  const { item } = route.params;
  const context = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [productFilter, setProductFilter] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get sales
    listings.getListings("sales").then((res) => {
      const sale = res.data.map((item) => item.product.id);
      setProductFilter(sale);
      setLoading(false);
    });

    return () => {
      setProductFilter([]);
      setLoading(true);
    };
  }, []);

  const handleDelete = async (id, params) => {
    const token = await authStorage.getToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await listings.deleteListings("products", id, params, config);
  };

  const handlePress = (id) => {
    Alert.alert("Delete", "Are you sure you want to delete this?", [
      {
        text: "Yes",
        onPress: () => {
          handleDelete(id);
          navigation.navigate("Product");
        },
      },
      { text: "No" },
    ]);
  };

  return (
    <>
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View
          style={{
            height: height / 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{
              alignSelf: "flex-end",
              position: "absolute",
              top: 5,
              right: 10,
            }}
          >
            <Icon name="close" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: width / 2.5,
              backgroundColor: colors.secondary,
              alignItems: "center",
              borderRadius: 10,
              padding: 10,
            }}
            onPress={() => {
              navigation.navigate("Admin", {
                screen: "Upload Image",
                params: { item: item },
              });
              setModalVisible(false);
            }}
          >
            <Text
              style={{ color: colors.white, fontSize: 18, fontWeight: "bold" }}
            >
              Update Image
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color={colors.secondary} />
        </View>
      ) : (
        <ScrollView>
          <TouchableWithoutFeedback onLongPress={() => setModalVisible(true)}>
            <Image
              style={styles.image}
              source={{
                uri: item === null ? null : item.image,
              }}
            />
          </TouchableWithoutFeedback>
          <View sytle={styles.detailContainer}>
            <Text style={styles.title}>Name: {item.name}</Text>
            <Text style={styles.price}>Price: ${item.originalPrice}</Text>
            <Text style={styles.text}>Stock: {item.stock}</Text>
            <Text style={styles.text}>Category: {item.category.name}</Text>
            <Text style={styles.text}>Brand: {item.brand.name}</Text>
            <Text style={styles.text}>Size: {item.size.name}</Text>
            <Text style={styles.text}>Type: {item.type.name}</Text>
            <Text style={styles.text}>Color: {item.color.name}</Text>
            <Text style={styles.text}>Date: {item.date.split("T")[0]}</Text>
          </View>
          {context.user.isAdmin && (
            <View style={styles.buttonContainer}>
              <AppButton
                style={styles.button}
                color="secondary"
                title="Edit"
                onPress={() =>
                  navigation.navigate("Admin", {
                    screen: "Add Product",
                    params: { item: item },
                  })
                }
              />
              {!productFilter.includes(item.id) && (
                <AppButton
                  color="danger"
                  style={styles.button}
                  title="Delete"
                  onPress={() => handlePress(item.id)}
                />
              )}
            </View>
          )}
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  detailContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    width: Dimensions.get("window").width / 2.3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 10,
  },
  text: {
    fontSize: 18,
    margin: 10,
    fontWeight: "300",
  },
  price: {
    fontSize: 20,
    color: colors.secondary,
    fontWeight: "300",
    margin: 10,
  },
});
