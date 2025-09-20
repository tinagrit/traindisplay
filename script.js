let lines, connections, stations;
let line, station, terminus, facing, parked;

const init = (...configs) => {
    fetch("./data/lines.json")
        .then(response => {return response.json()})
        .then(data => {
            lines = data;
        })
        .catch(err => {
            console.error("FETCH: lines.json failed");
            return;
        })
    
    fetch("./data/connections.json")
        .then(response => {return response.json()})
        .then(data => {
            connections = data;
        })
        .catch(err => {
            console.error("FETCH: connections.json failed");
            return;
        })

    fetch("./data/stations.json")
        .then(response => {return response.json()})
        .then(data => {
            stations = data;
        })
        .catch(err => {
            console.error("FETCH: stations.json failed");
            return;
        })

    if (!configs['line'] || !lines[configs['line']]) {
        console.error("CONFIG: Bad line or not given");
        return;
    }
    line = lines[configs['line']];

    if (!configs['station'] || !stations[configs['station']]) {
        console.error("CONFIG: Bad station or not given");
        return;
    }
    station = stations[configs['station']];

    if (!configs['terminus'] || !stations[configs['terminus']]) {
        console.error("CONFIG: Bad terminus or not given");
        return;
    }
    terminus = stations[configs['terminus']];

    if (!configs['facing'] || (configs['facing'] != "left" && configs['facing'] != "right")) {
        console.error("CONFIG: facing has to be either left or right");
        return;
    }
    facing = configs['facing'];

    if (configs['parked']) {
        parked = true;
    } else {
        parked = false;
    }
}
