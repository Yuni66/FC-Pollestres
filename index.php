<?php

// Init
$types = [['programme', 'Programme du week-end'], ['resultats', 'Résultats du week-end'], ['match', 'Match à la une'], ['resultmatch', 'Résultat match à la une']];
$categories = [['u7','U7'], ['u9','U9'], ['u11','U11'], ['u15','U15'], ['u18f','U18Féminines'], ['seniors','Séniors'], ['seniorsf8','SéniorsFéminines à 8'],['seniorsf11','SéniorsFéminines R1']];
$days = ['samedi', 'dimanche', '---', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'];
$months = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'];
$partners = [
	['airforcechauffage', 'Air Force Chauffage'],
	['ambianceenergie', 'Ambiance énergie'],
	['aqualand', 'Aqualand'],
	['aquatika', 'Aquatika'],
	//['audreycoiffure', 'Audrey Coiffure'],
	['autopieces66', 'Auto pièces 66'],
	['azincendie', 'AZ incendie'],
	['cashgraines', 'Cash graines'],
	//['emblematik', 'Emblematik'],
	['espacefoot', 'Espace foot'],
	['etsserran', 'Ets Serran'],
	['galiono', 'Galiono'],
	['gpconstruction', 'GP Construction'],
	['hypertroc', 'Hyper troc'],
	['jmt', 'JMT alimentation animale'],
	['lacomvermeille', 'La com\' Vermeille'],
	//['lavapederivesaltes', 'La Vape de Rivesaltes'],
	['ladyboy', 'Lady Boy'],
	//['m2ap', 'M2AP'],
	['meublesalvarez', 'Meubles Alvarez'],
	['peinturesguix', 'Peintures Guix'],
	['perpignancampingcar', 'Perpignan Camping-car'],
	//['pilpoiltoilettage', 'Pil\'poil Toilettage'],
	//['piscinespaland', 'Piscine Spa Land'],
	//['pollestresimmo', 'Pollestres immo'],
	//['vapotfrance', 'Vapot\'France'],
	['visioptic', 'Visioptic']
];

?>


<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="UTF-8">
	<title>Publications Facebook FC Pollestres</title>
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	
	<link href="//cdn.muicss.com/mui-0.9.43/extra/mui-rem.min.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" href="css/styles.css">
</head>
<body>
	<div class="mui-container-fluid">
		<div class="mui-row">
			<div class="mui-col-md-4">
				<div class="mui-select">
					<select name="type_publi" id="type_publi" required>
						<option value="" selected disabled></option>
						<?php foreach ($types as $type) {
							echo "<option value='". $type[0] ."'>". $type[1] ."</option>";
						} ?>
					</select>
					<label>Type de publication</label>
				</div>
			</div>
		</div><br /><br />
		
		<form class="mui-form" method="post">		
			<article class="mui-row category hidden">
				<div class="mui-col-md-4">
					<div class="mui-select">
						<select name="category" id="category" required>
							<option value="" selected disabled></option>
							<?php foreach ($categories as $category) {
								echo "<option value='". $category[0] ."'>". $category[1] ."</option>";
							} ?>
						</select>
						<label>Catégorie</label>
					</div>
				</div>
			</article>

			<article class="mui-row compet hidden">
				<div class="mui-col-md-4">
					<div class="mui-textfield mui-textfield">
						<input type="text" name="compet" id="compet" placeholder="Exemple : Coupe de France">
						<label>Type de compétition</label>
					</div>
				</div>
			</article>

			<article class="mui-row date-match hidden">
				<div class="mui-col-md-3">
					<div class="mui-select">
						<select name="day" id="day" required>
							<?php foreach ($days as $day) {
								echo "<option value='". $day ."'>". ucfirst($day) ."</option>";
							} ?>
						</select>
						<label>Jour</label>
					</div>
				</div>
				<div class="mui-col-md-2">
					<div class="mui-select">
						<select name="date" id="date" required>
							<?php for ($i = 1; $i <= 31; $i++) {
								echo "<option value='". $i ."'>". $i ."</option>";
							} ?>
						</select>
						<label>Date</label>
					</div>
				</div>
				<div class="mui-col-md-3">
					<div class="mui-select">
						<select name="month" id="month" required>
							<?php 
							$i = 1;
							foreach ($months as $month) {
								echo "<option value='". $i ."'>". ucfirst($month) ."</option>";
								$i++;
							} ?>
						</select>
						<label>Mois</label>
					</div>
				</div>
				<div class="mui-col-md-1">
					<div class="mui-select">
						<select name="hour" id="hour" required>
							<?php for ($i = 0; $i <= 23; $i++) {
								echo "<option value='". $i ."'>". $i ."</option>";
							} ?>
						</select>
						<label>Heure</label>
					</div>
				</div>
				<div class="mui-col-md-1">
					<div class="mui-select">
						<select name="minuts" id="minuts" required>
							<?php
								$count = 0;
								while ($count <= 55) {
									echo "<option value='". $count ."'>". $count ."</option>";
									$count = $count + 5;
								}
							?>
						</select>
						<label>Minutes</label>
					</div>
				</div>
			</article>
			
			<article class="mui-row location hidden">
				<div class="mui-col-md-3">
					<div class="inputGroup">
						<input id="domicile" name="location" type="radio" checked />
						<label for="domicile">Domicile</label>
					</div>
					<div class="inputGroup">
						<input id="exterieur" name="location" type="radio" />
						<label for="exterieur">Extérieur</label>
					</div><br />
				</div>
			</article>
			
			<article class="mui-row result hidden">
				<div class="mui-col-md-2">
					<div class="mui-textfield mui-textfield">
						<input type="text" name="ourresult" id="ourresult">
						<label>Buts marqués</label>
					</div>
				</div>
				<div class="mui-col-md-2">
					<div class="mui-textfield mui-textfield">
						<input type="text" name="thereresult" id="thereresult">
						<label>Buts encaissés</label>
					</div>
				</div>
			</article>
			
			<article class="mui-row adverse hidden">
				<div class="mui-col-md-4">
					<div class="mui-textfield mui-textfield">
						<input type="text" name="adverse" id="adverse">
						<label>Adversaire</label>
					</div>
				</div>
			</article>
			
			<article class="mui-row partners hidden">
				<div class="mui-col-md-4">
					<div class="mui-select">
						<select name="partners" id="partners">
							<option value="" selected disabled></option>
							<?php foreach ($partners as $partner) {
								echo "<option value='". $partner[0] ."'>". $partner[1] ."</option>";
							} ?>
						</select>
						<label>Partenaire présenté</label>
					</div>
				</div>
			</article>
			
			<article class="mui-row submit hidden">
				<div class="mui-col-md-6">
					<input type="submit" class="mui-btn mui-btn--raised mui-btn--primary" value="Valider" />
				</div>
			</article>
		</form>
	</div><br /><br />
	
	<div class="mui-container-fluid">
		<div class="mui-row">
			<div class="mui-col-md-6">
				<div class="list"></div>
				<article class="mui-row agenda_ok hidden">
					<div class="mui-col-md-6">
						<a data-target="OK" class="mui-btn mui-btn">Agenda Terminé</a>
					</div>
				</article>
			</div>
			<div class="mui-col-md-6">
				<div class="img"></div>
			</div>
		</div>
	</div>
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script src="//cdn.muicss.com/mui-0.9.43/extra/mui-combined.min.js"></script>
	<script src="js/script.js"></script>
</body>
</html>