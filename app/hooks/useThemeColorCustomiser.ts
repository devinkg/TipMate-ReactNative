import { UnistylesRuntime, UnistylesTheme, UnistylesThemes } from "react-native-unistyles"

export interface CustomisedTheme {
    themeName: keyof UnistylesThemes;
    customColors: Partial<UnistylesTheme['colors']>;
}

export const useThemeColorCustomiser = (themes: CustomisedTheme[]): void => {
    themes.forEach(({ themeName, customColors }) => {
        UnistylesRuntime.updateTheme(themeName, (currentTheme: UnistylesThemes[keyof UnistylesThemes]) => ({
            ...currentTheme,
            colors: {
                ...currentTheme.colors,
                ...customColors,  // Merge the new colours for each theme
            },
        }));
    });
};