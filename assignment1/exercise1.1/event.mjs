function Event(date, place) {

let actualDate = date;
let actualPlace = place;

    function getDate() {
        return date;
    }

    function getPlace() {
        return place;
    }

    function setDate(date) {
        actualDate = date;
    }

    function setPlace(place) {
        actualPlace = place;
    }

    return {
        getDate, 
        getPlace,
        setDate,
        setPlace
    }
}

export { Event }