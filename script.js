let lines, connections, stations;
let line, station, terminus, facing, parked;
let distance, distanceAbs, direction, currentIndex, terminusIndex;
let stationsToGo = [];

const colors = ["exp", "mil", "can"];

const init = (configs) => {
    // FETCH SETUP
    fetch("./data/lines.json")
        .then(response => {return response.json()})
        .then(data => {
            lines = data;
            setup(configs);
        })
        .catch(err => {
            console.error("FETCH: lines.json failed");
            return;
        })
    
    fetch("./data/connections.json")
        .then(response => {return response.json()})
        .then(data => {
            connections = data;
            setup(configs);
        })
        .catch(err => {
            console.error("FETCH: connections.json failed");
            return;
        })

    fetch("./data/stations.json")
        .then(response => {return response.json()})
        .then(data => {
            stations = data;
            setup(configs);
        })
        .catch(err => {
            console.error("FETCH: stations.json failed");
            return;
        })
}

const setup = (configs) => {
    if (!lines || !connections || !stations) return;

    // CONFIG SETUP
    if (!configs['line'] || !lines[configs['line']]) {
        console.error("CONFIG: Bad line or not given");
        return;
    }
    line = lines[configs['line']];

    if (!configs['station'] || !stations[configs['station']]) {
        console.error("CONFIG: Bad station or not given");
        return;
    }
    if (line.stations.indexOf(configs['station']) == -1) {
        console.error("CONFIG: station is not on the specified line");
        return;
    }
    station = stations[configs['station']];
    currentIndex = line.stations.indexOf(configs['station']);

    if (!configs['terminus'] || !stations[configs['terminus']]) {
        console.error("CONFIG: Bad terminus or not given");
        return;
    }
    if (line.stations.indexOf(configs['terminus']) == -1) {
        console.error("CONFIG: Pathfinding failed. terminus is not on the same line as station");
        return;
    }
    if (configs['station'] == configs['terminus']) {
        console.error("CONFIG: Pathfinding failed. No direction given since terminus is station");
        return;
    }
    terminus = stations[configs['terminus']];
    terminusIndex = line.stations.indexOf(configs['terminus']);
    distance = terminusIndex - currentIndex;

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

    // TOP BAR SETUP
    colors.forEach(color => {
        if (document.body.classList.contains(color)) {
            document.body.classList.remove(color);
        }
    })
    document.body.classList.add(line.color);
    document.getElementById('line').innerHTML = line.name;

    document.getElementById('bound').innerHTML = terminus.name;
    document.getElementById('location').innerHTML = station.name;

    if (parked) {
        document.getElementById('vehicle').innerHTML = "At Station";
    } else {
        document.getElementById('vehicle').innerHTML = "Next Station";
    }

    // STATIONS TO GO SET UP
    if (terminusIndex - currentIndex > 0) {
        direction = true
    } else {
        direction = false
    }

    stationsToGo = [];
    if (direction == true) {
        for (let i=currentIndex; i<(terminusIndex+1); i++) {
            stationsToGo.push(stations[line.stations[i]]);
        }
    } else {
        for (let i=currentIndex; i>(terminusIndex-1); i--) {
            stationsToGo.push(stations[line.stations[i]]);
        }
    }

    distance = stationsToGo.length - 1;
}