const getUserLocation = (): Promise<[number, number]> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve([coords.latitude, coords.longitude]);
      },
      (err) => {
        alert(err.message);
        reject([37.77171598272512, -122.40537690432976]);
      }
    );
  });
};

export default getUserLocation;
