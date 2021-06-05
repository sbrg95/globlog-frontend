export const postValidation = (post) => {
  const { title, description, body } = post;
  const errors = [];
  if (title === '') {
    errors.push('Post title required');
  }
  if (description === '') {
    errors.push('Post description required');
  }
  if (body === '') {
    errors.push('Post body required');
  }

  return errors;
};

export const loginValidation = (user) => {
  const { email, password } = user;
  const errors = [];
  if (email === '') {
    errors.push('Email required');
  }
  if (password === '') {
    errors.push('Password required');
  }

  return errors;
};

export const signupValidation = (user) => {
  const { firstname, lastname, username, email, password, password2 } = user;
  const errors = [];
  if (firstname === '') {
    errors.push('First Name required');
  }
  if (lastname === '') {
    errors.push('Last Name required');
  }
  if (username === '') {
    errors.push('Username required');
  }
  if (email === '') {
    errors.push('Email required');
  }
  if (password === '' || password.length <= 5) {
    errors.push('Password required with at least 5 characters');
  }
  if (password !== password2) {
    errors.push('Passwords must be identical');
  }

  return errors;
};
