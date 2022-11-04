export interface IFaq {
  id?: number;
  questionAr?: string | null;
  questionFr?: string | null;
  questionEn?: string | null;
  responseAr?: string | null;
  responseFr?: string | null;
  responseEn?: string | null;
}

export const defaultValue: Readonly<IFaq> = {};
