import { View, Text, StyleSheet, Image } from "react-native";

const RepositoryItem = ({ item }) => {
  return (
    <View>
      <View>
        <Image source={{ uri: item.ownerAvatarUrl }} />
        <View>
          <Text style={{ fontWeight: "bold" }}>Full Name: {item.fullName}</Text>
          <Text>Description: {item.description}</Text>
          <Text>Language: {item.language}</Text>
        </View>
      </View>

      <View>
        <View>
          <Text>Stars</Text>
          <Text style={{ fontWeight: "bold" }}>{item.stargazersCount}</Text>
        </View>
        <View>
          <Text>Forks</Text>
          <Text style={{ fontWeight: "bold" }}>{item.forksCount}</Text>
        </View>
        <View>
          <Text>Reviews</Text>
          <Text style={{ fontWeight: "bold" }}>{item.reviewCount}</Text>
        </View>
        <View>
          <Text>Rating</Text>
          <Text style={{ fontWeight: "bold" }}>{item.ratingAverage}</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
