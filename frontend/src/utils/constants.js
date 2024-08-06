export const URL = "api.kupipodariday.project.nomorepartiesco.ru";

export const MINIMUM_PASSWORD_LENGTH = 3;
export const MINIMUM_USERNAME_LENGTH = 3;
export const MAXIMUM_DESCRIPTION_LENGTH = 200;
export const MAXIMUM_USERNAME_LENGTH = 64;
export const EMAIL_REGULAR =
  /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
export const URL_REGULAR =
  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const makeRightDeclension = (count, txt, cases = [2, 0, 1, 1, 1, 2]) =>
  txt[
    count % 100 > 4 && count % 100 < 20
      ? 2
      : cases[count % 10 < 5 ? count % 10 : 5]
  ];

export const priceArr = [100, 300, 500, 1000, 3000];
