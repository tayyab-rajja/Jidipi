import { Category, CategoryAPI } from "types/categoryTypes";

export const getFormatedList = (
  category: CategoryAPI[] | undefined,
  pageId: string
) => {
  if (!category) {
    return { list: [], totalCount: null };
  }
  let totalCount = 0;
  const formattedList = category.reduce(
    (list: Category[], current: CategoryAPI) => {
      if (!current.isDeleted) {
        let postCount = 0;
        const obj = {
          ...current.categoryId,
          subCategories: current.subCategories.reduce(
            (secondList: Category[], secondCurrent: CategoryAPI) => {
              let secondPostCount = secondCurrent.categoryId
                ?.countPublishedPostPerPage
                ? secondCurrent.categoryId.countPublishedPostPerPage[pageId]
                : 0;

              if (!secondPostCount) {
                secondPostCount = 0;
              }
              if (
                secondCurrent.categoryId.title !== "[[DELETED]]" &&
                !secondCurrent.isDeleted
              ) {
                postCount += secondPostCount;
                const secondObj = {
                  ...secondCurrent.categoryId,
                  subCategories: secondCurrent.subCategories.reduce(
                    (thirdList: Category[], thirdCurrent: CategoryAPI) => {
                      let thirdPostCount =
                        thirdCurrent?.countPublishedPostPerPage
                          ? thirdCurrent.countPublishedPostPerPage[pageId]
                          : 0;
                      if (!thirdPostCount) {
                        thirdPostCount = 0;
                      }
                      if (
                        !thirdCurrent.isDeleted &&
                        secondCurrent.categoryId.title !== "[[DELETED]]"
                      ) {
                        postCount += thirdPostCount;
                        secondPostCount += thirdPostCount;
                        if (thirdPostCount > 0)
                          thirdList.push({
                            title: thirdCurrent.title,
                            uniqueId: thirdCurrent.uniqueId,
                            type: thirdCurrent.type,
                            postCount: thirdPostCount,
                          });
                      }
                      return thirdList;
                    },
                    []
                  ),
                };
                if (secondPostCount > 0)
                  secondList.push({ ...secondObj, postCount: secondPostCount });
              }
              return secondList;
            },
            []
          ),
        };
        if (postCount > 0) list.push({ ...obj, postCount });
        totalCount += postCount;
      }
      return list;
    },
    []
  );
  return { list: formattedList, totalCount };
};
