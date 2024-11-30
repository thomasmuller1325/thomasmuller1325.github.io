// 登录
    function logindis() {
      document.getElementById('loginForm').style.display = 'block';
      document.getElementById('signupForm').style.display = 'none';
    }

    // 注册
    function signupdis() {
      document.getElementById('signupForm').style.display = 'block';
      document.getElementById('loginForm').style.display = 'none';
    }

    // 注册 存储用户名和密码
    function signUp(event) {
      event.preventDefault();
      const username = document.getElementById('signupUsername').value.trim();
      const password = document.getElementById('signupPassword').value.trim();

      if (localStorage.getItem(username)) {
        alert('Username already exists. Please choose a different username.');
        return;
      }

      // 储存用户数据并把得分归零
      const hashedPassword = btoa(password); // Simple encoding for demonstration
      const userData = { password: hashedPassword, score: 0 };
      localStorage.setItem(username, JSON.stringify(userData));

      alert('Sign-up successful! Please log in.');
      showLogin();
    }

    // 登录验证
    function logIn(event) {
      event.preventDefault();
      const username = document.getElementById('loginUsername').value.trim();
      const password = document.getElementById('loginPassword').value.trim();

      const userData = JSON.parse(localStorage.getItem(username));

      if (!userData) {
        alert('User not found. Please sign up first.');
        return;
      }

      // 密码验证
      const hashedPassword = btoa(password);
      if (userData.password !== hashedPassword) {
        alert('Incorrect password. Please try again.');
        return;
      }

      // Save the current user in sessionStorage for game use
      sessionStorage.setItem('currentUser', username);
      window.location.href = 'blackjack.html';
    }