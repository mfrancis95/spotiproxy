const http = require("http");

const headers = {
    Origin: "https://open.spotify.com"
};

function spotiproxy(port) {
    const agent = new http.Agent({
        keepAlive: true
    });
    return (request, response) => {
        http.request({
            agent: agent,
            headers: headers,
            method: request.method,
            path: request.url,
            port: port
        }, res => {
            response.set("Content-Type", res.headers["content-type"]);
            response.statusCode = res.statusCode;
            res.pipe(response);
        }).end();
    };
}

module.exports = spotiproxy;
