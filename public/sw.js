self.addEventListener(`install`, (evt) => {
  evt.waitUntil(
    caches.open(`trip`)
      .then((cache) => {
        return cache.addAll([
          `./`,
          `./index.html`,
          `./bundle.js`,
          `./css/normalize.css`,
          `./css/main.css`,
          `./img/star.svg`,
          `./img/star--check.svg`,
        ]);
      })
  );
});

self.addEventListener(`fetch`, (evt) => {
  evt.respondWith(
    caches.match(evt.request)
      .then((response) => {
        return response ? response : fetch(evt.request);
      })
      .catch((err) => {
        throw err;
      })
  );
});
