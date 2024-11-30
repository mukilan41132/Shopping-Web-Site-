function isEmpty(value) {
    return !value || value.trim() === '';
}
function usercredencials(email, password) {
    return email && email.includes('@') && password && password.trim().lenght >= 6
}
function UserDetailsvalidation(
    email, password, name, street, postal, city
) {
    return (
        usercredencials(email, password) &&
        isEmpty(name) &&
        isEmpty(street) &&
        isEmpty(postal) &&
        isEmpty(city)
    )
}

function emailcheck(email, confirEmail) {
    return email === confirEmail;

}

module.exports = {
    UserDetailsvalidation: UserDetailsvalidation,
    emailcheck: emailcheck

}