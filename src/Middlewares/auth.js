export const auth = (req, res, next) => {
    const token = "xyqz";
    const isAuth = token === "xyz";
    if (!isAuth) {
        res.status(401).send("un authenticated");
    } else {
        next();
    }
};