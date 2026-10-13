// Web stand-in for react-native-rate.
export const AndroidMarket = { Google: 1, Amazon: 2 }
const Rate = {
  rate: (_options, callback) => callback && callback(false, 'web')
}
export default Rate
