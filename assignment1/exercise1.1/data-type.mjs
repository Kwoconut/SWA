function DataType(type, unit) {
    
    let actualUnit = unit;
    let actualType = type;

    function getType() {
        return actualType;
    }

    function getUnit() {
        return actualUnit;
    }

    function setUnit(unit) {
        actualUnit = unit;
    }

    function setType(type) {
        actualType = type;
    }

    return {
        getType,
        getUnit,
        setUnit,
        setType
    }
}

export { DataType }