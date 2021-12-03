<?php

spl_autoload_register(function ($class) {
    include 'classes/' . $class . '.php';
});

if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])
&& !empty($_SERVER['HTTP_X_REQUESTED_WITH'])
&& strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
	$requestData = $_POST;

	$errors = array();

	if (!$requestData['id'])
		$errors[] = 'Не получен ID товара';

	if (!$requestData['fio'])
		$errors[] = 'Поле "Ваше имя" обязательно для заполнения';

	if (!$requestData['phone'] && !$requestData['email'])
		$errors[] = 'Вы должны заполнить как минимум одно поле "Телефон" или "Email"';

	$response = array();

	if ($errors) {
		$response['errors'] = $errors;
	} else {
		$PDO = PdoConnect::getInstance();

		$sql = "INSERT INTO `orders` SET `fio` = :fio, `phone` = :phone, `email` = :email, `comment` = :comment, `product_id` = :id";

		$set = $PDO->PDO->prepare($sql);
		$response['res'] = $set->execute($requestData);

		if ($response['res']) {
			$message = "
				Оформлен новый заказ.
				Заказан товар с ID:" . $requestData['id'] . ", заказчик " . $requestData['fio'];

			mail('keyn-artur@yandex.ru', 'Оформлен новый заказ', $message, 'FROM: admin@happynewyear.mydev');
		}
	}

	echo json_encode($response);
}