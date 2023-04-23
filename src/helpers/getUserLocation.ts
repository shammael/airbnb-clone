const getUserLocation = (): Promise<[number, number]> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve([coords.latitude, coords.longitude]);
      },
      (err) => {
        alert(err.message);
        reject(err.message);
      }
    );
  });
};

export default getUserLocation;
