function showError() {
    const error = $('.toast--error');
    error.slideDown(300).delay(3000).slideUp(400);
}

function getTeam(category) {
    let team = 'FC Pollestres';
    switch (category) {
        case "U18Féminines R1":
            team = 'Pollestres Cabestany'; 
            break;
        case "SéniorsFéminines à 8":
            team = 'FC Pollestres 2'
            break;
    }
    return team;
}


function typePubli(dataType, blockText, libelle) {
    const dataAnnonce = $('[data-annonce]');
    const dataResult = $('[data-result]');
    switch (dataType) {
        case 'programm':
            dataAnnonce.each(function() {
                $(this).removeClass('u-hidden');
            });
            blockText.append('[Agenda] ' + libelle + '<br />');
            $('[data-kids], [data-plateau="true"]').addClass('u-hidden');
            break;

        case 'result':
            dataResult.each(function() {
                $(this).removeClass('u-hidden');
            });
            blockText.append('[Bilan] ' + libelle + '<br />');
            break;

        case 'featured':
            dataAnnonce.each(function() {
                $(this).removeClass('u-hidden');
            });
            $('[data-featured]').removeClass('u-hidden');
            blockText.html('[Affiche] ' + libelle);
            break;

        case 'resultmatch':
            dataResult.each(function() {
                $(this).removeClass('u-hidden');
            });
            $('[data-resultmatch]').removeClass('u-hidden');
            blockText.html('[Résultat] L\'affiche du jour');
            break;
    }
}

function clean() {
    $('form input:not([type="radio"]), form select:not(#type-publi):not(#partners)').val('');
    $('form input[name="location"], form #plateau').prop('checked', false);
}

function submit(type, cible) {
    let line = '';
    let result, image;

    const category = $('#category option:selected').text();
    const compet = $('#compet').val();

    const day = $('#day option:selected').text();
    const date = $('#date option:selected').text();
    const month = $('#month option:selected').text();
    const hour = $('#hour option:selected').text();
    const minuts = $('#minuts option:selected').text();
    const location = $('input[name="location"]:checked').val();
    const our = parseInt($('#ourresult').val());
    const there = parseInt($('#thereresult').val());
    const adverse = $('#adverse').val();
    const partner = $('#partners').val();

    ($('[data-kids] input').is(":checked")) ? hasKids = 'yes' : hasKids = '' ;
    const plateau = $('#plateau-place').val();

    if (partner !== null) {
        image = '<img src="../../dist/img/fcp/partenaires/' + type + '/' + type + '-' + partner +'.jpg">';
    }

    if (type === 'programm' || type === 'result') {
        $('.agenda--ok').removeClass('u-hidden');
    }

    // Analyser les résultats
    switch (type) {
        case 'programm':
            if (category !== '' && day !== '' && date !== '' && month !== '' && hour !== '' && minuts !== '') {

                clean();
                $('[data-kids], [data-plateau="true"]').addClass('u-hidden');
                $('[data-plateau="false"]').each(function() {
                    $(this).removeClass('u-hidden');
                });

                if ((category == "U7" || category == "U9" || category == "U11" || category == "U13") && hasKids == 'yes') {
                    line += '#' + category + ' | ' + day + ' ' + date + ' ' + month + ' dès ' + hour + 'H' + minuts + ' : Plateau à ' + plateau;

                } else {
                    line += '#' + category + ' | ' + day + ' ' + date + ' ' + month + ' à ' + hour + 'H' + minuts + ' : ';

                    if (location === 'domicile') {
                        line += getTeam(category) + ' - ' + adverse;
                    } else if (location === 'exterieur') {
                        line += adverse + ' - ' + getTeam(category);
                    }
                }
                
                cible.append(line + '<br />');

                if (image !== '') {
                    $('.img').html(image);
                }
            } else {
                showError();
            }

            break;

        case 'result':
            if (category !== '' && our !== '' && there !== '' && adverse !== '') {

                clean();

                if (our > there) {
                    result = 'Victoire ' + our + ' à ' + there + ' contre ' + adverse;
                } else if (our === there) {
                    result = 'Match nul ' + our + ' à ' + there + ' contre ' + adverse;
                } else {
                    result = 'Défaite ' + there + ' à ' + our + ' contre ' + adverse;
                }
                cible.append('#' + category + ' | ' + result + '<br />');

                if (image !== '') {
                    $('.img').html(image);
                }
            } else {
                showError();
            }

            break;

        case 'featured':
            if (category !== '' && day !== '' && date !== '' && month !== '' && hour !== '' && minuts !== '' && adverse !== '' && location !== '') {

                clean();

                if (compet === '') {
                    line += '<br />';
                } else {
                    line += ' | ' + compet + '<br />';
                }

                line += '#' + category + ' | ' + day + ' ' + date + ' ' + month + ' à ' + hour + 'H' + minuts + ' : ';

                if (location === 'domicile') {
                    line += getTeam(category) + ' - ' + adverse;
                } else if (location === 'exterieur') {
                    line += adverse + ' - ' + getTeam(category);
                }
                cible.append(line + '<br /><br />Venez nombreux pour nous encourager lors de cette rencontre décisive !<br />Ensemble, nous ne faisons qu\'un !! #AllezPollestres');

                if (image !== '') {
                    $('.img').html(image);
                }
            } else {
                showError();
            }

            break;

        case 'resultmatch':
            if (category !== '' && our !== '' && there !== '' && adverse !== '') {
                
                console.log('test ' + compet);

                clean();
                
                if (compet === '') {
                    cible.append('<br />');
                } else {
                    cible.append(' | ' + compet + '<br />');
                }

                if (our > there) {
                    result = 'Fantastique victoire ' + our + ' à ' + there + ' contre ' + adverse + ' !!';
                } else if (our === there) {
                    result = 'Superbe combat livré par notre équipe, qui nous permet de revenir avec un match nul ' + our + ' à ' + there + ' contre ' + adverse + '.';
                } else {
                    result = 'Nous n\'avons pas démérité, malgré une défaite ' + there + ' à ' + our + ' contre ' + adverse + '.';
                }
                cible.append('#' + category + ' | ' + result + '<br />');
                cible.append('<br />Merci d\'avoir été aussi nombreux à être venus nous supporter ! #AllezPollestres');

                if (image !== '') {
                    $('.img').html(image);
                }
            } else {
                showError();
            }

            break;
    }
}

function agendaTermine(type, cible) {
    switch (type) {
        case 'programm':
            cible.append('<br />Venez encourager nos équipes ! #AllezPollestres');
            break;
        case 'result':
            cible.append('<br />Bravo à tous ! #AllezPollestres');
            break;
    }
}

$(function() {

    $('.toast--info .btn').on('click', function() {
        location.reload();
    });

    $('#type-publi').on('change', function(e) {
        e.preventDefault();

        let preExport = $('.list');
        preExport.html('');

        const typePublication = $(this).val();
        const libelleTypePublication = $('#type-publi option:selected').text();

        // On cache tous les champs de formulaire
        $('.form-block:not(.form-base)').each(function() {
            $(this).addClass('u-hidden');
        });

        typePubli(typePublication, preExport, libelleTypePublication);

        if (typePublication == 'programm') {
            $('#category').on('change', function() {
                let categoryType = $('#category option:selected').text();
                if (categoryType == "U7" || categoryType == "U9" || categoryType == "U11" || categoryType == "U13") {
                    $('[data-kids]').removeClass('u-hidden');
                } else {
                    $('[data-kids]').addClass('u-hidden');
                }
            });
        }

        $('[data-kids]').on('change', function(e) {
            $('[data-plateau]').toggleClass('u-hidden');
        });

        $('.btn--dark').removeClass('u-hidden');

        $('.btn--dark').click(function(){
            submit(typePublication, preExport);
        });

        $('[data-target="OK"]').click(function(){
            agendaTermine(typePublication, preExport);
            $('.agenda--ok').addClass('u-hidden');
            $('.toast--info').show();
            $('form').addClass('u-hidden');
        });

    });

});