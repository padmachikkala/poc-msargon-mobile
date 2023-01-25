export interface LoginSchema {
  username: string;
  password: string;
}

export interface Registration {
  fullName: string;
  username: string;
  mobileNumber: string;
  password: string;
  role: string;
}

export interface forgot {
  email: string;
}

export interface reset {
  forgotData: string;
  newPassword: string;
  confirmPassword: string;
}

export interface verify {
  token: string;
}

export interface userProfile {
  firstName: string;
  lastName: string;
  middleName: string;
  gender: string;
  userId: number;
  state: string;
  city: string;
}

export interface doctorProfile {
  doctorId: string;
  firstName: string;
  lastName: string;
  professionalStatement: string;
  practicingFrom: string;
  userLoginId: string;
  age: string;
  gender: string;
  state: string;
  city: string;
  qualification: string;
  languages: string;
  consultation_fee: string;
}
