import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import { Link } from "react-router-native";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.appBarBackground || "#24292e",
    flexDirection: "row",
  },
  scrollContainer: {
    flexDirection: "row",
  },
  tab: {
    marginRight: 15,
    paddingVertical: 15,
  },
});

const AppBarTab = ({ to, children }) => (
  <Link to={to} component={Pressable} style={styles.tab}>
    <Text color="primary" fontWeight="bold">
      {children}
    </Text>
  </Link>
);

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
        <AppBarTab to="/">Repositories</AppBarTab>
        <AppBarTab to="/signin">Sign in</AppBarTab>
        {/* Later you can add more: <AppBarTab>Sign In</AppBarTab> */}
      </ScrollView>
    </View>
  );
};

export default AppBar;
