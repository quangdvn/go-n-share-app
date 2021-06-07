import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SIZES, icons } from '../constants';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { locationToLatLng, revertGeoCode } from '../utils/convert';

const TransitDetail = ({ curLocation, data }) => {
  const [region, setRegion] = useState(null);
  const [departure, setDeparture] = useState({});
  const [coords, setCoords] = useState(null);
  const [cabId, setCabId] = useState(null);
  const [transitStatus, setTransitStatus] = useState(null);

  console.log('1', data);

  useEffect(() => {
    async function getData() {
      if (data.details.length > 0) {
        const mapRegion = {
          latitude:
            (parseFloat(data.departureLatitude) +
              parseFloat(data.details[0].latitude)) /
            2,
          longitude:
            (parseFloat(data.departureLongitude) +
              parseFloat(data.details[0].longitude)) /
            2,
          latitudeDelta:
            Math.abs(
              parseFloat(data.departureLatitude) -
                parseFloat(data.details[0].latitude)
            ) * 1.5,
          longitudeDelta:
            Math.abs(
              parseFloat(data.departureLongitude) -
                parseFloat(data.details[0].longitude)
            ) * 1.5,
        };

        const transitLocations = data.details.map((det) => ({
          latitude: det.latitude,
          longitude: det.longitude,
        }));

        const transitGeoLocation = await locationToLatLng(
          {
            latitude: data.departureLatitude,
            longitude: data.departureLongitude,
          },
          transitLocations
        );

        const curCoords = revertGeoCode(transitGeoLocation.data.points);
        await setRegion(mapRegion);
        await setCoords(curCoords);
      }
      await setDeparture({
        latitude: parseFloat(data.departureLatitude),
        longitude: parseFloat(data.departureLongitude),
      });
      await setCabId(data.cabId);
      await setTransitStatus(data.transitStatus);
    }
    getData();

    return () => {
      setRegion(null);
      setDeparture({});
      setCoords(null);
      setCabId(null);
      setTransitStatus(null);
    };
  }, [data]);

  function renderBookingStatus(status) {
    switch (status) {
      case 'pending':
        return 'Chưa thanh toán';
      case 'success':
        return 'Đã thanh toán';
      case 'cancelled':
        return 'Đã huỷ';
    }
  }

  function renderBookingStatusColor(status) {
    switch (status) {
      case 'pending':
        return COLORS.invalid;
      case 'success':
        return COLORS.valid;
      case 'cancelled':
        return COLORS.darkgray;
    }
  }

  function renderLeftButton(status) {
    switch (status) {
      case 'ready':
        return 'Bắt đầu chuyến đi';
      case 'going':
        return 'Kết thúc chuyến đi';
    }
  }

  function renderRightButton(status) {
    switch (status) {
      case 'ready':
        return 'Huỷ chuyến đi';
      case 'going':
        return 'Báo cáo sự cố';
    }
  }

  function onLeftButtonClick(status) {
    switch (status) {
      case 'ready':
        console.log('Bắt đầu');
        break;
      case 'going':
        console.log('Kết thúc');
        break;
    }
  }

  function onRightButtonClick(status) {
    switch (status) {
      case 'ready':
        console.log('Huỷ');
        break;
      case 'going':
        console.log('Báo cáo');
        break;
    }
  }

  return departure ? (
    <ScrollView
      style={styles.container}
      alwaysBounceVertical={false}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <View style={styles.cabInfo}>
        <LinearGradient
          colors={COLORS.gradient}
          start={[0, 0.5]}
          end={[1, 0.7]}
          style={styles.listItem}>
          <View>
            <Text style={{ ...FONTS.h4, color: COLORS.white }}>
              Thông tin xe:
            </Text>
            <Text style={{ marginTop: 5, ...FONTS.body3, color: COLORS.white }}>
              Tên xe: {`${data.cabName} #${data.cabId}`}
            </Text>
            <Text style={{ marginTop: 5, ...FONTS.body3, color: COLORS.white }}>
              Biển số xe: {data.numberPlate}
            </Text>
            <Text style={{ marginTop: 5, ...FONTS.body3, color: COLORS.white }}>
              Tổng số ghế: {data.seatNumber}
            </Text>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.transitInfo}>
        <LinearGradient
          colors={COLORS.gradient}
          start={[0, 0.5]}
          end={[1, 0.7]}
          style={styles.listItem}>
          <View>
            <Text style={{ ...FONTS.h4, color: COLORS.white }}>
              Thông tin chuyến đi chính:
            </Text>
            <Text style={{ marginTop: 5, ...FONTS.body3, color: COLORS.white }}>
              Điểm đi: bến{' '}
              {curLocation === data.departureSubName
                ? data.departureTerminal
                : data.arriveTerminal}
              ,{' '}
              {curLocation === data.departureSubName
                ? data.departureAddress
                : data.arriveAddress}
            </Text>
            <Text style={{ marginTop: 5, ...FONTS.body3, color: COLORS.white }}>
              Thông tin đi: {data.departureShift}h - {data.departureDate}
            </Text>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.detailInfo}>
        <LinearGradient
          colors={COLORS.gradient}
          start={[0, 0.5]}
          end={[1, 0.7]}
          style={styles.listItem}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{ ...FONTS.h4, color: COLORS.white }}>
                Thông tin đặt vé:
              </Text>
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.white,
                  paddingLeft: SIZES.padding,
                }}>
                {data.details.length} vé đã được dặt
              </Text>
            </View>
            {data.details.length > 0 ? (
              data.details.map((detail) => (
                <View
                  key={detail.id}
                  style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={styles.transitListInfo}>
                    <Text style={{ ...FONTS.body4 }}>
                      Tên: {detail.bookingName}
                    </Text>
                    <Text style={{ ...FONTS.body4 }}>
                      Số điện thoại: {detail.bookingPhone}
                    </Text>
                    <Text style={{ ...FONTS.body4 }}>
                      Ghi chú: {detail.notes}
                    </Text>
                    <Text style={{ ...FONTS.body4 }}>
                      Trạng thái:{' '}
                      <Text
                        style={{
                          ...FONTS.body4,
                          color: renderBookingStatusColor(detail.bookingStatus),
                        }}>
                        {renderBookingStatus(detail.bookingStatus)}
                      </Text>
                    </Text>
                  </View>
                  {detail.bookingStatus === 'pending' ? (
                    <View
                      style={{
                        borderRadius: 50 / 2,
                        width: 50,
                        height: 50,
                        backgroundColor: COLORS.white,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() => console.log('Clicked')}
                        disabled={transitStatus === 'ready'}>
                        <Image
                          source={icons.check}
                          style={{
                            tintColor: COLORS.primary,
                            width: 25,
                            height: 25,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View></View>
                  )}
                </View>
              ))
            ) : (
              <View></View>
            )}
          </View>
        </LinearGradient>
      </View>

      <View style={styles.mapInfo}>
        {data.details.length > 0 ? (
          <MapView
            initialRegion={region}
            style={{
              width: SIZES.width * 0.8,
              height: SIZES.height * 0.5,
            }}>
            {data.details.map((detail, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: parseFloat(detail.latitude),
                  longitude: parseFloat(detail.longitude),
                }}
                title={detail.bookingName}
                description={detail.address}>
                <View
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: COLORS.white,
                  }}>
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: COLORS.primary,
                    }}>
                    <Image
                      source={icons.pin}
                      style={{ width: 25, height: 25, tintColor: COLORS.white }}
                    />
                  </View>
                </View>
              </Marker>
            ))}
            <Marker
              coordinate={{
                latitude: parseFloat(data.departureLatitude),
                longitude: parseFloat(data.departureLongitude),
              }}
              title='Chuyến transit'
              description={`Xe #${cabId}`}
              anchor={{ x: 0.5, y: 0.5 }}
              flat>
              <Image source={icons.car} style={{ width: 40, height: 40 }} />
            </Marker>

            {coords ? (
              <Polyline
                coordinates={[...coords]}
                strokeWidth={3}
                strokeColor={COLORS.secondPrimary}
              />
            ) : (
              <View />
            )}
          </MapView>
        ) : (
          <View />
        )}
      </View>

      {data.transitStatus === 'finished' ? (
        <View></View>
      ) : (
        <View style={styles.selectInfo}>
          <TouchableOpacity
            onPress={() => onLeftButtonClick(data.transitStatus)}>
            <View
              style={{
                ...styles.leftButton,
                backgroundColor: COLORS.valid,
              }}>
              <Text style={{ ...FONTS.body3, color: COLORS.white }}>
                {renderLeftButton(data.transitStatus)}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onRightButtonClick(data.transitStatus)}>
            <View
              style={{
                ...styles.rightButton,
                backgroundColor: COLORS.invalid,
              }}>
              <Text style={{ ...FONTS.body3, color: COLORS.white }}>
                {renderRightButton(data.transitStatus)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  ) : (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size='large' color={COLORS.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: SIZES.width * 0.06,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cabInfo: {
    marginTop: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding * 3,
  },
  listItem: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 10,
  },
  transitInfo: {
    marginTop: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding * 3,
  },
  detailInfo: {
    marginTop: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding * 3,
  },
  transitListInfo: {
    flex: 1,
    flexDirection: 'column',
    marginRight: SIZES.padding * 1.5,
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  mapInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.padding * 2,
  },
  selectInfo: {
    marginTop: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding * 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: SIZES.height * 0.1,
  },
  leftButton: {
    paddingVertical: SIZES.padding * 1.5,
    paddingHorizontal: SIZES.padding * 1.5,
    borderRadius: 25,
  },
  rightButton: {
    paddingVertical: SIZES.padding * 1.5,
    paddingHorizontal: SIZES.padding * 1.5,
    borderRadius: 25,
  },
});

export default TransitDetail;
