var small = new RegExp('(?=.*?[a-z])');
var cap = new RegExp('(?=.*?[A-Z])');
var num = new RegExp('(?=.*?[0-9])');
var spl = new RegExp('(?=.*?[#?!@$%^&*-])');

export class Validators {
  passwordValidate = (password: string) => {
    if (password.length < 8) {
      console.log('password must contain at least 8 character');
      return 'password must contain at least 8 character';
    } else if (!cap.test(password)) {
      console.log('password must contain at least 1 capatical letter');
      return 'password must contain at least 1 capatical letter';
    } else if (!num.test(password)) {
      console.log('password must contain at least 1 number');
      return 'password must contain at least 1 number';
    } else if (!spl.test(password)) {
      console.log('password must contain at least 1 special character');
      return 'password must contain at least 1 special character';
    } else if (!small.test(password)) {
      console.log('password must contain small letters');
    }
    return true;
  };
}
