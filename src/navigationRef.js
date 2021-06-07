import { DrawerActions } from '@react-navigation/routers';
import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function toggle() {
  navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
}
