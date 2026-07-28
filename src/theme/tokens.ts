export interface Theme {
  name: string;
  colors: {
    primary: string;
    background: string;
    text: string;
    secondary?: string;
  };
  fontFamily: string;
  spacing: {
    base: string;
  };
}
