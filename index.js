/* Your Code Here */

function createEmployeeRecord(x) {
    return {
        firstName: x[0],
        familyName: x[1],
        title: x[2],
        payPerHour: x[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}


function createEmployeeRecords(employees) {
    return employees.map(employee => createEmployeeRecord(employee));
}

let createTimeInEvent = function (timeStamp) {
    let [date, hour] = timeStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date,
    });

    return this;
}

let createTimeOutEvent = function (timeStamp) {
    let [date, hour] = timeStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date,
    });

    return this;
}

function hoursWorkedOnDate(timeStamp) {
    const timeIn = this.timeInEvents.find(e => {
        return e.date === timeStamp.split(" ")[0]
    })

    const timeOut = this.timeOutEvents.find(e => {
        return e.date === timeStamp.split(" ")[0]
    })

    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(timeStamp) {
    const hours = hoursWorkedOnDate.bind(this)
    return (this.payPerHour * hours(timeStamp))
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0)

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    // return srcArray.find(employee => employee.firstName === firstName)
    return srcArray.find(({ firstName: name }) => name === firstName)
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((sum, employee) => {
        const wages = employee.timeInEvents.map(timeInEvent => {
            return wagesEarnedOnDate.call(employee, timeInEvent.date)
        })

        return wages.reduce((total, currentWage) => total + currentWage) + sum

    }, 0)
}