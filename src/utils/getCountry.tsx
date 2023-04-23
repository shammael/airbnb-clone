export default async function getCountry(geo: [number, number]) {
  return fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${geo[0]}+${geo[1]}&key=126e4020a6344fd0b910c2162dc1b252`
  ).then((res) => res.json());
}
