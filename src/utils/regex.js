const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$/;
const phoneNumberPattern = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;

export { emailPattern, passPattern, phoneNumberPattern };
