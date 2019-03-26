import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthGreaterThan,
  createValidator,
  matchesField,
  hasLengthLessThan,
  matchesPattern
} from "revalidate";

const isValidEmail = createValidator(
  message => value => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return message;
    }
  },
  "Invalid email address"
);

const isValidUrl = createValidator(
  message => value => {
    if (
      value &&
      !/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i.test(
        value
      )
    ) {
      return message;
    }
  },
  "Invalid Url"
);

export const validateLogin = combineValidators({
  email: composeValidators(isValidEmail(), isRequired({ message: "Email is required" }))(),
  password: composeValidators(
    isRequired({ message: "Password is required" }),
    hasLengthGreaterThan(4)({ message: "Password needs to be at least 5 characters" })
  )()
});

export const validateRegister = combineValidators({
  name: composeValidators(
    hasLengthGreaterThan(1)({ message: "Name needs to be at least 2 characters" }),
    isRequired({ message: "Name is required" })
  )(),
  email: composeValidators(isValidEmail(), isRequired({ message: "Email is required" }))(),
  password: composeValidators(
    isRequired({ message: "Password is required" }),
    hasLengthGreaterThan(4)({ message: "Password needs to be at least 5 characters" })
  )(),
  password2: matchesField("password")({
    message: "Passwords do not match"
  })
});

export const validateProfile = combineValidators({
  handle: composeValidators(
    hasLengthGreaterThan(2)({ message: "Handle needs to be at least 3 characters" }),
    isRequired({ message: "Handle is required" })
  )(),
  status: hasLengthLessThan(22)({ message: "You must select something." }),
  company: hasLengthGreaterThan(2)({ message: "Needs to be at least 3 characters" }),
  website: isValidUrl(),
  location: hasLengthGreaterThan(2)({ message: "Needs to be at least 3 characters" }),
  skills: composeValidators(
    matchesPattern(/^([A-Za-z0-9]+,)*[A-Za-z0-9]+$/)({
      message: "Please use comma separated values with no spaces"
    }),
    isRequired({ message: "Skills are required" })
  )(),
  githubusername: hasLengthGreaterThan(2)({ message: "Needs to be at least 3 characters" }),
  bio: hasLengthGreaterThan(2)({ message: "Needs to be at least 3 characters" }),
  twitter: isValidUrl(),
  facebook: isValidUrl(),
  linkedin: isValidUrl(),
  youtube: isValidUrl(),
  instagram: isValidUrl()
});

export const validateExperience = combineValidators({
  company: composeValidators(
    hasLengthGreaterThan(3)({ message: "Needs to be at least 4 characters" }),
    isRequired({ message: "Company is required" })
  )(),
  title: composeValidators(
    hasLengthGreaterThan(3)({ message: "Needs to be at least 4 characters" }),
    isRequired({ message: "Title is required" })
  )(),
  location: hasLengthGreaterThan(2)({ message: "Needs to be at least 3 characters" }),
  from: isRequired({ message: "From Date is required" }),
  description: hasLengthGreaterThan(2)({ message: "Needs to be at least 3 characters" })
});

export const validateEducation = combineValidators({
  school: composeValidators(
    hasLengthGreaterThan(2)({ message: "Needs to be at least 3 characters" }),
    isRequired({ message: "School is required" })
  )(),
  degree: composeValidators(
    hasLengthGreaterThan(3)({ message: "Needs to be at least 4 characters" }),
    isRequired({ message: "Degree is required" })
  )(),
  fieldofstudy: composeValidators(
    hasLengthGreaterThan(2)({ message: "Needs to be at least 3 characters" }),
    isRequired({ message: "Field of Study is required" })
  )(),
  from: isRequired({ message: "From Date is required" }),
  description: hasLengthGreaterThan(2)({ message: "Needs to be at least 3 characters" })
});
