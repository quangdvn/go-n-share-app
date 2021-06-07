import { useQuery } from '@apollo/client';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import TransitDetail from '../../components/TransitDetail';
import TripDetail from '../../components/TripDetail';
import { COLORS, IS_TRIP, SIZES } from '../../constants';
import { TRANSIT_DETAIL, TRIP_DETAIL } from '../../graphql';

const DetailScreen = ({ navigation, route }) => {
  const { item, type, curLocation } = route.params;

  if (type === IS_TRIP) {
    const { loading, data, error } = useQuery(TRIP_DETAIL, {
      variables: { tripId: item.id },
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

    if (error) {
      console.log('error', error);
    }

    if (data) {
      const {
        getTripDetail: { data: tripDetailData },
      } = data;
      // console.log('data: ', tripDetailData);
      return <TripDetail data={tripDetailData} />;
    }
  } else {
    const { loading, data, error } = useQuery(TRANSIT_DETAIL, {
      variables: { transitId: item.id },
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

    if (error) {
      console.log('error', error);
    }

    if (data) {
      const {
        getTransitDetail: { data: transitDetailData },
      } = data;
      // console.log('data: ', transitDetailData);
      return (
        <TransitDetail data={transitDetailData} curLocation={curLocation} />
      );
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: SIZES.width * 0.06,
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
});

export default DetailScreen;
