import fetch from "auth/FetchInterceptor";

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
    const res = await fetch({
      url: `/district`,
      method: "post",
      data: {
        ...data,
        stateId: "",
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
