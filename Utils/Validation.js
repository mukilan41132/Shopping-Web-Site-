
function usercredencials(email, password) {

    return email && email.includes('@') && password && password.trim().lenght >= 6
}
function UserDetailsvalidation(email, password, fullname, address, postalcode, city) {
  
    const isEmpty = (value) => {
        return !value || typeof value !== 'string' || value.trim() === '';
    };

    // Validation
    return (
        usercredencials(email, password) &&
        !isEmpty(fullname) &&             
        !isEmpty(address) &&               
        !isEmpty(postalcode) &&           
        !isEmpty(city)                    
    );
}

function emailcheck(email, confirEmail) {
    return email === confirEmail;

}

module.exports = {
    UserDetailsvalidation: UserDetailsvalidation,
    emailcheck: emailcheck

}