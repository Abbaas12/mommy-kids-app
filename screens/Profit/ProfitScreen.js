import React, { useCallback, useState } from "react";
import { View, StyleSheet, Text, FlatList, Dimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import itemApi from "../../api/adjective";
import Colors from "../../config/Colors";
import { ListItemSeparator } from "../../components/lists";
import AppButton from "../../components/AppButton";
import TotalProfit from "./TotalProfit";
import ProfitList from "./ProfitList";
import ProfitListHeader from "./ProfitListHeader";
import ProfitHeader from "./ProfitHeader";

const { width } = Dimensions.get("window");

export default function ProfitScreen() {
  const [sales, setSales] = useState([]);
  const [saleFilter, setSaleFilter] = useState([]);

  useFocusEffect(
    useCallback(() => {
      //get sales
      itemApi.getItem("sales").then((item) => {
        setSales(item.data);
        setSaleFilter(item.data);
      });

      return () => {
        setSales([]);
        setSaleFilter([]);
      };
    }, [])
  );

  let total = 0;
  const totalSales = saleFilter.map((item) => item.total);
  totalSales.forEach((item) => (total += item));

  let profit = 0;
  const totalProfit = saleFilter.map((item) => item.profit);
  totalProfit.forEach((item) => (profit += item));
  return (
    <View style={styles.container}>
      <View>
        <ProfitHeader
          profit={profit}
          sales={sales}
          setSaleFilter={setSaleFilter}
        />
      </View>
      <FlatList
        data={saleFilter}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ListItemSeparator}
        ListHeaderComponent={() => <ProfitListHeader />}
        renderItem={({ item }) => <ProfitList item={item} />}
      />
      <TotalProfit total={total} profit={profit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailHeader: {},
});
