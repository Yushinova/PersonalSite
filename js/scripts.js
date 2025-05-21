
        function sendEmail() {
            var name = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var message = document.getElementById('message').value;

            var subject = encodeURIComponent("Сообщение от " + name);
            var body = encodeURIComponent("Имя: " + name + "\nEmail: " + email + "\nСообщение: " + message);

            window.location.href = "mailto:krecker_111@mail.ru?subject=" + subject + "&body=" + body;
        }
