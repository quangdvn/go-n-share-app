import React from 'react';
import Svg, { G, Ellipse, Path, Text, TSpan } from 'react-native-svg';
const SvgSketchSelectedSvg = (props) => (
  <Svg width={245} height={206} {...props}>
    <G fill='none' fillRule='evenodd'>
      <G transform='translate(29.2)'>
        <Ellipse
          stroke='#319795'
          strokeWidth={0.6}
          fill='#319795'
          cx={90.6}
          cy={90.688}
          rx={90.3}
          ry={90.388}
        />
        <G transform='translate(93.6 47.446)' strokeWidth={0.6}>
          <Ellipse
            stroke='#319795'
            fill='#FFF'
            cx={30.9}
            cy={30.93}
            rx={30.6}
            ry={30.63}
          />
          <Ellipse
            stroke='#FFF'
            fill='#319795'
            cx={31.2}
            cy={31.23}
            rx={17.7}
            ry={17.717}
          />
        </G>
        <G transform='translate(25.8 47.446)'>
          <Ellipse
            stroke='#FFF'
            strokeWidth={0.6}
            fill='#FFF'
            cx={30.9}
            cy={30.93}
            rx={30.6}
            ry={30.63}
          />
          <Ellipse
            stroke='#319795'
            strokeWidth={0.6}
            fill='#319795'
            cx={31.2}
            cy={31.23}
            rx={17.7}
            ry={17.717}
          />
          <Path
            d='M55.5 12.012l-10.8 7.507c.441.68.841 1.28 1.2 1.802.972 1.41 1.5 2.702 1.8 3.603.3.901.979 2 1.2 3.303.095.562.195 1.563.3 3.003h12.6c-.011-2.533-.111-4.335-.3-5.405A29.797 29.797 0 0 0 60 20.42c-.537-1.405-1.404-3.63-2.7-5.706a57.718 57.718 0 0 0-1.8-2.702z'
            fill='#319795'
          />
          <Path stroke='#319795' strokeWidth={0.6} d='M49.2 31.23h12.6' />
          <Path
            d='M49.2 31.53H33.3V42.04h12.3c.677-.79 1.177-1.49 1.5-2.101.323-.612.723-1.613 1.2-3.003.497-.984.797-1.784.9-2.402.103-.619.103-1.62 0-3.003z'
            fill='#FFF'
          />
        </G>
        <Text
          // fontFamily='OpenSans-Bold, Open Sans'
          fontSize={18}
          fontWeight='bold'
          letterSpacing={-0.435}
          fill='#FFF'
          transform='translate(25.8 47.446)'>
          <TSpan x={15.496} y={80.86}>
            {`AND SHARE`}
          </TSpan>
        </Text>
      </G>
      <Text
        // fontFamily='OpenSans-Bold, Open Sans'
        fontSize={18}
        fontWeight='bold'
        letterSpacing={-0.435}
        fill='#1C7C7C'
        transform='translate(-23)'>
        <TSpan x={23.25} y={200.376}>
          {`Transporting worths sharing`}
        </TSpan>
      </Text>
    </G>
  </Svg>
);

export default SvgSketchSelectedSvg;
