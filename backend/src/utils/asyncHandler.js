const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    console.error("asyncHandler Error:::", error);
  }
}

export { asyncHandler };