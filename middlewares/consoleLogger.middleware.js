const consoleMiddleware = (req, res, next) => {
    console.log("Middleware consoleLogger");
    console.log("Request:", req.method, req.path);
    console.log("Body:", req.body);
    console.log("Query:", req.query);
    next();
}
export default consoleMiddleware;
