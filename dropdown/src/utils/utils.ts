import { FLAGS } from '../consts/consts';
import Iflags from '../consts/consts';

const getFlag = (countryName: keyof Iflags) => (FLAGS[countryName] ? FLAGS[countryName] : undefined);

export { getFlag };
