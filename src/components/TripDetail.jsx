import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SIZES, icons } from '../constants';
import { formatNumber } from '../utils/convert';

const TripDetail = ({ data }) => {
  const [tripStatus, setTripStatus] = useState(null);

  useEffect(() => {
    setTripStatus(data.tripStatus);
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

  return tripStatus ? (
    <ScrollView
      style={styles.container}
      alwaysBounceVertical={false}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <View style={styles.carInfo}>
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
              Tên xe: {`${data.coachName} #${data.coachId}`}
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

      <View style={styles.tripInfo}>
        <LinearGradient
          colors={COLORS.gradient}
          start={[0, 0.5]}
          end={[1, 0.7]}
          style={styles.listItem}>
          <View>
            <Text style={{ ...FONTS.h4, color: COLORS.white }}>
              Thông tin chuyến:
            </Text>
            <Text style={{ marginTop: 5, ...FONTS.body3, color: COLORS.white }}>
              Điểm đi: bến{' '}
              {data.departureLocation === data.fixedDepartureSubName
                ? data.fixedDepartureTerminal
                : data.fixedArriveTerminal}
              ,{' '}
              {data.departureLocation === data.fixedDepartureSubName
                ? data.fixedDepartureAddress
                : data.fixedArriveAddress}
            </Text>
            <Text style={{ marginTop: 5, ...FONTS.body3, color: COLORS.white }}>
              Thông tin đi: {data.departureTime}h - {data.departureDate}
            </Text>
            <Text style={{ marginTop: 5, ...FONTS.body3, color: COLORS.white }}>
              Điểm đến: bến{' '}
              {data.departureLocation === data.fixedDepartureSubName
                ? data.fixedArriveTerminal
                : data.fixedDepartureTerminal}
              ,{' '}
              {data.departureLocation === data.fixedDepartureSubName
                ? data.fixedArriveAddress
                : data.fixedDepartureAddress}
            </Text>
            <Text style={{ marginTop: 5, ...FONTS.body3, color: COLORS.white }}>
              Thông tin đến: {data.arriveTime}h - {data.arriveDate}
            </Text>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.bookingInfo}>
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
                {data.bookings.length} vé đã được dặt
              </Text>
            </View>
            {data.bookings.length > 0 ? (
              data.bookings.map((booking) => (
                <View
                  key={booking.id}
                  style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={styles.bookingListInfo}>
                    <Text style={{ ...FONTS.body4 }}>
                      Tên: {booking.bookingName}
                    </Text>
                    <Text style={{ ...FONTS.body4 }}>
                      Số điện thoại: {booking.bookingPhone}
                    </Text>
                    <Text style={{ ...FONTS.body4 }}>
                      Ghi chú: {booking.notes}
                    </Text>
                    <Text style={{ ...FONTS.body4 }}>
                      Giá vé: {formatNumber(booking.totalPrice)} VNĐ
                    </Text>
                    <Text style={{ ...FONTS.body4 }}>
                      Trạng thái:{' '}
                      <Text
                        style={{
                          ...FONTS.body4,
                          color: renderBookingStatusColor(
                            booking.bookingStatus
                          ),
                        }}>
                        {renderBookingStatus(booking.bookingStatus)}
                      </Text>
                    </Text>
                  </View>
                  {booking.bookingStatus === 'pending' ? (
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
                        disabled={tripStatus === 'ready'}>
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

      {data.tripStatus === 'finished' ? (
        <View></View>
      ) : (
        <View style={styles.selectInfo}>
          <TouchableOpacity onPress={() => onLeftButtonClick(data.tripStatus)}>
            <View
              style={{
                ...styles.leftButton,
                backgroundColor: COLORS.valid,
              }}>
              <Text style={{ ...FONTS.body3, color: COLORS.white }}>
                {renderLeftButton(data.tripStatus)}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onRightButtonClick(data.tripStatus)}>
            <View
              style={{
                ...styles.rightButton,
                backgroundColor: COLORS.invalid,
              }}>
              <Text style={{ ...FONTS.body3, color: COLORS.white }}>
                {renderRightButton(data.tripStatus)}
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
    marginTop: SIZES.width * 0.05,
    marginBottom: SIZES.width * 0.06,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 10,
  },
  carInfo: {
    marginTop: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding * 3,
  },
  tripInfo: {
    marginTop: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding * 3,
  },
  bookingInfo: {
    marginTop: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding * 3,
  },
  selectInfo: {
    marginTop: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding * 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: SIZES.height * 0.1,
  },
  bookingListInfo: {
    flex: 1,
    flexDirection: 'column',
    marginRight: SIZES.padding * 1.5,
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: COLORS.white,
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

export default TripDetail;
