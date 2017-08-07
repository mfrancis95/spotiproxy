const portscanner = require("portscanner");

if (process.argv[2]) {
    process.argv[2] = parseInt(process.argv[2]);
    process.argv[3] = parseInt(process.argv[3]);
}
else {
    process.argv[2] = 4380;
    process.argv[3] = 4391;
}

(async function() {
    try {
        const spotifyPort = await portscanner.findAPortInUse(process.argv[2], process.argv[3]);
        const proxyPort = await portscanner.findAPortNotInUse(process.argv[2], process.argv[3]);
        const app = require("express")();
        app.use(require("./lib/spotiproxy")(spotifyPort));
        app.listen(proxyPort, () => {
            console.log("Started spotiproxy server on port " + proxyPort);
        });
    }
    catch (error) {
        console.error(error);
    }
})();
