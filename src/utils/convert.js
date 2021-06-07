import axios from 'axios';

export const formatNumber = (num) =>
  num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

export function revertGeoCode(t, e) {
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

export async function locationToLatLng(terminalLoc, locs) {
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
}
