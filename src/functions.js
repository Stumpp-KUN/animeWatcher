function openModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
  }
  
  function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
  }
  
  
  var toggleCount = 0;
  
  function togglePasswordVisibility() {
      var passwordInput = document.getElementById("password-input");
      var passwordToggleImg = document.getElementById("password-toggle-img");
      
      if (toggleCount % 2 === 0) {
          passwordInput.type = "text";
          passwordToggleImg.src = "open-eye.png";
        } else {
          passwordInput.type = "password";
          passwordToggleImg.src = "close-eye.png";
        }
        
        toggleCount++;
    }