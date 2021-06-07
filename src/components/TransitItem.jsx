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
import { COLORS, FONTS, icons, IS_TRANSIT, SIZES } from '../constants';
import { gnsDriverApi, reqConfig } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransitItem = ({ item, navigation, curLocation }) => {
  const transitConfirmed = item.transitStatus !== 'unconfirm';

  const [isConfirmed, setIsConfirmed] = useState(transitConfirmed);
  const [transitStatus, setTransitStatus] = useState(item.transitStatus);

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

  async function confirmTransit(transitId, status = 'ready') {
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
                'driver/confirm-transit-trip',
                {
                  transitId,
                  status,
                },
                reqConfig(token)
              );
              console.log('Success:', res.data);
              setIsConfirmed((prevState) => !prevState);
              setTransitStatus(status);
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
      <View
        style={{
          ...styles.contentContainer,
        }}>
        <View>
          <Text style={styles.content}>Ngày đi:</Text>
          <Text style={styles.content}>{item.departureDate}</Text>
        </View>
        <View>
          <Image
            source={icons.location}
            style={{ width: 40, height: 40, tintColor: COLORS.white }}
          />
        </View>
        <View>
          <Text style={styles.content}>Chuyến chính:</Text>
          <Text style={styles.content}>{item.departureShift} giờ</Text>
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
        <Text style={{ ...FONTS.body2 }}>{renderStatus(transitStatus)}</Text>
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
                  type: IS_TRANSIT,
                  curLocation: curLocation,
                })
              : confirmTransit(item.id);
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
    paddingVertical: 10,
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

export default TransitItem;
