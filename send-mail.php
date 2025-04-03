<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $phone = filter_var($_POST['phone'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Nieprawidłowy adres e-mail']);
        exit;
    }

    $to = "info@yourlanguageplatform.com"; 
    $subject = "Nowe zgłoszenie z formularza";
    $message = "Imię: $name\nTelefon: $phone\nE-mail: $email";
    $headers = "From: no-reply@yourlanguageplatform.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Błąd podczas wysyłania e-maila']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Nieprawidłowe żądanie']);
}
?>