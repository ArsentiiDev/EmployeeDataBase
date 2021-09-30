import { v4 as uuidv4 } from 'uuid';

const KEYS = {
    employees: 'employees',
    employeeId: 'employeeId'
}

export const getDepartmentCollection = [
    {id:"1", title:"Development"},
    {id:"2", title:"Marketing"},
    {id:"3", title:"Accounting"},
    {id:"4", title:"HR"}
]

export function insertEmployee(data) {
    let employees = getEmployee()
    data['id'] = uuidv4()
    console.log(data)
    employees.push(data)
    localStorage.setItem(KEYS.employees, JSON.stringify(employees))
}

export function generateId() {

}

export function getEmployee(data) {
    if(localStorage.getItem(KEYS.employees) === null) 
        localStorage.setItem(KEYS.employees, JSON.stringify([]))
    let person =  JSON.parse(localStorage.getItem(KEYS.employees))
    let departments = getDepartmentCollection
    return person.map(x=>({
        ...x,
        department: departments[x.departmentId-1].title
    }))
}

export function updateEmployee(data) {
    let employees = getEmployee()
    let recordIndex = employees.findIndex(x => x.id == data.id)
    employees[recordIndex] = {...data}
    localStorage.setItem(KEYS.employees, JSON.stringify(employees))
}
export function deleteEmployee(id) {
    let employees = getEmployee()
    employees = employees.filter(x => x.id !==id)
    localStorage.setItem(KEYS.employees, JSON.stringify(employees))
}

export function removeItem(data) {

}