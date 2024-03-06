import moment from 'moment';

export const required = value => (value || typeof value === 'number' ? undefined : 'Required')
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
export const maxLength10 = maxLength(10)
export const maxLength50 = maxLength(50)
export const maxLength6 = maxLength(6)
export const maxLength25 = maxLength(25)
export const maxLength20 = maxLength(20)
export const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined
export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
export const phoneNumber = value =>
    value && !/^(0|[1-9][0-9]{9})$/i.test(value)
      ? 'Invalid phone number'
      : undefined   
export const text = value => 
    value && (/[!@#$%^&*(),.?":{}|<>]/g.test(value)  || /\d+/g.test(value))
        ? 'No Special Characters or numbers'
        : undefined

let duration1 = moment.duration({'years' : 18});
export const isMinor = value =>
    moment().subtract(duration1).format("YYYY-MM-DD") < value
    ? 'Age must be 18 years or above'
    : undefined
export const ssn = value =>
    value && !/^(0|[1-9][0-9]{9})$/i.test(value)
      ? 'Invalid SSN ID, must be 10 digits'
      : undefined 