import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

// Adds the access token to all requests
const jsonClient = (url, options = {}) => {
  const token = localStorage.getItem("access_token");
  console.log("httpClient " + url);
  if (token != null) {
    options.user = {
      authenticated: true,
      token: `Bearer ${token}`,
    };
  }
  return fetchUtils.fetchJson(url, options);
};

const getEniaData = (resource, params) => {
  console.log("getEniaData " + resource);
 
    const res = resourceMap[resource]; 
 
    console.log("HttpClient https://proyecto.codigoi.com.ar/appenia/enia-api-tableros/users/?user");
    return fetchUtils.fetchJson(`https://proyecto.codigoi.com.ar/appenia/enia-api-tableros/users/?user=${params.id}`).then(({ json }) => ({
      data: res.map(json),
    }));; 
  };

const mxcUrlToHttp = mxcUrl => {
  const homeserver = localStorage.getItem("base_url");
  const re = /^mxc:\/\/([^/]+)\/(\w+)/;
  var ret = re.exec(mxcUrl);
  /* console.log("mxcClient " + ret); */
  if (ret == null) return null;
  const serverName = ret[1];
  const mediaId = ret[2];
  return `${homeserver}/_matrix/media/r0/thumbnail/${serverName}/${mediaId}?width=24&height=24&method=scale`;
};

const resourceMap = {
  users: {
    path: "/_synapse/admin/v2/users",
    map: u => ({
      ...u,
      id: u.name,
      avatar_src: mxcUrlToHttp(u.avatar_url),
      is_guest: !!u.is_guest,
      admin: !!u.admin,
      deactivated: !!u.deactivated,
      // need timestamp in milliseconds
      creation_ts_ms: u.creation_ts * 1000,
    }),
    data: "users",
    total: json => json.total,
    create: data => ({
      endpoint: `/_synapse/admin/v2/users/${data.id}`,
      body: data,
      method: "PUT",
    }),
    delete: params => ({
      endpoint: `/_synapse/admin/v1/deactivate/${params.id}`,
      body: { erase: true },
      method: "POST",
    }),
  },
  rooms: {
    path: "/_synapse/admin/v1/rooms",
    map: r => ({
      ...r,
      id: r.room_id,
      alias: r.canonical_alias,
      members: r.joined_members,
      is_encrypted: !!r.encryption,
      federatable: !!r.federatable,
      public: !!r.public,
    }),
    data: "rooms",
    total: json => {
      return json.total_rooms;
    },
    delete: params => ({
      endpoint: `/_synapse/admin/v1/rooms/${params.id}/delete`,
      body: { block: false },
      method: "POST",
    }),
  },
  locationon: {
    path: "https://proyecto.codigoi.com.ar/appenia/enia-api-tableros/users/?user",
    map: l => ({
      ...l,
      departament: l.departament,
      school: l.school,
    }),
    data: "locationon",
  },
  devices: {
    map: d => ({
      ...d,
      id: d.device_id,
    }),
    data: "devices",
    reference: id => ({
      endpoint: `/_synapse/admin/v2/users/${id}/devices`,
    }),
    delete: params => ({
      endpoint: `/_synapse/admin/v2/users/${params.user_id}/devices/${params.id}`,
    }),
  },
  connections: {
    path: "/_synapse/admin/v1/whois",
    map: c => ({
      ...c,
      id: c.user_id,
    }),
    data: "connections",
  },
  room_members: {
    map: m => ({
      id: m,
    }),
    reference: id => ({
      endpoint: `/_synapse/admin/v1/rooms/${id}/members`,
    }),
    data: "members",
  },
  servernotices: {
    map: n => ({ id: n.event_id }),
    create: data => ({
      endpoint: "/_synapse/admin/v1/send_server_notice",
      body: {
        user_id: data.id,
        content: {
          msgtype: "m.text",
          body: data.body,
        },
      },
      method: "POST",
    }),
  },
};

function filterNullValues(key, value) {
  // Filtering out null properties
  if (value === null) {
    return undefined;
  }
  return value;
}

function getSearchOrder(order) {
  if (order === "DESC") {
    return "b";
  } else {
    return "f";
  }
}

const dataProvider = {
  getList: (resource, params) => {
    console.log("getList " + resource);
    const { user_id, name, guests, deactivated } = params.filter;
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const from = (page - 1) * perPage;
    const query = {
      from: from,
      limit: perPage,
      user_id: user_id,
      name: name,
      guests: guests,
      deactivated: deactivated,
      dir: getSearchOrder(order),
    };
    const homeserver = localStorage.getItem("base_url");
    if (!homeserver || !(resource in resourceMap)) return Promise.reject();

    const res = resourceMap[resource];

    const endpoint_url = homeserver + res.path;
    const url = `${endpoint_url}?${stringify(query)}`;

    return jsonClient(url).then(({ json }) => ({
      data: json[res.data].map(res.map),
      total: res.total(json, from, perPage),
    }));
  },


   getOne: async (resource, params) => {
    console.log("getOne " + resource);
    const homeserver = localStorage.getItem("base_url");
    if (!homeserver || !(resource in resourceMap)) return Promise.reject();

    const res = resourceMap[resource];
    if (resource === 'users') {
      const eniaData = await getEniaData('locationon', params); 


      const endpoint_url = homeserver + res.path;
      const userData = await jsonClient(`${endpoint_url}/${params.id}`).then(({ json }) => ({
      data: res.map(json),
    }));
      const data = {};
      Object.keys(userData).forEach(key => data[key] = userData[key]);
      Object.keys(eniaData['data']).forEach(key => data['data'][key] = eniaData['data'][key]);
      
      return data;
    }

    const endpoint_url = homeserver + res.path;
    return jsonClient(`${endpoint_url}/${params.id}`).then(({ json }) => ({
      data: res.map(json),
    }));
  },

  getMany: (resource, params) => {
    console.log("getMany " + resource);
    const homeserver = localStorage.getItem("base_url");
    if (!homeserver || !(resource in resourceMap)) return Promise.reject();

    const res = resourceMap[resource];
 
    if (resource === 'locationon') {

      const endpoint_url = res.path;
      /* console.log("HttpClient " + endpoint_url); */
      return Promise.all(
          params.ids.map(id => fetchUtils.fetchJson(`${endpoint_url}=${id}`))
          ).then(responses => ({
              data: responses.map(({ json }) => res.map(json)),
      }))

    } else {

      const endpoint_url = homeserver + res.path;
      return Promise.all(
        params.ids.map(id => jsonClient(`${endpoint_url}/${id}`))
      ).then(responses => ({
        data: responses.map(({ json }) => res.map(json)),
      }))
    }

  },

  getManyReference: (resource, params) => {
    console.log("getManyReference " + resource);

    const homeserver = localStorage.getItem("base_url");
    if (!homeserver || !(resource in resourceMap)) return Promise.reject();

    const res = resourceMap[resource];

    const ref = res["reference"](params.id);
    const endpoint_url = homeserver + ref.endpoint;

    return jsonClient(endpoint_url).then(({ headers, json }) => ({
      data: json[res.data].map(res.map),
    }));
  },

  update: async (resource, params) => {
    console.log("update " + resource);
    const homeserver = localStorage.getItem("base_url");
    if (!homeserver || !(resource in resourceMap)) return Promise.reject();

    const res = resourceMap[resource];
    const endpoint_url = homeserver + res.path;

    if (resource === 'users') {
      const resloc = resourceMap['locationon']; 
      const eniaData = await fetchUtils.fetchJson(`https://proyecto.codigoi.com.ar/appenia/enia-api-tableros/users/index.php`, {
        method: "PUT",
        body: JSON.stringify(params.data, filterNullValues),
      }).then(({ json }) => ({
        data: resloc.map(json),
      }));

      const userData = await jsonClient(`${endpoint_url}/${params.data.id}`, {
        method: "PUT",
        body: JSON.stringify(params.data, filterNullValues),
      }).then(({ json }) => ({
        data: res.map(json),
      }));
      const data = {};
      Object.keys(userData).forEach(key => data[key] = userData[key]);
      Object.keys(eniaData['data']).forEach(key => data['data'][key] = eniaData['data'][key]);
    
      return data;
    }

    return jsonClient(`${endpoint_url}/${params.data.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data, filterNullValues),
    }).then(({ json }) => ({
      data: res.map(json),
    }));
  },

  updateMany: (resource, params) => {
    console.log("updateMany " + resource);
    const homeserver = localStorage.getItem("base_url");
    if (!homeserver || !(resource in resourceMap)) return Promise.reject();

    const res = resourceMap[resource];

    const endpoint_url = homeserver + res.path;
    return Promise.all(
      params.ids.map(id => jsonClient(`${endpoint_url}/${id}`), {
        method: "PUT",
        body: JSON.stringify(params.data, filterNullValues),
      })
    ).then(responses => ({
      data: responses.map(({ json }) => json),
    }));
  },

  create: async (resource, params) => {
    console.log("create " + resource);
    const homeserver = localStorage.getItem("base_url");
    if (!homeserver || !(resource in resourceMap)) return Promise.reject();

    const res = resourceMap[resource];
    if (!("create" in res)) return Promise.reject();

    const create = res["create"](params.data);
    const endpoint_url = homeserver + create.endpoint;

    if (resource === 'users') {

      const resloc = resourceMap['locationon']; 
      const eniaData = await fetchUtils.fetchJson(`https://proyecto.codigoi.com.ar/appenia/enia-api-tableros/users/index.php`, {
        method: "POST",
        body: JSON.stringify(create.body, filterNullValues),
      }).then(({ json }) => ({
        data: resloc.map(json),
      }));

      const userData = await jsonClient(endpoint_url, {
        method: create.method,
        body: JSON.stringify(create.body, filterNullValues),
      }).then(({ json }) => ({
        data: res.map(json),
      }));
      const data = {};
      Object.keys(userData).forEach(key => data[key] = userData[key]);
      Object.keys(eniaData['data']).forEach(key => data['data'][key] = eniaData['data'][key]);
    
      return data;
    }

    return jsonClient(endpoint_url, {
      method: create.method,
      body: JSON.stringify(create.body, filterNullValues),
    }).then(({ json }) => ({
      data: res.map(json),
    }));
  },

  createMany: (resource, params) => {
    console.log("createMany " + resource);
    const homeserver = localStorage.getItem("base_url");
    if (!homeserver || !(resource in resourceMap)) return Promise.reject();

    const res = resourceMap[resource];
    if (!("create" in res)) return Promise.reject();

    return Promise.all(
      params.ids.map(id => {
        params.data.id = id;
        const cre = res["create"](params.data);
        const endpoint_url = homeserver + cre.endpoint;
        return jsonClient(endpoint_url, {
          method: cre.method,
          body: JSON.stringify(cre.body, filterNullValues),
        });
      })
    ).then(responses => ({
      data: responses.map(({ json }) => json),
    }));
  },

  delete: (resource, params) => {
    console.log("delete " + resource);
    const homeserver = localStorage.getItem("base_url");
    if (!homeserver || !(resource in resourceMap)) return Promise.reject();

    const res = resourceMap[resource];

    if ("delete" in res) {
      const del = res["delete"](params);
      const endpoint_url = homeserver + del.endpoint;
      return jsonClient(endpoint_url, {
        method: "method" in del ? del.method : "DELETE",
        body: "body" in del ? JSON.stringify(del.body) : null,
      }).then(({ json }) => ({
        data: json,
      }));
    } else {
      const endpoint_url = homeserver + res.path;
      return jsonClient(`${endpoint_url}/${params.id}`, {
        method: "DELETE",
        body: JSON.stringify(params.data, filterNullValues),
      }).then(({ json }) => ({
        data: json,
      }));
    }
  },

  deleteMany: (resource, params) => {
    console.log("deleteMany " + resource);
    const homeserver = localStorage.getItem("base_url");
    if (!homeserver || !(resource in resourceMap)) return Promise.reject();

    const res = resourceMap[resource];

    if ("delete" in res) {
      return Promise.all(
        params.ids.map(id => {
          const del = res["delete"]({ ...params, id: id });
          const endpoint_url = homeserver + del.endpoint;
          return jsonClient(endpoint_url, {
            method: "method" in del ? del.method : "DELETE",
            body: "body" in del ? JSON.stringify(del.body) : null,
          });
        })
      ).then(responses => ({
        data: responses.map(({ json }) => json),
      }));
    } else {
      const endpoint_url = homeserver + res.path;
      return Promise.all(
        params.ids.map(id =>
          jsonClient(`${endpoint_url}/${id}`, {
            method: "DELETE",
            body: JSON.stringify(params.data, filterNullValues),
          })
        )
      ).then(responses => ({
        data: responses.map(({ json }) => json),
      }));
    }
  },
};

export default dataProvider;
