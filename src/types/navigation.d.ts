import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Create: undefined;
};

export type ScreenProps<T extends keyof RootStackParamList = any> =
  NativeStackScreenProps<RootStackParamList, T>;
