import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { UnistylesRuntime, createStyleSheet, useStyles } from 'react-native-unistyles';
import { StyledIcons, StyledIconTypesKeys } from '@components';

interface StyledDrawerProps extends DrawerContentComponentProps {}

type BottomButtonProps = {
  iconType: StyledIconTypesKeys;
  iconName: string;
  iconSize: number;
  iconColor?: string;
  label: string;
  onPress?: () => void;
};

const BottomButton = ({
  iconType,
  iconName,
  iconSize,
  iconColor,
  label,
  onPress,
}: BottomButtonProps) => {
  const { styles } = useStyles(stylesheet);

  return (
    <TouchableOpacity onPress={onPress} style={styles.bottomButtonStyles} activeOpacity={0.6}>
      <StyledIcons type={iconType} name={iconName} size={iconSize} color={iconColor} />
      <Text style={styles.footerButtonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export const StyledDrawer: React.FC<StyledDrawerProps> = props => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.mainDrawerContainer}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerButtonContainer}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.horizontalDeviderStyles} />
      <View style={styles.bottomButtonContainer}>
        <BottomButton
          iconType={'Ionicons'}
          iconName={'share-social-outline'}
          iconColor={styles.footerButtonText.color}
          iconSize={styles.footerButtonText.fontSize + 2}
          label={'Tell a Friend'}
        />
        <BottomButton
          iconType={'Ionicons'}
          iconName={'exit-outline'}
          iconColor={styles.footerButtonText.color}
          iconSize={styles.footerButtonText.fontSize + 2}
          label={'About Us'}
        />
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(({ colors }) => ({
  mainDrawerContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  drawerButtonContainer: {
    paddingHorizontal: (UnistylesRuntime.screen.width * 2) / 100,
  },
  horizontalDeviderStyles: {
    backgroundColor: colors.devider,
    width: '100%',
    height: StyleSheet.hairlineWidth * 8,
  },
  bottomButtonContainer: {
    paddingStart: (UnistylesRuntime.screen.width * 4) / 100,
    paddingBottom: UnistylesRuntime.insets.bottom,
  },
  bottomButtonStyles: {
    paddingVertical: (UnistylesRuntime.screen.height * 2) / 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerButtonText: {
    color: colors.card_typography,
    fontSize: 16,
    fontWeight: '600',
    paddingStart: (UnistylesRuntime.screen.width * 2) / 100,
  },
}));

export default StyledDrawer;