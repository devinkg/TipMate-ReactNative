import React, { useState } from 'react';
import { View, Text, Modal, Pressable, ScrollView } from 'react-native';
import { createStyleSheet, UnistylesRuntime, useStyles } from 'react-native-unistyles';
import { StyledIcons } from '@components';
import { type CurrencyType } from '@configs';

const CurrencySelectiveScroll = ({ currencies }: { currencies: CurrencyType[] | undefined }) => {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <ScrollView
      contentContainerStyle={styles.currencyScrollContainerStyles}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      {currencies?.map(currency => (
        <View key={currency.currencyId} style={styles.modalContentCurrencyBarContainer}>
          <View style={styles.currencySelectiveName}>
            <Text style={styles.modalcurrencyText}>{currency.currencyName}</Text>
          </View>
          <View style={styles.currencySelectiveSign}>
            <Text style={styles.modalcurrencyText}>{currency.currencySign}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const CurrencyListModal = ({
  modalVisibility,
  currencies,
  closeButtonPress,
}: {
  modalVisibility?: boolean;
  currencies?: CurrencyType[];
  closeButtonPress?: () => void;
}) => {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <Modal visible={modalVisibility} transparent={true} animationType={'slide'}>
      <View style={styles.modalMainContainer}>
        <View style={styles.modalTitleAndCloseButtonContainer}>
          <Text style={styles.modalTitle}>{`SELECT YOUR CURRENCY`}</Text>
          <Pressable onPress={closeButtonPress}>
            <StyledIcons
              type={'Ionicons'}
              name={'close'}
              size={24}
              color={theme.colors.card_typography}
            />
          </Pressable>
        </View>
        <View style={styles.modalContentContainer}>
          <CurrencySelectiveScroll currencies={currencies} />
        </View>
      </View>
    </Modal>
  );
};

export const StyledCurrencySelector = ({
  title,
  description,
  currencyChangeInstructionText,
  currencyText,
}: {
  title: string;
  description: string;
  currencyChangeInstructionText: string;
  currencyText: string;
}) => {
  const { styles } = useStyles(stylesheet);

  const [modalVisibility, setModalVisibility] = useState<boolean>(false);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleText}>{`${title}`}</Text>
      <Text style={styles.instructionText}>
        <StyledIcons
          type={'FontAwesome5'}
          name={'info-circle'}
          size={styles.instructionText?.fontSize}
        />
        {` ${description}`}
      </Text>
      <View style={styles.mainCurrencyChangeContainer}>
        <Text style={styles.currencyChangeText}>{`${currencyChangeInstructionText}`}</Text>
        <Pressable
          style={styles.currencyBox}
          onPress={() => setModalVisibility(prevState => !prevState)}>
          <Text style={styles.currencyText}>{`${currencyText}`}</Text>
        </Pressable>
      </View>
      <CurrencyListModal
        modalVisibility={modalVisibility}
        closeButtonPress={() => {
          setModalVisibility(prevState => !prevState);
        }}
      />
    </View>
  );
};

const stylesheet = createStyleSheet(({ colors, fonts, utils }) => ({
  mainContainer: {
    marginTop: (UnistylesRuntime.screen.height * 2) / 100,
    width: '100%',
    backgroundColor: colors.card,
    paddingVertical: (UnistylesRuntime.screen.height * 2) / 100,
    borderRadius: (UnistylesRuntime.screen.height * 1) / 100,
  },
  titleText: {
    color: colors.accent,
    fontSize: 14,
    fontFamily: fonts.Nunito_Black,
    marginHorizontal: (UnistylesRuntime.screen.width * 5) / 100,
  },
  instructionText: {
    fontSize: 10,
    color: colors.card_typography,
    fontFamily: fonts.Montserrat_Medium,
    marginVertical: (UnistylesRuntime.screen.height * 0.5) / 100,
    marginHorizontal: (UnistylesRuntime.screen.width * 5) / 100,
  },
  mainCurrencyChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: (UnistylesRuntime.screen.height * 0.5) / 100,
    marginHorizontal: (UnistylesRuntime.screen.width * 5) / 100,
  },
  currencyChangeText: {
    color: colors.card_typography,
    fontSize: 14,
    fontFamily: fonts.Nunito_Black,
  },
  currencyBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: (UnistylesRuntime.screen.width * 20) / 100,
    backgroundColor: colors.backgroundColor,
    height: (UnistylesRuntime.screen.height * 4) / 100,
    borderRadius: (UnistylesRuntime.screen.height * 1) / 100,
  },
  currencyText: {
    fontSize: 14,
    fontFamily: fonts.Montserrat_Black,
    color: colors.accent,
  },

  // Modal contents
  modalMainContainer: {
    height: (UnistylesRuntime.screen.height * 50) / 100,
    width: '100%',
    borderRadius: (UnistylesRuntime.screen.width * 5) / 100,
    borderWidth: UnistylesRuntime.hairlineWidth * 2,
    borderColor: colors.accent,
    backgroundColor: utils.hexToRGBA(colors.card, 0.95),
    bottom: -(UnistylesRuntime.insets.bottom * 0.2), // Minus
    position: 'absolute',
  },
  modalTitleAndCloseButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: (UnistylesRuntime.screen.width * 5) / 100,
    paddingVertical: (UnistylesRuntime.screen.height * 2) / 100,
  },
  modalTitle: {
    color: colors.accent,
    fontSize: 14,
    fontFamily: fonts.Nunito_Black,
  },
  modalContentContainer: {
    width: '100%',
    paddingHorizontal: (UnistylesRuntime.screen.width * 5) / 100,
  },
  modalContentCurrencyBarContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: (UnistylesRuntime.screen.height * 1.25) / 100,
    paddingHorizontal: (UnistylesRuntime.screen.width * 5) / 100,
    backgroundColor: colors.backgroundColor,
    borderRadius: (UnistylesRuntime.screen.height * 1) / 100,
  },
  modalcurrencyText: {
    fontSize: 14,
    fontFamily: fonts.Montserrat_Black,
    color: colors.card_typography,
  },
  currencySelectiveName: {
    flex: 4,
    justifyContent: 'center',
    paddingVertical: (UnistylesRuntime.screen.height * 0.5) / 100,
  },
  currencySelectiveSign: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: (UnistylesRuntime.screen.height * 0.5) / 100,
  },
  currencyScrollContainerStyles: {
    gap: (UnistylesRuntime.screen.height * 1) / 100,
    paddingBottom: UnistylesRuntime.insets.bottom * 3,
  },
}));