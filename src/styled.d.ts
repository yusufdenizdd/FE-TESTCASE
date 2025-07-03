// styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    name: string;
    background: string;
    text: string;
    cardHeader: string;
    cardBody: string;
    cardBorder: string;
    buttonBg: string;
    buttonHover: string;
    buttonText: string;
    buttonBorder: string;
  }
}
