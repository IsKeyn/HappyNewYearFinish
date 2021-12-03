<!DOCTYPE html>
<html>
	<head>
		<title>Скоро новый год!</title>
		<script src="static/js/jquery-3.4.1.min.js"></script>
		<script src="static/js/script.js"></script>
		<link href="static/css/bootstrap.min.css" rel="stylesheet" type="text/css">
		<link href="static/css/style.css" rel="stylesheet" type="text/css">
		<script>
			var secondTo = <?=$secondTo?>;
		</script>
	</head>
	<body>
		<div class="vein"></div>
		<div class="container main timer-main">
			<span class="title">До нового года осталось:</span>
			<div id="timer" class="timer">
				<div>
					<span class="days"></span>
					<div class="small-text">Дня</div>
				</div>
				<div>
					<span class="hours"></span>
					<div class="small-text">Часа</div>
				</div>
				<div>
					<span class="minutes"></span>
					<div class="small-text">Минут</div>
				</div>
				<div>
					<span class="seconds"></span>
					<div class="small-text">Секунд</div>
				</div>
			</div>
		</div>
	</body>
</html>