export function validateEmail(text) {
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,4}$/;

    let email = text.trim();
    if (email === "" || email === undefined || email === null) {
        return { status: false, error: "Please enter email" };
    } else if (!emailRegex.test(email)) {
        return { status: false, error: "Please enter valid email" };
    } else {
        return { status: true, error: '' };
    }
}

export function validatePassword(text) {
    var passwordRegex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
    // var passwordRegex = /^(?=.{8,})(?=.*[a-z])(?=.*[@#$%^&+=]).*$/;
    let password = text.trim();

    if (password === "" || password === undefined || password === null)
        return { status: false, error: "Please enter password" };
    
    else if(password.length< 8 ){
      return { status: false, error: "Please enter atleast 8 character" };
    }
    else if (!passwordRegex.test(password)) {
      return { status: false, error: "Password should be alphanumeric with atleast one upper case,one lower case and a special character.(Abc@1234)" };
  }
    else {
        return { status: true, error: '' };
    }
}

export function validateUserName(text) {
  var usernameRegex = /^[a-zA-Z0-9\.\d\-\_]{2,30}$/;
  let username = text;
  if (username == "" || username == undefined || username == null) {
    return { status: false, error: "Can't be blank. Please, use latin letters, digits, underscore, dash or dot" };
  } else if(username.length > 30) {
    return { status: false, error: "Can't be longer than 30 symbols. Please, use latin letters, digits, underscore, dash or dot" };
  } else if (!usernameRegex.test(username)) {
    return { status: false, error: "Please, use latin letters, digits, underscore, dash or dot" };
  } else {
    return { status: true, error: '' };
  }
}

export function validatePhoneNo(text) {
  var phonenoRegex = /^\d{10}$/
  let phoneNo = text
  if (phoneNo == "" || phoneNo == undefined || phoneNo == null) {
    return { status: false, error: "Can't be blank. Invalid format" };
  } else if (!phonenoRegex.test(phoneNo)) {
    return { status: false, error: "Invalid format" };
  } else {
    return { status: true, error: '' };
  }
}

export function validateFirstName(text) {
    var firstNameRegex = /^[a-zA-Z\s]+$/
    let firstName = text.trim();
    if (firstName === "" || firstName === undefined || firstName === null) {
      return { status: false, error: "Please enter your name" };
    } else if (!firstNameRegex.test(firstName)) {
      return { status: false, error: "Should consist only of letters" };
    } else {
      return { status: true, error: '' };
    }
  }
  
  // Last name validation on ID Verification screen.
  export function validateLastName(text) {
    var lastnameRegex = /^[a-zA-Z\s]+$/
    let lastName = text.trim();
    if (lastName === "" || lastName === undefined || lastName === null) {
      return { status: false, error: "Can't be blank" };
    } else if (!lastnameRegex.test(lastName)) {
      return { status: false, error: "Should consist only of letters" };
    } else {
      return { status: true, error: '' };
    }
  }

  export function validateDOB(text) {
    // var firstNameRegex = /^(?=.*\d)(?=.*[a-zA-Z!@#$^+=])/
    let dob = text;
    if (dob === "" || dob === undefined || dob === null) {
      return { status: false, error: "Can't be blank" };
    } else {
      return { status: true, error: '' };
    }
  }

  export function validatePhone(text){
    var phonenoRegex = /^\d{10}$/
    let phone= text;
    if (phone === "" || phone === undefined || phone === null) {
      return { status: false, error: "Please provide phone number" };
    }else if( !phonenoRegex.test(phone)) {
      return { status: false, error: "Please provide valid phone number"}
    }else {
      return { status: true, error: '' };
    }
  }