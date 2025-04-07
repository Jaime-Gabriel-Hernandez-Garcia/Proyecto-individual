// /*=============== SHOW HIDDEN - PASSWORD ===============*/
// const showHiddenPass = (loginPass, loginEye) =>{
//    const input = document.getElementById(loginPass),
//          iconEye = document.getElementById(loginEye)
//
//    iconEye.addEventListener('click', () =>{
//       // Change password to text
//       if(input.type === 'password'){
//          // Switch to text
//          input.type = 'text'
//
//          // Icon change
//          iconEye.classList.add('ri-eye-line')
//          iconEye.classList.remove('ri-eye-off-line')
//       } else{
//          // Change to password
//          input.type = 'password'
//
//          // Icon change
//          iconEye.classList.remove('ri-eye-line')
//          iconEye.classList.add('ri-eye-off-line')
//       }
//    })
// }
//
// showHiddenPass('login-pass','login-eye')
//

/*=============== SHOW HIDDEN - PASSWORD ===============*/
const showHiddenPass = (loginPass, loginEye) =>{
   const input = document.getElementById(loginPass),
       iconEye = document.getElementById(loginEye)

   iconEye.addEventListener('click', () =>{
      // Change password to text
      if(input.type === 'password'){
         // Switch to text
         input.type = 'text'

         // Icon change
         iconEye.classList.add('ri-eye-line')
         iconEye.classList.remove('ri-eye-off-line')
      } else{
         // Change to password
         input.type = 'password'

         // Icon change
         iconEye.classList.remove('ri-eye-line')
         iconEye.classList.add('ri-eye-off-line')
      }
   })
}

/*=============== THEME TOGGLE ===============*/
const themeToggle = () => {
   const themeButton = document.getElementById('theme-toggle'),
       themeIcon = document.getElementById('theme-icon'),
       html = document.querySelector('html')

   // Check if theme preference is stored in localStorage
   const currentTheme = localStorage.getItem('theme') || 'light'

   // Apply saved theme on page load
   html.setAttribute('data-theme', currentTheme)
   updateThemeIcon(currentTheme, themeIcon)

   // Toggle theme on click
   themeButton.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme')
      const newTheme = currentTheme === 'light' ? 'dark' : 'light'

      html.setAttribute('data-theme', newTheme)
      localStorage.setItem('theme', newTheme)
      updateThemeIcon(newTheme, themeIcon)
   })
}

// Update theme icon based on current theme
const updateThemeIcon = (theme, icon) => {
   if (theme === 'dark') {
      icon.classList.remove('ri-sun-line')
      icon.classList.add('ri-moon-line')
   } else {
      icon.classList.remove('ri-moon-line')
      icon.classList.add('ri-sun-line')
   }
}

// Initialize functions
document.addEventListener('DOMContentLoaded', () => {
   showHiddenPass('password', 'login-eye')
   themeToggle()
})


