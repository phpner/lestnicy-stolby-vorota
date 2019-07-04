<?php
mb_internal_encoding("utf-8");
$monthes = array(
    1 => 'Января', 2 => 'Февраля', 3 => 'Марта', 4 => 'Апреля',
    5 => 'Мая', 6 => 'Июня', 7 => 'Июля', 8 => 'Августа',
    9 => 'Сентября', 10 => 'Октября', 11 => 'Ноября', 12 => 'Декабря'
);

$data = (date('d ') . $monthes[(date('n'))] . date(' Y, H:i:s'));


if($_POST['name']){
    $name = trim(strip_tags($_POST['name']));
}else{
    $name = "";
}
if($_POST['message']){
    $text = trim(strip_tags($_POST['message']));
}else{
    $text = "";
}

if($_POST['email']){
    $email = trim(strip_tags($_POST['email']));
}else{
    $email = "";
}

if($_POST['phone']){
    $phone = trim(strip_tags($_POST['phone']));
}else{
    $ephone = "";
}


$body = "<br> Дата: $data <br> Имя: $name <br> Телефон: $phone <br> Сообщение: $text ";


require_once($_SERVER['DOCUMENT_ROOT'] . '/phpmailer/PHPMailerAutoload.php'); //подключаем класс
$mail = new PHPMailer(); //вызываем класс

$mail->CharSet = 'utf-8';   //Устанавливаем кодировку
$mail->SetLanguage('ru');   //для ошибок итд.
$mail->addAddress("phpner@yandex.ru","phpner"); //куда отправлять
$mail->FromName = 'Металлмастер';
$mail->Subject = "Сообщение с сайта";
$mail->Body = $body;
$mail->IsHTML(true);
//отправка
if(!$mail->Send()) {
    echo 'false ';
    echo $mail->ErrorInfo;
} else {
    echo true;
}
/*header( 'Refresh: 0; url=http://kuban-hostel.ru/' );*/
/*exit;*/
?>