import { FormType } from "./enums";

export type Item = {
  key: string;
  name: string;
  icon: string;
  description: string;
  form: FormType;
  isSinkable: boolean;
  isResource: boolean;
  isAmmo: boolean;
  isFicsmas: boolean;
}
