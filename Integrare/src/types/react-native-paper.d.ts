declare module 'react-native-paper' {
  import { ComponentType } from 'react';
  import { ViewStyle, TextStyle } from 'react-native';

  export interface IconProps {
    color?: string;
    size?: number;
    style?: ViewStyle;
  }

  export interface ListIconProps extends IconProps {
    icon: string;
  }

  export interface ListItemProps {
    title: string;
    description?: string;
    left?: (props: ListIconProps) => React.ReactNode;
    right?: (props: ListIconProps) => React.ReactNode;
    onPress?: () => void;
  }

  export interface CardProps {
    style?: ViewStyle;
    children: React.ReactNode;
    onPress?: () => void;
  }

  export interface CardContentProps {
    style?: ViewStyle;
    children: React.ReactNode;
  }

  export interface ButtonProps {
    mode?: 'text' | 'outlined' | 'contained';
    onPress?: () => void;
    style?: ViewStyle;
    children: React.ReactNode;
    loading?: boolean;
  }

  export interface TextProps {
    style?: TextStyle;
    children: React.ReactNode;
  }

  export interface AvatarProps {
    size?: number;
    style?: ViewStyle;
    children?: React.ReactNode;
    label?: string;
  }

  export interface DividerProps {
    style?: ViewStyle;
  }

  export interface FABProps {
    icon: string;
    onPress?: () => void;
    style?: ViewStyle;
  }

  export interface TextInputProps {
    label?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    mode?: 'flat' | 'outlined';
    style?: ViewStyle;
    placeholder?: string;
    secureTextEntry?: boolean;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'url';
  }

  export interface SurfaceProps {
    style?: ViewStyle;
    children: React.ReactNode;
  }

  export interface ProviderProps {
    children: React.ReactNode;
  }

  export const List: {
    Item: ComponentType<ListItemProps>;
    Icon: ComponentType<ListIconProps>;
  };
  export const Card: ComponentType<CardProps> & {
    Content: ComponentType<CardContentProps>;
  };
  export const Button: ComponentType<ButtonProps>;
  export const Text: ComponentType<TextProps>;
  export const Avatar: ComponentType<AvatarProps> & {
    Text: ComponentType<AvatarProps>;
  };
  export const Divider: ComponentType<DividerProps>;
  export const FAB: ComponentType<FABProps>;
  export const TextInput: ComponentType<TextInputProps>;
  export const Surface: ComponentType<SurfaceProps>;
  export const useTheme: () => any;
  export const Provider: ComponentType<ProviderProps>;
} 