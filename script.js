document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("[data-page]")
  const pages = document.querySelectorAll(".page")
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const navLinksContainer = document.querySelector(".nav-links")


  if (!mobileMenuToggle || !navLinksContainer) {
    console.error("Mobile menu elements not found")
    return
  }

  function navigateToPage(pageId) {
    pages.forEach((page) => {
      page.classList.remove("active")
    })

    const targetPage = document.getElementById(pageId)
    if (targetPage) {
      targetPage.classList.add("active")
    }

    navLinks.forEach((link) => {
      if (link.classList.contains("nav-link")) {
        if (link.getAttribute("data-page") === pageId) {
          link.classList.add("active")
        } else {
          link.classList.remove("active")
        }
      }
    })

    window.scrollTo(0, 0)

    if (navLinksContainer.classList.contains("active")) {
      mobileMenuToggle.classList.remove("active")
      navLinksContainer.classList.remove("active")
    }
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const pageId = this.getAttribute("data-page")
      if (pageId) {
        navigateToPage(pageId)


        window.location.hash = pageId
      }
    })
  })

  
  function checkHash() {
    const hash = window.location.hash.substring(1)
    if (hash) {
      navigateToPage(hash)
    }
  }


  checkHash()

  window.addEventListener("hashchange", checkHash)

// responsive nav
  mobileMenuToggle.addEventListener("click", function (e) {
    console.log("Mobile menu toggle clicked")
    e.preventDefault()
    this.classList.toggle("active")
    navLinksContainer.classList.toggle("active")
  })

  function handleScreenSizeChange() {
    if (window.innerWidth > 768 && navLinksContainer.classList.contains("active")) {
      navLinksContainer.classList.remove("active")
      mobileMenuToggle.classList.remove("active")
    }
  }

  window.addEventListener("resize", handleScreenSizeChange)


  const categoryTabs = document.querySelectorAll(".category-tab")
  const gallerySections = document.querySelectorAll(".gallery-section")

  if (categoryTabs.length > 0 && gallerySections.length > 0) {
    gallerySections.forEach((section, index) => {
      section.style.display = index === 0 ? "block" : "none"
    })

    categoryTabs.forEach((tab) => {
      tab.addEventListener("click", function (e) {
        e.preventDefault()

        categoryTabs.forEach((t) => t.classList.remove("active"))

        this.classList.add("active")
        const targetId = this.getAttribute("href").substring(1)

        gallerySections.forEach((section) => {
          section.style.display = "none"
        })

        const targetSection = document.getElementById(targetId)
        if (targetSection) {
          targetSection.style.display = "block"
        }
      })
    })
  }

  
  if ("ontouchstart" in window) {
    document.body.classList.add("touch-device")
    const touchTargets = document.querySelectorAll("a, button, .category-tab")
    touchTargets.forEach((target) => {
      target.addEventListener("touchstart", function () {
        this.classList.add("touch-active")
      })

      target.addEventListener("touchend", function () {
        this.classList.remove("touch-active")
      })
    })
  }

  const subscribeForm = document.getElementById("subscribeForm")
  const formSuccess = document.getElementById("formSuccess")

  if (subscribeForm) {
    const fullName = document.getElementById("fullName")
    const email = document.getElementById("email")
    const password = document.getElementById("password")
    const confirmPassword = document.getElementById("confirmPassword")
    const age = document.getElementById("age")
    const interestCheckboxes = document.querySelectorAll('input[name="interests"]')
    const termsAgreement = document.getElementById("termsAgreement")

    const fullNameError = document.getElementById("fullNameError")
    const emailError = document.getElementById("emailError")
    const passwordError = document.getElementById("passwordError")
    const confirmPasswordError = document.getElementById("confirmPasswordError")
    const ageError = document.getElementById("ageError")
    const interestsError = document.getElementById("interestsError")
    const termsAgreementError = document.getElementById("termsAgreementError")

    subscribeForm.addEventListener("submit", (e) => {
      e.preventDefault()
      resetErrors()

      let isValid = true

    // FORM VALIDATION
      if (!validateFullName(fullName.value)) {
        fullNameError.textContent = "Please enter your full name (minimum 3 characters)"
        isValid = false
      }

      if (!validateEmail(email.value)) {
        emailError.textContent = "Please enter a valid email address"
        isValid = false
      }

      if (!validatePassword(password.value)) {
        passwordError.textContent =
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
        isValid = false
      }

      if (!validateConfirmPassword(password.value, confirmPassword.value)) {
        confirmPasswordError.textContent = "Passwords do not match"
        isValid = false
      }

      if (!validateAge(age.value)) {
        ageError.textContent = "Please enter a valid age (18-120)"
        isValid = false
      }

      if (!validateInterests()) {
        interestsError.textContent = "Please select at least one interest"
        isValid = false
      }

      if (!termsAgreement.checked) {
        termsAgreementError.textContent = "You must agree to the terms and conditions"
        isValid = false
      }

      if (isValid) {
        if (formSuccess) {
          subscribeForm.style.display = "none"
          formSuccess.style.display = "block"
        } else {
          alert("Form submitted successfully!")
        }
      }
    })

    subscribeForm.addEventListener("reset", () => {
      resetErrors()
    })

    // 1. name : must contain 3 or more chars
    function validateFullName(name) {
      return name.trim().length >= 3
    }

    function validateEmail(email) {
      const trimmedEmail = email.trim()
      //2. email: must contain @
      if (!trimmedEmail.includes("@")) return false
      const parts = trimmedEmail.split("@")
      //3. email: must only have 1 @
      if (parts.length !== 2) return false

      const [localPart, domainPart] = parts
      // 4. email: local part (before '@') cannot be empty
      if (localPart.length === 0) return false
      // 5. email: domain part (after '@') must contain '.'
      if (!domainPart.includes(".")) return false

      const domainParts = domainPart.split(".")
      const tld = domainParts[domainParts.length - 1]
      // 6. email: top-level domain must be at least 2 chars
      if (tld.length < 2) return false

      return true
    }

    function validatePassword(password) {
        // 7. password: at least 8 chars
        // 8. password: must contain at least one uppercase letter
        // 9. password: must contain at least one lowercase letter
        // 10. password: must contain at least one number
      if (password.length < 8) return false

    
      let hasUppercase = false
      for (let i = 0; i < password.length; i++) {
        const char = password.charAt(i)
        if (char === char.toUpperCase() && char !== char.toLowerCase()) {
          hasUppercase = true
          break
        }
      }
      if (!hasUppercase) return false

      let hasLowercase = false
      for (let i = 0; i < password.length; i++) {
        const char = password.charAt(i)
        if (char === char.toLowerCase() && char !== char.toUpperCase()) {
          hasLowercase = true
          break
        }
      }
      if (!hasLowercase) return false

      let hasNumber = false
      for (let i = 0; i < password.length; i++) {
        const char = password.charAt(i)
        if (!isNaN(Number.parseInt(char))) {
          hasNumber = true
          break
        }
      }
      if (!hasNumber) return false

      return true
    }
    // 11. confirm password: must exactly match password
    function validateConfirmPassword(password, confirmPassword) {
      return password === confirmPassword
    }
    // 12. age: must be number between 18 and 120
    function validateAge(age) {
      const ageNum = Number.parseInt(age)
      return !isNaN(ageNum) && ageNum >= 18 && ageNum <= 120
    }
    // 13. interests: at least one checkbox must be selected 
    function validateInterests() {
      for (let i = 0; i < interestCheckboxes.length; i++) {
        if (interestCheckboxes[i].checked) {
          return true
        }
      }
      return false
    }

    function resetErrors() {
      if (fullNameError) fullNameError.textContent = ""
      if (emailError) emailError.textContent = ""
      if (passwordError) passwordError.textContent = ""
      if (confirmPasswordError) confirmPasswordError.textContent = ""
      if (ageError) ageError.textContent = ""
      if (interestsError) interestsError.textContent = ""
      if (termsAgreementError) termsAgreementError.textContent = ""
    }

    if (fullName) {
      fullName.addEventListener("blur", function () {
        if (!validateFullName(this.value) && this.value.trim() !== "") {
          fullNameError.textContent = "Please enter your full name (minimum 3 characters)"
        } else {
          fullNameError.textContent = ""
        }
      })
    }

    if (email) {
      email.addEventListener("blur", function () {
        if (!validateEmail(this.value) && this.value.trim() !== "") {
          emailError.textContent = "Please enter a valid email address"
        } else {
          emailError.textContent = ""
        }
      })
    }

    if (password) {
      password.addEventListener("blur", function () {
        if (!validatePassword(this.value) && this.value.trim() !== "") {
          passwordError.textContent =
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
        } else {
          passwordError.textContent = ""
        }
      })
    }

    if (confirmPassword) {
      confirmPassword.addEventListener("blur", function () {
        if (!validateConfirmPassword(password.value, this.value) && this.value.trim() !== "") {
          confirmPasswordError.textContent = "Passwords do not match"
        } else {
          confirmPasswordError.textContent = ""
        }
      })
    }

    if (age) {
      age.addEventListener("blur", function () {
        if (!validateAge(this.value) && this.value.trim() !== "") {
          ageError.textContent = "Please enter a valid age (18-120)"
        } else {
          ageError.textContent = ""
        }
      })
    }
  }


  console.log("ShipDecKK JavaScript initialized")
})
