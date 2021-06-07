import { useQuery } from '@apollo/client';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import images from '../../constants/images';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { DRIVER_INFO } from '../../graphql';
import TripItem from '../../components/TripItem';
import TransitItem from '../../components/TransitItem';

const MainScreen = ({ navigation }) => {
  const { loading, data } = useQuery(DRIVER_INFO, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color={COLORS.primary} />
      </View>
    );
  }

  const renderTripList = () => {
    if (data.driverInfo.trips.length > 0) {
      const sortedList = data.driverInfo.trips
        .slice()
        .sort((a, b) => new Date(b.departureDate) - new Date(a.departureDate));

      return (
        <View>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.secondary,
            }}>
            Bạn được giao {data.driverInfo.trips.length} chuyến
          </Text>
          <View style={{ marginVertical: 10, height: SIZES.height * 0.59 }}>
            <FlatList
              data={sortedList}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item }) => (
                <TripItem
                  item={item}
                  navigation={navigation}
                  curLocation={data.driverInfo.location.subname}
                />
              )}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => (
                <View style={{ marginVertical: 5 }} />
              )}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: 100,
          }}>
          <Text style={{ ...FONTS.h2 }}>Bạn chưa được giao chuyến !</Text>
        </View>
      );
    }
  };

  const renderTransitList = () => {
    if (data.driverInfo.transits.length > 0) {
      const sortedList = data.driverInfo.transits
        .slice()
        .sort((a, b) => new Date(b.departureDate) - new Date(a.departureDate));

      return (
        <View>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.secondary,
            }}>
            Bạn được giao {data.driverInfo.transits.length} chuyến
          </Text>
          <View
            style={{
              marginVertical: 10,
              height: SIZES.height * 0.59,
            }}>
            <FlatList
              data={sortedList}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item }) => (
                <TransitItem
                  item={item}
                  navigation={navigation}
                  curLocation={data.driverInfo.location.subname}
                />
              )}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => (
                <View style={{ marginVertical: 5 }} />
              )}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: 100,
          }}>
          <Text style={{ ...FONTS.h2 }}>Bạn chưa được giao chuyến !</Text>
        </View>
      );
    }
  };

  if (data) {
    console.log(data.driverInfo.username);
    console.log(data.driverInfo.id);

    return (
      <SafeAreaView style={styles.container}>
        <View style={{ ...styles.header }}>
          <StatusBar barStyle='dark-content' />
          <ImageBackground
            source={require('../../../assets/images/header.png')}
            style={styles.imageBackground}
            resizeMode='stretch'>
            <View>
              <Text style={styles.headerTitle}>
                Xin chào, {data.driverInfo.fullname}
              </Text>

              {data.driverInfo.role === 'fixedTrip' ? (
                <Text style={styles.secondHeaderTitle}>
                  Chuyến cố định - {data.driverInfo.location.name}
                </Text>
              ) : (
                <Text style={styles.secondHeaderTitle}>
                  Chuyến yêu cầu - {data.driverInfo.location.name}
                </Text>
              )}
            </View>
          </ImageBackground>
          <View style={styles.backButton}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Image
                source={images.avatar_4}
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 45 / 2,
                  borderColor: COLORS.secondary,
                  borderWidth: 1,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ ...styles.tabBar }}>
          {data.driverInfo.role === 'fixedTrip'
            ? renderTripList()
            : renderTransitList()}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View
      style={{
        ...styles.container,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>This is main</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  header: {
    marginTop: 33,
    position: 'absolute',
  },
  tabBar: {
    flex: 1,
    marginTop: SIZES.width * 0.45,
    paddingHorizontal: 30,
  },
  backButton: {
    position: 'absolute',
    right: 0,
    marginTop: 15,
    marginRight: -75,
  },
  tabBarContent: {
    marginTop: 20,
  },
  underline: {
    backgroundColor: COLORS.primary,
    borderWidth: null,
  },
  imageBackground: {
    width: SIZES.width * 0.75,
    height: SIZES.width * 0.45,
    alignItems: 'center',
  },
  headerTitle: {
    color: COLORS.white,
    marginTop: 20,
    marginLeft: -10,
    ...FONTS.h2,
  },
  secondHeaderTitle: {
    color: COLORS.white,
    marginTop: 5,
    marginLeft: -10,
    ...FONTS.h4,
  },
});

export default MainScreen;
