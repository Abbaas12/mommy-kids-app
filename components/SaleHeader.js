import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  ScrollView,
  Dimensions,
  Text,
  Switch,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AuthContext from "../auth/context";

import Colors from "../config/Colors";
import AppButton from "./AppButton";
import CountIcon from "./CountIcon";
import DatePicker from "./filters/DatePicker";
import SaleFilter from "./filters/SaleFilter";

const { width, height } = Dimensions.get("window");

export default function SaleHeader({
  count,
  navigation,
  items,
  setSaleFilter,
  sales,
  trash,
}) {
  const context = useContext(AuthContext);
  const defaultDate = new Date(Date.now());

  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(defaultDate);
  const [show, setShow] = useState(false);
  const [startDateShow, setStartDateShow] = useState(false);
  const [endDateShow, setEndDateShow] = useState(false);
  const [available, setAvailable] = useState(false);
  const [comparative, setComparative] = useState(false);
  const [startDate, setStartDate] = useState(defaultDate);
  const [endDate, setEndDate] = useState(defaultDate);

  const onChangeDate = (event, selectedDate) => {
    const currDate = selectedDate;
    setShow(false);
    if (available) {
      setDate(currDate);
      setSaleFilter(
        sales.filter(
          (item) =>
            item.date.split("T")[0] == currDate.toISOString().split("T")[0]
        )
      );
    } else {
      return;
    }
  };
  const onChangeStartDate = (event, selectedDate) => {
    const currDate = selectedDate;
    setStartDateShow(false);
    if (comparative) {
      setStartDate(currDate);
      setSaleFilter(
        sales.filter(
          (item) =>
            item.date.split("T")[0] >= currDate.toISOString().split("T")[0] &&
            item.date.split("T")[0] <= endDate.toISOString().split("T")[0]
        )
      );
    } else {
      return;
    }
  };
  const onChangeEndDate = (event, selectedDate) => {
    const currDate = selectedDate;
    setEndDateShow(false);
    if (comparative) {
      setEndDate(currDate);
      setSaleFilter(
        sales.filter(
          (item) =>
            item.date.split("T")[0] <= currDate.toISOString().split("T")[0] &&
            item.date.split("T")[0] >= startDate.toISOString().split("T")[0]
        )
      );
    } else {
      return;
    }
  };

  const handleAvailable = (item) => {
    setSaleFilter(sales);
    setAvailable(item);
  };
  const handleComparative = (item) => {
    setSaleFilter(sales);
    setComparative(item);
  };

  return (
    <>
      <Modal visible={modalVisible} animationType="fade" transparent>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={{ flex: 1 }}>
            <View style={styles.modal}>
              <ScrollView horizontal contentContainerStyle={{ width: "100%" }}>
                <ScrollView>
                  <SaleFilter
                    items={items}
                    setSaleFilter={setSaleFilter}
                    sales={sales}
                  />
                  <View>
                    <View style={styles.dateContainer}>
                      <View style={{ padding: 10 }}>
                        <DatePicker
                          value={date}
                          show={show}
                          onPress={() => setShow(true)}
                          onChange={onChangeDate}
                          name="Date"
                        />
                      </View>
                      <Switch
                        value={available}
                        onValueChange={handleAvailable}
                      />
                    </View>
                    <View style={styles.dateContainer}>
                      <View style={{ padding: 10 }}>
                        <DatePicker
                          show={startDateShow}
                          value={startDate}
                          onPress={() => setStartDateShow(true)}
                          onChange={onChangeStartDate}
                          name="Start Date"
                        />
                        <DatePicker
                          show={endDateShow}
                          value={endDate}
                          onPress={() => setEndDateShow(true)}
                          onChange={onChangeEndDate}
                          name="End Date"
                        />
                      </View>
                      <Switch
                        value={comparative}
                        onValueChange={handleComparative}
                      />
                    </View>
                  </View>
                  <AppButton
                    onPress={() => setModalVisible(false)}
                    title="Ok"
                    color="secondary"
                  />
                </ScrollView>
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <View style={styles.container}>
        <View>
          <Text style={{ fontSize: 16 }}>
            Count: <Text style={styles.countNumber}>{count}</Text>
          </Text>
        </View>
        {context.user.isAdmin && (
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Trash SaleItem")}
          >
            <View>
              <Icon name="trash-can-outline" color={Colors.medium} size={28} />
              <CountIcon count={trash} />
            </View>
          </TouchableWithoutFeedback>
        )}
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("SearchSale")}
        >
          <Icon name="card-search-outline" color={Colors.medium} size={30} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
          <View style={styles.filterContainer}>
            <Text>Filters</Text>
            <Icon name="filter-menu" color={Colors.medium} size={20} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    padding: 10,
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: Colors.light,
  },
  countNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.doger,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: Colors.dark,
    width: width / 1.2,
    alignSelf: "flex-end",
    margin: 10,
    borderRadius: 15,
    elevation: 4,
    padding: 10,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
