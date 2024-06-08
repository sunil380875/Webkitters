const { Model } = require("mongoose");

export const aggregationData = async ({
  model,
  args,
  position = args?.length,
  sort,
  per_page,
  pageNo,
  isTotalData = true,
}: any) => {
  try {
    sort &&
      args.splice(position, 0, {
        $sort: sort,
      });

    if (
      typeof per_page === "number" &&
      typeof pageNo === "number" &&
      per_page > -1 &&
      pageNo > -1
    ) {
      const perPage = per_page;
      const skip = +perPage * pageNo;
      const totalCount = isTotalData
        ? await model.aggregate([
            ...args,
            {
              $count: "totalCount",
            },
          ])
        : undefined;
      args.splice(position + 1, 0, {
        $skip: skip,
      });
      args.splice(position + 2, 0, {
        $limit: per_page + 1,
      });
      const dataGet = await model.aggregate(args);
      const haveNextPage = Boolean(dataGet.length === Number(perPage) + 1);
      if (haveNextPage) {
        dataGet.pop();
      }

      return {
        data: dataGet,
        haveNextPage,
        pageNo: isTotalData ? pageNo : undefined,
        perPage: isTotalData ? per_page : undefined,
        totalCount: totalCount?.[0]?.totalCount,
      };
    } else {
      const dataGet = await model.aggregate(args);
      return {
        data: dataGet,
        haveNextPage: false,
      };
    }
  } catch (error) {
    throw error;
  }
};
