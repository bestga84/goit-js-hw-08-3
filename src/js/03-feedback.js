import throttle from 'lodash.throttle';

const feedbackFormEl = document.querySelector('.feedback-form');
const userData = {};

const fillContactFormFields = () => {
  const contactFormDataFrom = localstorageService.load('feedback-form-state');
  if (contactFormDataFrom === undefined) {
    return;
  }
  userData = { ...contactFormDataFrom };
  for (const prop in contactFormDataFrom) {
    if (contactFormDataFrom.hasOwnProperty(prop)) {
      feedbackFormEl.elements[prop].value = contactFormDataFrom[prop];
    }
  }
};
fillContactFormFields();

const onFormFieldChange = evt => {
  const { target } = evt;
  userData[target.name] = target.value;
  localstorageService.save('feedback-form-state', userData);
};

const onContactFormSubmit = event => {
  event.preventDefault();

  userData.email = feedbackFormEl.elements.email.value;
  userData.message = feedbackFormEl.elements.message.value;
  console.log(userData);

  localstorageService.remove('feedback-form-state');
  feedbackFormEl.reset();
};

feedbackFormEl.addEventListener('input', throttle(onFormFieldChange, 500));
feedbackFormEl.addEventListener('submit', onContactFormSubmit);
