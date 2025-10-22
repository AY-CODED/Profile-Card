(function () {
  const form = document.getElementById("contactForm");
  const inputs = {
    fullName: document.getElementById("fullName"),
    email: document.getElementById("email"),
    subject: document.getElementById("subject"), // New field
    message: document.getElementById("message"),
  };

  const errors = {
    fullName: document.getElementById("nameError"),
    email: document.getElementById("emailError"),
    subject: document.getElementById("subjectError"), // New error display
    message: document.getElementById("messageError"),
  };

  const successMessage = document.getElementById("successMessage");

  // Validation functions
  function validateFullName(value) {
    if (!value.trim()) {
      return "Full name is required";
    }
    if (value.trim().length < 2) {
      return "Name must be at least 2 characters";
    }
    return "";
  }

  function validateEmail(value) {
    if (!value.trim()) {
      return "Email is required";
    }
    // Basic email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
    return "";
  }

  function validateSubject(value) {
    if (!value.trim()) {
      return "Subject is required";
    }
    if (value.trim().length < 3) {
      return "Subject must be at least 3 characters";
    }
    return "";
  }

  function validateMessage(value) {
    if (!value.trim()) {
      return "Message is required";
    }
    if (value.trim().length < 10) {
      return "Message must be at least 10 characters";
    }
    return "";
  }

  // Show error message
  function showError(field, message) {
    errors[field].textContent = message;
    errors[field].style.display = "block";
    inputs[field].classList.add("error");
    inputs[field].setAttribute("aria-invalid", "true");
  }

  // Clear error message
  function clearError(field) {
    errors[field].textContent = "";
    errors[field].style.display = "none";
    inputs[field].classList.remove("error");
    inputs[field].setAttribute("aria-invalid", "false");
  }

  // Validate single field
  function validateField(fieldName) {
    const value = inputs[fieldName].value;
    let errorMessage = "";

    switch (fieldName) {
      case "fullName":
        errorMessage = validateFullName(value);
        break;
      case "email":
        errorMessage = validateEmail(value);
        break;
      case "subject":
        errorMessage = validateSubject(value);
        break;
      case "message":
        errorMessage = validateMessage(value);
        break;
    }

    if (errorMessage) {
      showError(fieldName, errorMessage);
      return false;
    } else {
      clearError(fieldName);
      return true;
    }
  }

  // Real-time validation on blur
  Object.keys(inputs).forEach((fieldName) => {
    inputs[fieldName].addEventListener("blur", () => {
      validateField(fieldName);
    });

    // Clear error on input
    inputs[fieldName].addEventListener("input", () => {
      if (errors[fieldName].textContent) {
        clearError(fieldName);
      }
    });
  });

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Hide previous success message
    successMessage.style.display = "none";
    successMessage.textContent = "";

    // Validate all fields
    let isValid = true;
    Object.keys(inputs).forEach((fieldName) => {
      if (!validateField(fieldName)) {
        isValid = false;
      }
    });

    if (isValid) {
      // **NOTE:** Since this form is for validation only, we simulate success.
      // To actually send an email, you would need to use a backend service
      // or a service like Formspree/Netlify Forms here via an API call (fetch).

      // Show success message
      successMessage.textContent =
        "Thank you! Your message has been sent successfully. I'll get back to you soon.";
      successMessage.style.display = "block";

      // Reset form
      form.reset();

      // Clear all errors
      Object.keys(errors).forEach((fieldName) => {
        clearError(fieldName);
      });

      // Scroll to success message
      successMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } else {
      // Focus first error field
      const firstErrorField = Object.keys(inputs).find(
        (field) => errors[field].textContent !== ""
      );
      if (firstErrorField) {
        inputs[firstErrorField].focus();
      }
    }
  });
})();