const axios = require('axios');

// const arr = [
//   {
//     departureDate: '2021/05/25',
//     departureShift: 7,
//     id: 3,
//     transitStatus: 'unconfirm',
//     tripId: 3,
//   },
//   {
//     departureDate: '2021/05/13',
//     departureShift: 7,
//     id: 8,
//     transitStatus: 'unconfirm',
//     tripId: 10,
//   },
//   {
//     departureDate: '2021/05/18',
//     departureShift: 14,
//     id: 9,
//     transitStatus: 'unconfirm',
//     tripId: 11,
//   },
// ];

// arr.sort(function (a, b) {
//   return new Date(b.departureDate) - new Date(a.departureDate);
// });

// console.log(arr);

async function getData() {
  return axios
    .get('https://www.gns.quangdvn.me/api/auth/')
    .then((data) => console.log(data.data));
}

const location = [
  { latitude: '20.970656', longitude: '105.750261' },
  { latitude: '20.99168', longitude: '105.797119' },
  { latitude: '21.014753', longitude: '105.804351' },
];

const locationToLatLng = async (terminalLoc, locs) => {
  let reqParams = new URLSearchParams();
  reqParams.append('type', 'json');
  reqParams.append('locale', 'vi');
  reqParams.append('vehicle', 'car');
  reqParams.append('weighting', 'fastest');
  reqParams.append('elevation', 'false');
  reqParams.append('key', 'JsKGJWHJJxxENLWZGIBNOyTLPC');
  reqParams.append('point', `${terminalLoc.latitude},${terminalLoc.longitude}`);
  locs.map((loc) =>
    reqParams.append('point', `${loc.latitude},${loc.longitude}`)
  );
  reqParams.append('point', `${terminalLoc.latitude},${terminalLoc.longitude}`);
  var requestParams = {
    params: reqParams,
  };
  try {
    const { data } = await axios.get(
      'https://apis.wemap.asia/route-api/route/',
      requestParams
    );
    console.log('1', data.paths[0].points);
    console.log('1', data.paths[0].distance);
    console.log('1', data.paths[0].time);
    return {
      success: true,
      data: {
        points: data.paths[0].points,
        distance: data.paths[0].distance,
        time: data.paths[0].time,
      },
    };
  } catch (err) {
    console.log('2', err);
    return { success: false, error: err.message };
  }
};

// const res = locationToLatLng(
//   { latitude: 21.0284120968974, longitude: 105.77828474956691 },
//   location
// );
// console.log(res);

function revertGeoCode(t, e) {
  for (
    var n,
      o,
      u = 0,
      l = 0,
      r = 0,
      d = [],
      h = 0,
      i = 0,
      a = null,
      c = Math.pow(10, e || 5);
    u < t.length;

  ) {
    (a = null), (h = 0), (i = 0);
    do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
    while (a >= 32);
    (n = 1 & i ? ~(i >> 1) : i >> 1), (h = i = 0);
    do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
    while (a >= 32);
    (o = 1 & i ? ~(i >> 1) : i >> 1),
      (l += n),
      (r += o),
      d.push([l / c, r / c]);
  }
  return (d = d.map(function (t) {
    return { latitude: t[0], longitude: t[1] };
  }));
}

console.log(
  revertGeoCode(
    'gbj_Ca{rdSN@NwAvEb@fHz@dBJzBBnBAhCSrAQrAUbAWrBo@bBq@lBcAjIwFdJeHtDaDnKoIbNuJ`CoBhJ{G`LuIhDoCjD{B|CsBnAoAbA_AjCkBr@k@~DmCrHuFnCyBb@El@BTD`CzD`AtAzS|]hFhIvJlUvFfJvCtE`FlIdK`PhKfQbFxNvD|I~A~CbAjBbC~DzP~UnCzD`HnJ`NdSfK~MvB|BxC|BxCdBT^x@p@LTHTBn@ATMt@s@rBoFbLeBpDaBtBaA~@gAh@eBj@cCd@DZnB_@bBe@|Aw@`BsAxAgBrKkUPUTU^SXCZOT[Ha@?QCQQ_@MOSISEa@BOFoAS]OiBaAmBiAeCyBkAkAm@q@yAmBcGoIqGyIcEiGeTsYmHmKu@mAqCaFgA}A{AyCwCyGcGqPgAyBiIuMgBuCy@yAmCgEiHqLaDaFoF_J{CkH_C{FsBgE{EuHdAqB|KwUtAkCTi@Ts@xCqCpD_DsBc@Qn@uCk@If@Hg@tCj@Po@rBb@qD~CyCpCUr@Uh@uAjC}KvUeApBcNwUsFuIg@aAuDyFmAbAqZ~Ty@Hw@?eAQu@S}@i@gAkAyEcHyAqBgCsDoFmIUU{AwBmB}BgFuFgHoI_AaAeAoAmCyCAAQ@MDCJ@NfAhAlE~EfEbF|BjChEtErClDfAzApB~CjBjCfFlIzD~FXb@^`APx@L|@Dz@A~@Ez@M|@cFvDkBjA_IlGwF~DiFxDeMtJiLxIuGxEmG|EiKhH}CxAwA`@cEp@wBLyCLcBAoAGyFm@eLeAIbAlCTOvAOA'
  )
);
