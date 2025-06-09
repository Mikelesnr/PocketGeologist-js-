export function getUserCollection() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) return [];

  const allCollections =
    JSON.parse(localStorage.getItem("mineralCollections")) || {};
  return allCollections[loggedInUser] || [];
}

export function paginateCollection(collection, page, itemsPerPage = 10) {
  const totalItems = collection.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return {
    items: collection.slice(startIndex, endIndex),
    totalPages,
    currentPage: page,
  };
}
