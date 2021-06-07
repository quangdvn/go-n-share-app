import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, icons, IS_TRIP, SIZES } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { gnsDriverApi, reqConfig } from '../api';

const TripItem = ({ item, navigation, curLocation }) => {
  const tripConfirmed = item.tripStatus !== 'unconfirm';

  const [isConfirmed, setIsConfirmed] = useState(tripConfirmed);
  const [tripStatus, setTripStatus] = useState(item.tripStatus);

  function renderStatus(status) {
    switch (status) {
      case 'unconfirm':
        return 'Chưa xác nhận';
      case 'ready':
        return 'Đã sẵn sàng';
      case 'full':
        return 'Đã đủ chuyến';
      case 'going':
        return 'Đang đi';
      case 'finished':
        return 'Đã hoàn thành';
    }
  }

  async function confirmTrip(tripId, status = 'ready') {
    const token = await AsyncStorage.getItem('token');

    Alert.alert(
      'Xác nhận chuyến đi',
      'Bạn đồng ý xác nhận thực hiện chuyến đi này?',
      [
        {
          text: 'Không',
          style: 'destructive',
        },
        {
          text: 'Đồng ý',
          style: 'default',
          onPress: async () => {
            try {
              const res = await gnsDriverApi.post(
                'driver/confirm-fixed-trip',
                {
                  tripId,
                  status,
                },
                reqConfig(token)
              );
              console.log('Success:', res.data);
              setIsConfirmed((prevState) => !prevState);
              setTripStatus(status);
            } catch (err) {
              console.log('Error: ', err.response.data.message);
            }
          },
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <LinearGradient
      colors={COLORS.gradient}
      start={[0, 1]}
      end={[1, 0]}
      style={styles.listItem}>
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.content}>{item.departureDate}</Text>
          <Text style={styles.content}>{item.departureTime} giờ</Text>
        </View>
        <View>
          <Image
            source={icons.forward}
            style={{ width: 50, height: 30, tintColor: COLORS.white }}
          />
        </View>
        <View>
          <Text style={styles.content}>{item.arriveDate}</Text>
          <Text style={styles.content}>{item.arriveTime} giờ</Text>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 50,
          width: SIZES.width * 0.4,
          backgroundColor: COLORS.white,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: COLORS.primary,
          ...styles.shadow,
        }}>
        <Text style={{ ...FONTS.body2 }}>{renderStatus(tripStatus)}</Text>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          height: 50,
          width: SIZES.width * 0.25,
          backgroundColor: COLORS.white,
          borderTopLeftRadius: 10,
          borderBottomRightRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          ...styles.shadow,
          borderWidth: 1,
          borderColor: COLORS.primary,
        }}>
        <TouchableOpacity
          onPress={() => {
            isConfirmed
              ? navigation.navigate('Detail', {
                  item: item,
                  type: IS_TRIP,
                  curLocation: curLocation,
                })
              : confirmTrip(item.id);
          }}>
          <Text style={{ ...FONTS.body2 }}>
            {isConfirmed ? 'Chi tiết' : 'Xác nhận'}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 10,
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
  image: {
    width: '100%',
    height: '100%',
    borderWidth: 5,
    borderColor: COLORS.white,
    borderRadius: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    marginBottom: 50,
  },
  content: {
    color: COLORS.white,
    ...FONTS.body2,
  },
  button: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rating: {
    marginTop: -15,
  },
  priceContainer: {
    flexDirection: 'row',
  },
  priceText: {
    color: 'white',
    ...FONTS.body2,
    marginBottom: -5,
  },
  addressText: {
    color: COLORS.primary,
    ...FONTS.body2,
    marginBottom: -5,
  },
});

export default TripItem;
