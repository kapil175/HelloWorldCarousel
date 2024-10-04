import React, { useState } from 'react';
import { View, Button, Text, Image, StyleSheet, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Carousel from 'react-native-snap-carousel';

const App = () => {
  const [images, setImages] = useState([]);
  const windowWidth = Dimensions.get('window').width;

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map(asset => asset.uri);
      setImages(selectedImages);
    }
  };

  const renderItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.image} />
  );

  return (
    <View style={styles.container}>
      <Button title="Pick Images" onPress={pickImages} />
      <Text style={styles.header}>Selected Images:</Text>
      {images.length > 0 && (
        <Carousel
          data={images}
          renderItem={renderItem}
          sliderWidth={windowWidth}
          itemWidth={windowWidth * 0.8}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    marginVertical: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default App;