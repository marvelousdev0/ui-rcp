export const strings: Record<string, string> = {
  "mtm.rcp.home.title": "Home",
};

export const translator = (key: string) => {
  return strings[key] || key;
};

type StringOnlyProps = {
  [key: string]: string;
};

export const stringOnly = (parser: StringOnlyProps): StringOnlyProps => {
  return Object.keys(parser).reduce((acc, key) => {
    acc[key] = translator(parser[key]);
    return acc;
  }, {} as StringOnlyProps);
};
