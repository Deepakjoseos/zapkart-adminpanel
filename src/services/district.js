import fetch from "auth/FetchInterceptor";
import countryService from "./country";
import stateService from "./state";

const districtService = {};
const api = `/district`;

districtService.getDistrict = async function (
  paginationQuery = "",
  filterQuery = ""
) {
  try {
    let url = `${api}?${paginationQuery}&${filterQuery}`;
    const res = await fetch({
      url,
      method: "get",
    });
    return res;
  } catch (err) {
    console.log(err, "show-err");
  }
};

districtService.deleteDistrict = async function (id) {
  try {
    const res = await fetch({
      url: `/district/${id}`,
      method: "delete",
    });
    //   const data = res.data.filter((cur) => cur.status !== 'Deleted')
    return res;
  } catch (err) {
    console.log(err, "show-err");
  }
};

districtService.getDistrictById = async function (id) {
  try {
    const res = await fetch({
      url: `/district/${id}`,
      method: "get",
    });
    return res.data;
  } catch (err) {
    console.log(err, "show-err");
  }
};

districtService.createDistrict = async function (data) {
  try {
    let country = await countryService.getCountry();
    if (country.data.length === 0)
      country = await countryService.createCountry({
        name: "COUNTRY_",
        priority: 1,
        status: "Active",
      });

    let state = await stateService.getState();
    if (state.data.length === 0)
      state = await stateService.createState({
        name: "STATE_",
        countryId: country.data.id || country.data[0].id,
        priority: 2,
        status: "Active",
      });

    const res = await fetch({
      url: `/district`,
      method: "post",
      data: {
        ...data,
        countryId: country.data[0].id,
        stateId: state.data[0].id,
      },
    });
    return res;
  } catch (err) {
    console.log(err, "show-err");
  }
};

districtService.editDistrict = async function (id, data) {
  try {
    const res = await fetch({
      url: `/district/${id}`,
      method: "put",
      data: data,
    });
    return res;
  } catch (err) {
    console.log(err, "show-err");
  }
};

// brandService.setPost = function (data) {
//   return fetch({
//     url: '/posts',
//     method: 'post',
//     data: data
//   })
// }

export default districtService;
